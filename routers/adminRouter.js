const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";

  next();
}),
  router.route("/").get(adminController.index);

router
  .route("/listallitems")
  .get(adminController.listallitemsGetMethod)
  .post(adminController.listallitemsPostMethod);

router
  .route("/definenewitem")
  .get(adminController.definenewitemGetMethod)
  .post(adminController.definenewitemPostMethod);

router
  .route("/edititems/:id")
  .get(adminController.edititemsGetMethod)
  .put(adminController.edititemsPostMethod);

router.route("/deleteitems/:id")
.delete(adminController.deleteitemsPostMethod);

router
  .route("/listallcatalogs")
  .get(adminController.listallcatalogsGetMethod)
  .post(adminController.definenewcatalogPostMethod);

  router.route('/editcatalogs/:id')
  .get(adminController.editcatalogsGetMethod)
  .post(adminController.editcatalogsPostMethod);

router
  .route("/listallsections")
  .get(adminController.listallsectionsGetMethod)
  .post(adminController.definenewsectionPostMethod);

router.route("/listallbrands").get(adminController.listallbrandsGetMethod);

router
  .route("/definenewbrand")
  .get(adminController.definenewbrandGetMethod)
  .post(adminController.definenewbrandPostMethod);

router.route("/editbrands/:id").get(adminController.editbrandsGetMethod);

router
  .route("/deletebrands/:id")
  .delete(adminController.deletebrandsPostMethod);

module.exports = router;
