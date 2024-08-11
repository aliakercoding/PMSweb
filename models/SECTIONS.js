const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionsSchema = new Schema({
    section_name: {
        type: String,
        required: true,
        default: "بدون قسم"
    }
});

module.exports = mongoose.model("SECTION", SectionsSchema);
