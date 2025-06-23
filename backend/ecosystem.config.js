const path = require('path')

module.exports = {
  apps: [{
    name: "backend",
    script: path.resolve(__dirname,"./dist/bin/server.js"),
    args: "--prod",
    cwd: __dirname,
    instances: 3, 
    exec_mode: "cluster",
    autorestart: true,
    watch: true,	 
    max_memory_restart: "300M",
    env: {
      NODE_ENV: "production",
    },
    //post_deploy: "npx prisma migrate deploy"
  }]
}

