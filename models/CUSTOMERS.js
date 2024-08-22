const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomersSchema = new Schema({
  customer_name: {
    type: String,
    required: true,
  },
  customer_address: {
    type: String,
    required: true,
  },

  customer_contact: {
    type: String,
    required: true,
    default: "0020",
  },

  total_acquired_points: {
    type: mongoose.Types.Decimal128,
    required: false,
  },

  total_credit: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
});

module.exports = mongoose.model("CUSTOMER", CustomersSchema);
