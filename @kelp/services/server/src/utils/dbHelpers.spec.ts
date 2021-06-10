import { repeat } from 'ramda'
import {
  generatePreparedValues,
  generateSQLPreparedValues,
  generateSQLPrepareValuesForBulk,
} from './dbHelpers'
interface BasicData {
  userName: string
  statementId: string
  under_score: string
  bool: boolean
}
describe('dbHelpers', () => {
  it('should be defined generateSQLPreparedValues', () => {
    expect(generateSQLPreparedValues).toBeDefined()
  })
  it('should be defined generateSQLPrepareValuesForBulk', () => {
    expect(generateSQLPrepareValuesForBulk).toBeDefined()
  })
  it('should produce correct values generatePreparedValues', () => {
    const basicData: BasicData = {
      userName: 'woss',
      statementId: 'bafy....',
      under_score: 'tralala',
      bool: true,
    }

    const data = repeat(basicData, 2)

    const preparedValues = generatePreparedValues<BasicData>(data[0])
    expect(preparedValues).toEqual('($1,$2,$3,$4)')
  })
  it('should produce correct values generateSQLPrepareValuesForBulk', () => {
    const basicData: BasicData = {
      userName: 'woss',
      statementId: 'bafy....',
      under_score: 'tralala',
      bool: true,
    }

    const data = repeat(basicData, 2)

    const { columns, preparedValues, values } = generateSQLPrepareValuesForBulk<BasicData>(data)
    expect(columns).toEqual('user_name,statement_id,under_score,bool')
    expect(preparedValues).toEqual('($1,$2,$3,$4),($5,$6,$7,$8)')
    expect(values).toEqual([
      'woss',
      'bafy....',
      'tralala',
      true,
      'woss',
      'bafy....',
      'tralala',
      true,
    ])
  })
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should fail to produce correct values generateSQLPrepareValuesForBulk', () => {
    // figure out how to handle this
    expect(true).toBeTruthy()
  })
})
