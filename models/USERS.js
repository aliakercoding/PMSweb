const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    user_code: {
        type: String,
        required: true,
    },
    
    user_passname: {
        type: String,
        required: true,
    },

    user_password: {
        type: String,
        required: true,
    },

    user_name: {
        type: String,
        required: true,
    },

    user_email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("USER", UsersSchema);
