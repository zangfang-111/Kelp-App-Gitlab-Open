// eslint-disable-next-line no-undef

module.exports = (dir) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const package = require(`${dir}/package.json`)

  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/**/*.spec.[jt]s?(x)'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    roots: [`<rootDir>`],
    rootDir: dir,
    name: package.name,
    displayName: package.name,
    globals: {
      'ts-jest': {
        isolatedModules: true, // this fixes the issue with the TS2717 error , also https://kulshekhar.github.io/ts-jest/user/config/isolatedModules
      },
    },
  }
}
