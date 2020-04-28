require('dotenv').config();
var ejs = require('ejs');
const Hapi = require('@hapi/hapi');
var routes = require('./routes/index');
var mongoose = require('mongoose');
var serverConfig = require('../serverConfig');
var plugin = require('./plugins');

const server = new Hapi.server(serverConfig);

////////  database ///////////////

mongoose.connect('mongodb://localhost:27017/smart_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

///////   database //////////////

/////// CONFIGURING ROUTES ///////
server.route(routes);
/////// CONFIGURING ROUTES //////

const init = async () => {
  ///// REGISTERING PLUGINS ////////
  await server.register(plugin);
  /////////////////////////////////

  /////// SERVING STATIC FILES //////////
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.'
      }
    }
  });
  /////// SERVING STATIC FILES /////////
  ////// VIEWS ////////
  server.views({
    engines: {
      ejs: ejs
    },
    relativeTo: __dirname,
    path: 'views'
  });
  ///// VIEWS ////////

  await server.start();
  console.log(`Server is started at ${server.info.uri}`);
};

///// STARTING SEVER ///////
init()
  .then(() => {
    console.log('HAPI SERVER STARTED AND PLUGINS ARE ADDED');
  })
  .catch(err => {
    console.log('ERROR IN STARTING HAPI SERVOR :', err);
  });
//// STARTING SERVER ///////
