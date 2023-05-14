const mongoose = require('mongoose');
const Schema = mongoose.Schema
ObjectId = Schema.ObjectId;

const OrderSchema = new Schema({
    userId: ObjectId,
    productListId: [ObjectId],
    status: Number,
    firstName: String,
    lastName: String,
    adress: String,
    city: String,
    phoneNumber: String,
    date: String,
    totalPrice: String
})

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;