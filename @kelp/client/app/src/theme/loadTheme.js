/* eslint-disable @typescript-eslint/no-var-requires */
const rawTheme = require('./theme.json')
const fs = require('fs')

delete rawTheme.name
delete rawTheme.rounding
delete rawTheme.spacing
delete rawTheme.defaultMode
delete rawTheme.scale
delete rawTheme.global.active.background
delete rawTheme.formField.border.error
delete rawTheme.formField.border.position

const fileContent = `/** THIS FILE IS AUTO-GENERATED, DO NOT EDIT */
import type { ThemeType } from 'grommet'

export const baseTheme: ThemeType = ${JSON.stringify(rawTheme, null, 2)}
`
const path = __dirname + '/baseTheme.ts'

fs.writeFileSync(path, fileContent)
