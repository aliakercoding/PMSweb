const ITEM = require("../models/ITEMS");
const CATALOG = require("../models/CATALOGS");
module.exports = {
  index: (req, res) => {
    res.render("admin/index");
  },

  // ITEMS CONTROLLING
  listallitemsGetMethod: (req, res) => {
    ITEM.find()
      .lean()
      .then((getallitems) => {
        res.render("admin/listallitems", { getallitems: getallitems });
      });
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
      require_prescription: Boolean(req.body.PrescriptionSwitcher),
    });

    newItem.save().then((postMethod) => {
      console.log(postMethod);
      req.flash("success-message", "تم الإعتماد بنجاح");
      res.redirect("/admin/listallitems");
    });
  },

  edititemsGetMethod: (req, res) => {
    const itemID = req.params.id;
    ITEM.findById(itemID)
      .lean()
      .then((edititems) => {
        res.render("admin/edititems", { edititems: edititems });
      });
  },

  edititemsPostMethod: (req, res) => {},

  deleteitemsPostMethod: (req, res) => {
    ITEM.findByIdAndDelete(req.params.id)
      .lean()
      .then((deleteitems) => {
        req.flash(
          "success-message",
          `تم حذف الصنف ${deleteitems.item_name} بنجاح`
        );
        res.redirect("/admin/listallitems");
      });
  },

  // CATALOGS CONTROLLING
  listallcatalogsGetMethod: (req, res) => {
    CATALOG.find()
      .lean()
      .then((listallcatalogs) => {
        res.render("admin/listallcatalogs", {
          listallcatalogs: listallcatalogs,
        });
      });
  },

  definenewcatalogPostMethod: (req, res) => {
    var catalogName = req.body.catalogName;

    if (catalogName) {
      const newCatalog = new CATALOG({
        catalog_name: catalogName,
      });
      newCatalog.save().then((listaddedCatalog) => {
        res.status(200).json(listaddedCatalog);
      });
    }
  },
};
