/* eslint-disable prefer-const */
import { snakeCase } from 'change-case'
import {
  append,
  compose,
  flatten,
  keys,
  length,
  map,
  pipe,
  prepend,
  splitEvery,
  values,
} from 'ramda'

export type ValueOf<T> = T[keyof T]

/**
 * Generate the prepared values, columns and values for the prepared sql statement, insert or update
 *
 * Example:
 * Given the SQL like this
 * ```ts
 * const sql = `insert into app_public.lightroom_collection (${columns}) values (${preparedValues}) ON CONFLICT DO NOTHING RETURNING id;`
 * ```
 *
 * this method will produce the
 *
 * `columns` like `title,is_smart,catalog_id,local_identifier,search_description`
 *
 * and the
 *
 * `preparedValues` like `$1,$2,$3,$4,$5`
 * @param data
 * @param update Switches the method to create preparedValues for the update
 * @typeParam T Generic type for the data
 *
 * @TODO make the preparedValues correct length, and columns propely typed
 */
export function generateSQLPreparedValues<T extends { [k: string]: any }>(
  data: T,
  update = false,
): {
  preparedValues: string
  values: any[]
  columns: string
} {
  // this is index for prepared statement, it starts with $1 ... $data.length
  let counter = 1,
    columnsArray = [],
    values = [],
    preparedValuesArray = []

  // we process here columns, values and prepValues in one go
  for (const key in data) {
    const value = data[key]
    const preparedHolder = `$${counter}`
    if (update) {
      columnsArray.push(`${snakeCase(key)}=${preparedHolder}`) // transform to snake_case
    } else {
      columnsArray.push(snakeCase(key)) // transform to snake_case
    }
    if (Array.isArray(value)) {
      values.push(JSON.stringify(value))
    } else {
      values.push(value)
    }

    preparedValuesArray.push(preparedHolder)
    counter++
  }

  return {
    preparedValues: preparedValuesArray.join(','),
    columns: columnsArray.join(','),
    values,
  }
}

/**
 * Generate the prepared Values, colum names and values for the batch insert
 *
 * @type T is a generic type of a SINGLE record
 * @param data list of T records
 */
export function generateSQLPrepareValuesForBulk<T extends { [k: string]: any }>(
  data: T[],
): {
  preparedValues: string
  values: ValueOf<T>[]
  columns: string
} {
  // we don't have to loop through since we know that data will be the same structure
  const columnNames = generateColumnNames<T>(data[0])
  const preparedValues = generatePreparedValuesForBulk<T>(data)
  const values = generateValuesForBulk<T>(data)

  return {
    preparedValues,
    columns: columnNames.join(','),
    values,
  }
}

/**
 * Takes in the data set and returns the prepared values starting from $n+1...$(data.length)
 *
 * Return Example:
 * ```js
  [
    'woss', 'bafy....', 'tralala', true ,
    'woss', 'bafy....', 'tralala', true
  ]
 * ```
 * @type T generic type
 * @param data
 * @returns the list of T values
 */
function generateValuesForBulk<T extends { [k: string]: any }>(data: T[]): ValueOf<T>[] {
  // @FUCK couldn't figure out how to type this
  return flatten<any>(map(values, data))
}

/**
 * Generate prepared Values for a single record
 * @param data
 * @returns the string in the shape of `'($1,$2,$3)'`
 */
export function generatePreparedValues<T>(data: T): string {
  const maxPerItem = length(keys(data))
  const dummyArray: string = Array(maxPerItem)
    .fill('')
    .map((v, i) => `$${i + 1}`)
    .join(',')

  // then we make a temp array so we can add the '(' and ')' which will be ['(', p, ')']
  const res = pipe(prepend('('), append(')'))([dummyArray])

  // then we join that with no spaces to get ($1,$2,$3,$4)
  return res.join('')
}

/**
 * Takes in the data set and returns the prepared values starting from $n+1...$(data.length)
 * @param data
 * @returns the string in the shape of `'($1,$2,$3), ($4, $5, $6)'`
 */
function generatePreparedValuesForBulk<T extends { [k: string]: any }>(data: T[]): string {
  // get the max length of
  const maxPerItem = length(keys(data[0]))
  const totalMax = length(data) * maxPerItem

  const dummyArray: string[] = Array(totalMax)
    .fill('')
    .map((v, i) => `$${i + 1}`)

  const splitProperly = splitEvery(maxPerItem, dummyArray)

  return map((v) => {
    // this will join the array
    const p = v.join(',')

    // then we make a temp array so we can add the '(' and ')' which will be ['(', p, ')']
    const res = pipe(prepend('('), append(')'))([p])

    // then we join that with no spaces to get ($1,$2,$3,$4)
    return res.join('')
  }, splitProperly).join(',') // then we join all that to get ($1,$2,$3,$4),($5,$6,$7,$8)
}

/**
 * Takes in the object and transforms the keys in the snake_case then returns that
 * Example:
 * ```
 * [ 'userName', 'statementId', 'under_score', 'bool' ] to
 * [ 'user_name', 'statement_id', 'under_score', 'bool' ]
 * ```
 *
 * @param data
 * @returns the list of strings in the shape of `[ 'user_name', 'statement_id', 'under_score', 'bool' ]`
 */
function generateColumnNames<T extends { [k: string]: any }>(data: T): string[] {
  return compose(map(snakeCase), keys)(data)
}
