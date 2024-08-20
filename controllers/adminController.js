const ITEM = require("../models/ITEMS");
const CATALOG = require("../models/CATALOGS");
const SECTION = require("../models/SECTIONS");
const BRAND = require("../models/BRANDS");

module.exports = {
  index: (req, res) => {
    res.render("admin/index");
  },

  // ITEMS CONTROLLING
  listallitemsGetMethod: (req, res) => {
    ITEM.find()
      .populate(["catalog_related", "section_related", "brand_related"])
      .lean()
      .then((getallitems) => {
        res.render("admin/listallitems", { getallitems: getallitems });
      });
  },

  listallitemsPostMethod: (req, res) => {
    res.send("ALL ITEMS PAGE for addition");
  },

  definenewitemGetMethod: (req, res) => {
    CATALOG.find()
      .lean()
      .then((getallcatalogs) => {
        if (!getallcatalogs) {
          console.log("catalog here");
        } else {
          SECTION.find()
            .lean()
            .then((getallsections) => {
              if (!getallsections) {
                console.log("sections here");
              } else {
                BRAND.find()
                  .lean()
                  .then((getallbrands) => {
                    if (!getallbrands) {
                      console.log("brands here");
                    } else {
                      res.render("admin/definenewitem", {
                        getallcatalogs: getallcatalogs,
                        getallsections: getallsections,
                        getallbrands: getallbrands,
                      });
                    }
                  });
              }
            });
        }
      });
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
      catalog_related: req.body.CatalogSelector,
      section_related: req.body.SectionSelector,
      brand_related: req.body.BrandSelector,
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
        if (!edititems) {
        } else {
          CATALOG.find()
            .lean()
            .then((editcatalogs) => {
              if (!editcatalogs) {
              } else {
                SECTION.find()
                  .lean()
                  .then((editsections) => {
                    if (!editsections) {
                    } else {
                      BRAND.find()
                        .lean()
                        .then((editbrands) => {
                          if (!editbrands) {
                          } else {
                            res.render("admin/edititems", {
                              edititems: edititems,
                              editcatalogs: editcatalogs,
                              editsections: editsections,
                              editbrands: editbrands,
                            });
                          }
                        });
                    }
                  });
              }
            });
        }
      });
  },

  edititemsPostMethod: (req, res) => {
    const itemID = req.params.id;

      ITEM.findById(itemID).then(updateitems=>{
      updateitems.item_barcode = req.body.itemBarcode;
      updateitems.item_name = req.body.itemName;
      updateitems.item_retail_price = req.body.itemPrice;
      updateitems.vat_percentage = req.body.VATPercentage;
      updateitems.vat_value = req.body.VATvalue;
      updateitems.units_per_item = req.body.itemUits;
      updateitems.parts_per_unit = req.body.itemParts;
      updateitems.customer_acquired_points = req.body.AcquiredPoints;
      updateitems.user_acquired_points = req.body.UserAcquiredPoints;
      updateitems.catalog_related = req.body.CatalogSelector;
      updateitems.section_related = req.body.SectionSelector;
      updateitems.brand_related = req.body.BrandSelector;
      updateitems.require_prescription = Boolean(req.body.PrescriptionSwitcher);

      updateitems.save().then(updatedItem=>{
        req.flash('success-message' , `تم تعديل بيانات المنتج ${updatedItem.item_name} بنجاح`);
        res.redirect('/admin/listallitems');

      });
       });





   

  },

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

  editcatalogsGetMethod:async(req,res) =>{
const catalogID = req.params.id;
const getcatalogs = await CATALOG.find().lean();


CATALOG.findById(catalogID).lean().then(currentcatalog=>{
  res.render('admin/editcatalogs' , {currentcatalog: currentcatalog , getcatalogs:getcatalogs});
})





  },

  editcatalogsPostMethod: (req , res) =>{
const catalogID = req.params.id;
const catalogNewName = req.body.catalogName;

if(catalogNewName){
CATALOG.findById(catalogID).then(updatingCatalog =>{
  updatingCatalog.catalog_name = catalogNewName;

  updatingCatalog.save().then(updatedCatalog =>{
    res.status(200).json({url: '/admin/listallcatalogs'});
  })
})
}
  },
  
  // SECTIONS CONTROLLING
  listallsectionsGetMethod: (req, res) => {
    SECTION.find()
      .lean()
      .then((listallsections) => {
        res.render("admin/listallsections", {
          listallsections: listallsections,
        });
      });
  },

  definenewsectionPostMethod: (req, res) => {
    var sectionName = req.body.sectionName;

    if (sectionName) {
      const newSection = new SECTION({
        section_name: sectionName,
      });
      newSection.save().then((listaddedSection) => {
        res.status(200).json(listaddedSection);
      });
    }
  },

  // BRANDS CONTROLLING
  listallbrandsGetMethod: (req, res) => {
    BRAND.find()
      .lean()
      .then((listallbrands) => {
        res.render("admin/listallbrands", { listallbrands: listallbrands });
      });
  },

  definenewbrandGetMethod: (req, res) => {
    res.render("admin/definenewbrand");
  },

  definenewbrandPostMethod: (req, res) => {
    const newBrand = new BRAND({
      brand_name: req.body.brandName,
    });

    newBrand.save().then((postMethod) => {
      console.log(postMethod);
      req.flash("success-message", "تم الإعتماد بنجاح");
      res.redirect("/admin/listallbrands");
    });
  },

  editbrandsGetMethod: (req, res) => {
    const brandID = req.params.id;
    BRAND.findById(brandID)
      .lean()
      .then((editbrands) => {
        res.render("admin/editbrands", { editbrands: editbrands });
      });
  },

  deletebrandsPostMethod: (req, res) => {
    BRAND.findByIdAndDelete(req.params.id)
      .lean()
      .then((deletebrands) => {
        req.flash(
          "success-message",
          `تم حذف العلامة التجارية ${deletebrands.brand_name} بنجاح`
        );
        res.redirect("/admin/listallbrands");
      });
  },
};
