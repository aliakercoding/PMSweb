const express = require('express');
const router = express.Router();
const ITEM = require("../models/ITEMS");

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    const apiURI = req.params.id;
    console.log(apiURI)
    try {
        const data = await ITEM.find({ item_barcode: apiURI });
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;