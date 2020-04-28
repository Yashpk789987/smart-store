var path = require('path');
const serverConfig = {
  port: 3000 || process.env.port,
  routes: {
    cors: true,
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
};

module.exports = serverConfig;
