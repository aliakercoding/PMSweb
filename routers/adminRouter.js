const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";

  next();
}),

// MAIN ROUTER
  router.route("/").get(adminController.index);

// ITEMS ROUTER
router.route("/items/listallitems")
  .get(adminController.listallitemsGetMethod)
  .post(adminController.listallitemsPostMethod);

router.route("/items/definenewitem")
  .get(adminController.definenewitemGetMethod)
  .post(adminController.definenewitemPostMethod);

router.route("/items/edititems/:id")
  .get(adminController.edititemsGetMethod)
  .put(adminController.edititemsPostMethod);

router.route("/items/deleteitems/:id")
.delete(adminController.deleteitemsPostMethod);

// CATALOGS ROUTER
router.route("/catalogs/listallcatalogs")
  .get(adminController.listallcatalogsGetMethod)
  .post(adminController.definenewcatalogPostMethod);

  router.route('/catalogs/editcatalogs/:id')
  .get(adminController.editcatalogsGetMethod)
  .put(adminController.editcatalogsPostMethod);

  router.route('/catalogs/deletecatalogs/:id')
  .delete(adminController.deletecatalogsPostMethod);

// SECTIONS ROUTER
router.route("/sections/listallsections")
  .get(adminController.listallsectionsGetMethod)
  .post(adminController.definenewsectionPostMethod);

  router.route('/sections/editsections/:id')
  .get(adminController.editsectionsGetMethod)
  .put(adminController.editsectionsPostMethod);

  router.route('/sections/deletesections/:id')
  .delete(adminController.deletesectionsPostMethod);

// BRANDS ROUTER  
router.route("/brands/listallbrands")
.get(adminController.listallbrandsGetMethod)
.post(adminController.definenewbrandPostMethod);

router.route("/brands/editbrands/:id")
.get(adminController.editbrandsGetMethod)
.put(adminController.editbrandsPostMethod);

router.route("/brands/deletebrands/:id")
  .delete(adminController.deletebrandsPostMethod);

// VENDORS ROUTER
router.route('/vendors/listallvendors')
.get(adminController.listallvendorsGetMethod);

router.route('/vendors/definenewvendor')
.get(adminController.definenewvendorGetMethod)
.post(adminController.definenewvendorPostMethod);

router.route('/vendors/editvendors/:id')
.get(adminController.editvendorsGetMethod)
.put(adminController.editvendorsPostMethod);

router.route('/vendors/deletevendors/:id')
.delete(adminController.deletevendorsPostMethod);

// CUSTOMERS ROUTER
router.route('/customers/listallcustomers')
.get(adminController.listallcustomersGetMethod);

router.route('/customers/definenewcustomer')
.get(adminController.definenewcustomerGetMethod)
.post(adminController.definenewcustomerPostMethod);

router.route('/customers/editcustomers/:id')
.get(adminController.editcustomersGetMethod)
.put(adminController.editcustomersPostMethod);

router.route('/customers/deletecustomers/:id')
.delete(adminController.deletecustomersPostMethod);

// PURCHASES ROUTER
router.route('/purchases/newpurchase')
.get(adminController.newpurchaseinvoiceGetMethod)  
module.exports = router;
