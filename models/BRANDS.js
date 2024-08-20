const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandsSchema = new Schema({
    brand_name: {
        type: String,
        required: true,
        default: "بدون علامة تجارية"
    }
});

module.exports = mongoose.model("BRAND", BrandsSchema);
