const mongoose = require('mongoose');
const Schema = mongoose.Schema
ObjectId = Schema.ObjectId;

const SweetSchema = new Schema({
    imageUrl: String,
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    categoryId: ObjectId
})

const Sweet = mongoose.model('sweet', SweetSchema);
module.exports = Sweet;