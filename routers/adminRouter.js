const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "admin";

  next();
}),
    
  router.route("/").get(adminController.index);

  router.route('/listallitems')
  .get(adminController.listallitemsGetMethod)
  .post(adminController.listallitemsPostMethod);

  router.route('/definenewitem')
  .get(adminController.definenewitemGetMethod)
  .post(adminController.definenewitemPostMethod);

  module.exports = router;