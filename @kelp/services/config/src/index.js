import packageJson from '../../../package.json'
export const fromEmail = '"Kelp Digital" <no-reply@kelp.Digital>'
export const awsRegion = 'eu-west-1'
export const projectName = packageJson.name.replace(/[-_]/g, ' ')
export const companyName = projectName
export const emailLegalText = process.env.LEGAL_TEXT || '<Copyright by Kelp.Digital >'
//# sourceMappingURL=index.js.map
