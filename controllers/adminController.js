const ITEM = require("../models/ITEMS");
const CATALOG = require("../models/CATALOGS");
const SECTION = require("../models/SECTIONS");
const BRAND = require("../models/BRANDS");
const VENDOR = require('../models/VENDORS');
const CUSTOMER = require('../models/CUSTOMERS');
const { DateTime } = require("luxon");

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
        res.render("admin/items/listallitems", { getallitems: getallitems });
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
                      res.render("admin/items/definenewitem", {
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
      res.redirect("/admin/items/listallitems");
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
                            res.render("admin/items/edititems", {
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

    ITEM.findById(itemID).then(updateitems => {
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

      updateitems.save().then(updatedItem => {
        req.flash('success-message', `تم تعديل بيانات المنتج ${updatedItem.item_name} بنجاح`);
        res.redirect('/admin/items/listallitems');

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
        res.redirect("/admin/items/listallitems");
      });
  },

  // CATALOGS CONTROLLING
  listallcatalogsGetMethod: (req, res) => {
    CATALOG.find()
      .lean()
      .then((listallcatalogs) => {
        res.render("admin/catalogs/listallcatalogs", {
          listallcatalogs: listallcatalogs,
        });
      });
  },

  definenewcatalogPostMethod: (req, res) => {
    const newCatalog = new CATALOG({
      catalog_name: req.body.catalogName,
    });

    newCatalog.save().then((postMethod) => {
      req.flash("success-message", "تم الإعتماد بنجاح");
      res.redirect("/admin/catalogs/listallcatalogs");
    });

  },

  editcatalogsGetMethod: (req, res) => {
    const catalogID = req.params.id;
    CATALOG.findById(catalogID).lean().then(editcatalogs => {
      res.render('admin/catalogs/editcatalogs', { editcatalogs: editcatalogs });
    })
  },

  editcatalogsPostMethod: (req, res) => {
    const catalogID = req.params.id;
    CATALOG.findById(catalogID).then(updatingCatalog => {
      updatingCatalog.catalog_name = req.body.catalogName;

      updatingCatalog.save().then(updatedCatalog => {
        req.flash('success-message', `تم تعديل بيانات الكتالوج ${updatedCatalog.catalog_name} بنجاح`)
        res.redirect('/admin/catalogs/listallcatalogs');
      });
    });
  },
  deletecatalogsPostMethod: (req, res) => {
    CATALOG.findByIdAndDelete(req.params.id)
      .lean()
      .then((deletecatalogs) => {
        req.flash(
          "success-message",
          `تم حذف الكتالوج ${deletecatalogs.catalog_name} بنجاح`
        );
        res.redirect("/admin/catalogs/listallcatalogs");
      });
  },


  // SECTIONS CONTROLLING
  listallsectionsGetMethod: (req, res) => {
    SECTION.find()
      .lean()
      .then((listallsections) => {
        res.render("admin/sections/listallsections", {
          listallsections: listallsections,
        });
      });
  },

  definenewsectionPostMethod: (req, res) => {
    const newSection = new SECTION({
      section_name: req.body.sectionName
    });

    newSection.save().then((postMethod) => {
      req.flash("success-message", "تم الإعتماد بنجاح");
      res.redirect("/admin/sections/listallsections");
    })
  },

  editsectionsGetMethod: (req, res) => {
    const sectionID = req.params.id;
    SECTION.findById(sectionID).lean().then(editsections => {
      res.render('admin/sections/editsections', { editsections: editsections });
    });
  },

  editsectionsPostMethod: (req, res) => {
    const sectionID = req.params.id;

    SECTION.findById(sectionID).then((updatesections) => {
      updatesections.section_name = req.body.sectionName;
      updatesections.save().then((updatedSection) => {
        req.flash('success-message', `تم تعديل بيانات القسم ${updatedSection.section_name} بنجاح`)
        res.redirect('/admin/sections/listallsections');
      })
    })
  },
  deletesectionsPostMethod: (req, res) => {
    SECTION.findByIdAndDelete(req.params.id)
      .lean()
      .then((deletesections) => {
        req.flash(
          "success-message",
          `تم حذف القسم ${deletesections.section_name} بنجاح`
        );
        res.redirect("/admin/sections/listallsections");
      });
  },

  // BRANDS CONTROLLING
  listallbrandsGetMethod: (req, res) => {
    BRAND.find()
      .lean()
      .then((listallbrands) => {
        res.render("admin/brands/listallbrands", { listallbrands: listallbrands });
      });
  },

  definenewbrandPostMethod: (req, res) => {
    const newBrand = new BRAND({
      brand_name: req.body.brandName,
    });

    newBrand.save().then((postMethod) => {
      req.flash("success-message", "تم الإعتماد بنجاح");
      res.redirect("/admin/brands/listallbrands");
    });
  },

  editbrandsGetMethod: (req, res) => {
    const brandID = req.params.id;
    BRAND.findById(brandID)
      .lean()
      .then((editbrands) => {
        res.render("admin/brands/editbrands", { editbrands: editbrands });
      });
  },

  editbrandsPostMethod: (req, res) => {
    const brandID = req.params.id;

    BRAND.findById(brandID).then(updatebrands => {
      updatebrands.brand_name = req.body.brandName;

      updatebrands.save().then(updatedBrand => {
        req.flash('success-message', `تم تعديل بيانات الماركة ${updatedBrand.brand_name} بنجاح`)
        res.redirect('/admin/brands/listallbrands');
      });
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
        res.redirect("/admin/brands/listallbrands");
      });
  },

  // VENDORS CONTROLLING
  listallvendorsGetMethod: (req, res) => {
    VENDOR.find().lean().then(listallvendors => {
      res.render('admin/vendors/listallvendors', { listallvendors: listallvendors });
    });
  },

  definenewvendorGetMethod: (req, res) => {
    res.render('admin/vendors/definenewvendor');
  },

  definenewvendorPostMethod: (req, res) => {
    const newVendor = new VENDOR({
      vendor_name: req.body.vendorName,
      vendor_contact: req.body.vendorContact,
      vendor_address: req.body.vendorAddress,
      total_debit: req.body.vendorDebit
    });

    newVendor.save().then(postMethod => {
      console.log(postMethod);
      req.flash('success-message', 'تم الاعتماد بنجاح');
      res.redirect('/admin/vendors/listallvendors');
    });
  },

  editvendorsGetMethod: (req, res) => {
    const vendorID = req.params.id;
    VENDOR.findById(vendorID).lean().then(editvendors => {
      res.render('admin/vendors/editvendors', { editvendors: editvendors });
    });
  },

  editvendorsPostMethod: (req, res) => {
    const VendorID = req.params.id;

    VENDOR.findById(VendorID).then(updatevendors => {
      updatevendors.vendor_name = req.body.vendorName,
        updatevendors.vendor_contact = req.body.vendorContact,
        updatevendors.vendor_address = req.body.vendorAddress,
        updatevendors.total_debit = req.body.vendorDebit

      updatevendors.save().then(updatedVendors => {
        req.flash('success-message', `تم تعديل بيانات المورد ${updatedVendors.vendor_name} بنجاح`);
        res.redirect('/admin/vendors/listallvendors');
      });
    });
  },
  deletevendorsPostMethod: (req, res) => {
    VENDOR.findByIdAndDelete(req.params.id)
      .lean()
      .then((deletevendors) => {
        req.flash(
          "success-message",
          `تم حذف المورد ${deletevendors.vendor_name} بنجاح`
        );
        res.redirect("/admin/vendors/listallvendors");
      });
  },

  // CUSTOMERS CONTROLLING
  listallcustomersGetMethod: (req, res) => {
    CUSTOMER.find().lean().then(listallcustomers => {
      res.render('admin/customers/listallcustomers', { listallcustomers: listallcustomers });
    });
  },

  definenewcustomerGetMethod: (req, res) => {
    res.render('admin/customers/definenewcustomer');
  },

  definenewcustomerPostMethod: (req, res) => {
    const newCustomer = new CUSTOMER({
      customer_name: req.body.customerName,
      customer_contact: req.body.customerContact,
      customer_address: req.body.customerAddress,
      total_acquired_points: req.body.customerAcquiredPoints,
      total_credit: req.body.customerCredit
    });

    newCustomer.save().then(postMethod => {
      console.log(postMethod);
      req.flash('success-message', 'تم الاعتماد بنجاح');
      res.redirect('/admin/customers/listallcustomers');
    });
  },

  editcustomersGetMethod: (req, res) => {
    const customerID = req.params.id;
    CUSTOMER.findById(customerID).lean().then(editcustomers => {
      res.render('admin/customers/editcustomers', { editcustomers: editcustomers });
    });
  },

  editcustomersPostMethod: (req, res) => {
    const CustomerID = req.params.id;

    CUSTOMER.findById(CustomerID).then(updatecustomers => {
      updatecustomers.customer_name = req.body.customerName,
        updatecustomers.customer_contact = req.body.customerContact,
        updatecustomers.customer_address = req.body.customerAddress,
        updatecustomers.total_acquired_points = req.body.customerAcquiredPoints,
        updatecustomers.total_credit = req.body.customerCredit

      updatecustomers.save().then(updatedCustomers => {
        req.flash('success-message', `تم تعديل بيانات العميل ${updatedCustomers.customer_name} بنجاح`);
        res.redirect('/admin/customers/listallcustomers');
      });
    });
  },
  deletecustomersPostMethod: (req, res) => {
    CUSTOMER.findByIdAndDelete(req.params.id)
      .lean()
      .then((deletecustomers) => {
        req.flash(
          "success-message",
          `تم حذف العميل ${deletecustomers.customer_name} بنجاح`
        );
        res.redirect("/admin/customers/listallcustomers");
      });
  },

  // PURCHASE INVOICES
  newpurchaseinvoiceGetMethod: (req, res) => {
    // Configuring Time Zones
    let dateTime = DateTime.local();
    let timeDisplay = dateTime.toISODate();

    // VENDOR LISTING
    VENDOR.find().lean().then(vendorquery => {
      if (!vendorquery) {

      } else {
        ITEM.find().lean().then(getallitems => {
          res.render('admin/purchases/newpurchaseinvoice', { timeDisplay: timeDisplay, vendorquery: vendorquery, getallitems: getallitems });

        })
      }
    })

  },

  
    // IPC
    itemIPCGetMethod:(req,res)=>{
var IPC = req.body.name;
console.log(IPC);
    }

};
