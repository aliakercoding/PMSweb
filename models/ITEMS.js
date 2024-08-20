const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
  item_barcode: {
    type: Number,
    required: true,
  },

  item_name: {
    type: String,
    required: true,
  },

  item_retail_price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },

  vat_percentage: {
    type: mongoose.Types.Decimal128,
    required: true,
  },

  vat_value: {
    type: mongoose.Types.Decimal128,
    required: true,
  },

  units_per_item: {
    type: Number,
    required: true,
  },

  parts_per_unit: {
    type: Number,
    required: true,
  },

  customer_acquired_points: {
    type: mongoose.Types.Decimal128,
    required: true,
  },

  user_acquired_points: {
    type: mongoose.Types.Decimal128,
    required: true,
  },

  require_prescription: {
    type: Boolean,
    required: true,
  },

  catalog_related:{
    type: mongoose.Types.ObjectId,
    ref: 'CATALOG'
  },
  section_related:{
    type: mongoose.Types.ObjectId,
    ref: 'SECTION'
  },
  brand_related:{
    type: mongoose.Types.ObjectId,
    ref: 'BRAND'
  }
});

module.exports = mongoose.model("ITEM", ItemsSchema);
