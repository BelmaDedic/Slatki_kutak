const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema ({
    name: String,
    password: String,
    email: String,
    role: Number
});

const Users = mongoose.model('users', UsersSchema);
module.exports = Users;