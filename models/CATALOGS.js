const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogsSchema = new Schema({
    catalog_name: {
        type: String,
        required: true,
        default: "بدون كاتالوج"
    }
});

module.exports = mongoose.model("CATALOG", CatalogsSchema);
