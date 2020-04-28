const inert = require('@hapi/inert');
const vision = require('vision');
let plugin = [];

plugin.push({
  plugin: inert,
  options: {}
});
plugin.push({
  plugin: vision,
  options: {}
});

module.exports = plugin;
