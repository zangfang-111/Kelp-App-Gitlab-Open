module.exports = {
  apps: [
    {
      name: 'lightroom',
      script: 'yarn',
      args: 'start:lightroom',
      interpreter: '/bin/zsh',
      combine_logs: true,
      error_file: './logs/lightroom-error.log',
      out_file: './logs/lightroom.log',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'server',
      script: 'yarn',
      args: 'start:server',
      interpreter: '/bin/zsh',
      combine_logs: true,
      error_file: './logs/server-error.log',
      out_file: './logs/server.log',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'macula',
      script: 'yarn',
      args: 'start:macula',
      interpreter: '/bin/zsh',
      combine_logs: true,
      error_file: './logs/macula-error.log',
      out_file: './logs/macula.log',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'worker',
      script: 'yarn',
      args: 'start:worker',
      interpreter: '/bin/zsh',
      combine_logs: true,
      error_file: './logs/worker-error.log',
      out_file: './logs/worker.log',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'worker:watch',
      script: 'yarn',
      args: 'worker build:watch',
      interpreter: '/bin/zsh',
      combine_logs: true,
      error_file: './logs/watch-error.log',
      out_file: './logs/watch.log',
      env: {
        NODE_ENV: 'development',
      },
    },
    // {
    //   name: 'scheduler',
    //   script: 'yarn',
    //   args: 'start:scheduler',
    //   interpreter: '/bin/zsh',
    //   combine_logs: true,
    //   error_file: './logs/scheduler-error.log',
    //   out_file: './logs/scheduler.log',
    //   env: {
    //     NODE_ENV: 'development',
    //   },
    // },
    // {
    //   name: 'client',
    //   script: 'yarn',
    //   args: 'start:app',
    //   interpreter: '/bin/zsh',
    //   combine_logs: true,
    //   error_file: './logs/client-error.log',
    //   out_file: './logs/client.log',
    //   env: {
    //     NODE_ENV: 'development',
    //   },
    // },
    {
      name: 'db:watch',
      script: 'yarn',
      args: 'db watch',
      interpreter: '/bin/zsh',
      combine_logs: true,
      error_file: './logs/db-error.log',
      out_file: './logs/db.log',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'fileUpload',
      script: 'yarn',
      args: 'fileUpload start',
      interpreter: '/bin/zsh',
      combine_logs: true,
      error_file: './logs/fileUpload-error.log',
      out_file: './logs/fileUpload.log',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
}
