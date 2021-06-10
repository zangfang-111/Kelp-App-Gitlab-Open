// graphql.config.js
module.exports = {
  projects: {
    app: {
      schema: `${__dirname}/data/schema.graphql`,
      documents: ['./**/*.graphql'],
      extensions: {
        endpoints: {
          default: {
            url: 'http://localhost:7666',
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
          },
        },
      },
    },
    db: {
      schema: `${__dirname}/data/schema.graphql`,
      documents: ['./**/*.graphql'],
      extensions: {
        codegen: [
          {
            generator: 'graphql-binding',
            language: 'typescript',
            output: {
              binding: 'data/db.ts',
            },
          },
        ],
        endpoints: {
          default: {
            url: 'http://localhost:7666',
            headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
          },
        },
      },
    },
  },
}
