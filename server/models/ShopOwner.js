const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ShopOwnerSchema = new Schema({
  name: { type: String, requiSred: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('ShopOwner', ShopOwnerSchema);
