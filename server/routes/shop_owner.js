let shop_owner_controller = require('../controllers/shopOwner');

module.exports = [
  {
    method: 'GET',
    path: '/shop_owner/',
    handler: shop_owner_controller.save
  },
  {
    method: 'GET',
    path: '/shop_owner/register',
    handler: shop_owner_controller.serve_register
  },
  {
    method: 'POST',
    path: '/shop_owner/submit',
    handler: shop_owner_controller.save
  },
  {
    method: 'POST',
    path: '/shop_owner/upload',
    config: {
      payload: {
        output: 'stream',
        allow: 'multipart/form-data'
      }
    },
    handler: shop_owner_controller.upload_file
  }
];
