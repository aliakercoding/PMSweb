const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorsSchema = new Schema({
  vendor_name: {
    type: String,
    required: true,
    default: "بدون تاجر",
  },
  vendor_address: {
    type: String,
    required: false,
    default: "بدون عنوان",
  },

  vendor_contact: {
    type: String,
    required: true,
    default: "0020",
  },

  total_debit: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
});

module.exports = mongoose.model("VENDOR", VendorsSchema);
