let ShopOwner = require('../models/ShopOwner');
var handleFileUpload = require('../tools/fileUpload');

exports.save = (req, reply) => {
  console.log(req.payload);
  console.log('I am calling ...babes');
  return { code: 'hello...' };
  // console.log(req.payload);
  // return `My Name is : ${req.payload.name} `;
};

exports.serve_register = (req, reply) => {
  return reply.view('shop_owner/register');
};

exports.upload_file = (req, reply) => {
  const { payload } = req;
  const response = handleFileUpload(req.payload['pic'], './public/uploads/');
  return response;
};
