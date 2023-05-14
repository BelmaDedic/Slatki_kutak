const mongoose = require('mongoose');
const Schema = mongoose.Schema
ObjectId = Schema.ObjectId;

const SpecialOrderSchema = new Schema({
    userId: ObjectId,
    sort: String,
    size: String,
    inscriptions: String,
    textInscriptions: String,
    floorsNumber: String,
    shape: String,
    otherShape: String,
    date: String,
    notes: String,
    fullPrice: String,
    status: Number,
    firstName: String,
    lastName: String,
    adress: String,
    city: String,
    phoneNumber: String,
    dateOfOrder: String
})

const SpecialOrder = mongoose.model('specialOrder', SpecialOrderSchema);
module.exports = SpecialOrder;