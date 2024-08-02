const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


router.all("/*", (req, res, next) => {
    req.app.locals.layout = "main";
  
    next();
  }),
      
router.route('/')
    .get(mainController.index);

router.route('/login')
    .get(mainController.loginMethodGet)
    .post(mainController.loginMethodPost);

router.route('/addnewuser')
.get(mainController.addnewuserMethodGet);





module.exports = router;