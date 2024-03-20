//pm2 start ecosystem.config.js --env [env name]
//ref: https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'dist/main.js',
      env_production: {
        NODE_ENV: 'Production',
      },
      env_development: {
        NODE_ENV: 'Development',
      },
    },
  ],
};
