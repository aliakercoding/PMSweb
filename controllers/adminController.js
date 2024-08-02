const ITEM = require("../models/ITEMS");
module.exports = {
  index: (req, res) => {
    res.render("admin/index");
  },

  listallitemsGetMethod: (req, res) => {
    res.render("admin/listallitems");
  },

  listallitemsPostMethod: (req, res) => {
    res.send("ALL ITEMS PAGE for addition");
  },

  definenewitemGetMethod: (req, res) => {
    res.render("admin/definenewitem");
  },
  definenewitemPostMethod: (req, res) => {
    const newItem = new ITEM({
      item_barcode: req.body.itemBarcode,
      item_name: req.body.itemName,
      item_retail_price: req.body.itemPrice,
      vat_percentage: req.body.VATPercentage,
      vat_value: req.body.VATvalue,
      units_per_item: req.body.itemUits,
      parts_per_unit: req.body.itemParts,
      customer_acquired_points: req.body.AcquiredPoints,
      user_acquired_points: req.body.UserAcquiredPoints,
      require_prescription: Boolean(req.body.PrescriptionSwitcher)
    });

    newItem.save().then(postMethod =>{
      console.log(postMethod);
      req.flash('success-message', 'تم الإعتماد بنجاح');
    });
  },
};
