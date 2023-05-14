const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BasketSchema = new Schema({
    sweetId: String,
    userId: String
})

const Basket = mongoose.model('basket', BasketSchema);
module.exports = Basket;