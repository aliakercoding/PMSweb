const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";

  next();
}),

  router.route("/").get(adminController.index);

router.route("/listallitems")
  .get(adminController.listallitemsGetMethod)
  .post(adminController.listallitemsPostMethod);

router.route("/definenewitem")
  .get(adminController.definenewitemGetMethod)
  .post(adminController.definenewitemPostMethod);

router.route("/edititems/:id")
  .get(adminController.edititemsGetMethod)
  .put(adminController.edititemsPostMethod);

router.route("/deleteitems/:id")
.delete(adminController.deleteitemsPostMethod);

router.route("/listallcatalogs")
  .get(adminController.listallcatalogsGetMethod)
  .post(adminController.definenewcatalogPostMethod);

  router.route('/editcatalogs/:id')
  .get(adminController.editcatalogsGetMethod)
  .post(adminController.editcatalogsPostMethod);

router.route("/listallsections")
  .get(adminController.listallsectionsGetMethod)
  .post(adminController.definenewsectionPostMethod);

  router.route('/editsections/:id')
  .get(adminController.editsectionsGetMethod)
  .post(adminController.editsectionsPostMethod);

router.route("/listallbrands")
.get(adminController.listallbrandsGetMethod);

router.route("/definenewbrand")
  .get(adminController.definenewbrandGetMethod)
  .post(adminController.definenewbrandPostMethod);

router.route("/editbrands/:id")
.get(adminController.editbrandsGetMethod)
.put(adminController.editbrandsPostMethod);

router.route("/deletebrands/:id")
  .delete(adminController.deletebrandsPostMethod);


router.route('/listallvendors')
.get(adminController.listallvendorsGetMethod);

router.route('/definenewvendor')
.get(adminController.definenewvendorGetMethod)
.post(adminController.definenewvendorPostMethod);

router.route('/editvendors/:id')
.get(adminController.editvendorsGetMethod)
.put(adminController.editvendorsPostMethod);

router.route('/listallcustomers')
.get(adminController.listallcustomersGetMethod);

router.route('/definenewcustomer')
.get(adminController.definenewcustomerGetMethod)
.post(adminController.definenewcustomerPostMethod);

router.route('/editcustomers/:id')
.get(adminController.editcustomersGetMethod)
.put(adminController.editcustomersPostMethod);

router.route('/purchases/newpurchase')
.get(adminController.newpurchaseinvoiceGetMethod)  
module.exports = router;
