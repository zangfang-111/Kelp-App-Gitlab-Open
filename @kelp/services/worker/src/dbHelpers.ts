/* eslint-disable prefer-const */
import { snakeCase } from 'change-case'

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
