module.exports = {
  apps: [
    {
      name: 'inforst-backend',
      script: 'src/index.js', // Your main server file
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};