/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import packageJson from '../../../package.json'

// TODO: customize this with your own settings!

export const fromEmail = '"Kelp Digital" <no-reply@kelp.Digital>'
export const awsRegion = 'eu-west-1'
export const projectName = packageJson.name.replace(/[-_]/g, ' ')
export const companyName = projectName // For copyright ownership
export const emailLegalText =
  // Envvar here so we can override on the demo website
  process.env.LEGAL_TEXT || '<Copyright by Kelp.Digital >'
