const ITEM = require("/models/ITEMS");

function tableListner(id) {
    const itemID = document.getElementById("barcodeAddon");
   id = itemID;
    const itemName = document.getElementById("nameAddon");
    const itemVP = document.getElementById("vendorpriceAddon");
    const itemVATP = document.getElementById("vatpercentageAddon");
    const itemVATV = document.getElementById("vatvalueAddon");
    const itemRP = document.getElementById("retailpriceAddon");

ITEM.findById(id).lean().then(itemintrainfo=>{
    if (!itemintrainfo) {
        console.log("error");
    } else {
        itemName.value = itemintrainfo.item_name;
        itemVATP.value = itemintrainfo.vat_percentage;
        itemVATV.value = itemintrainfo.vat_value;
        itemRP.value = itemintrainfo.item_retail_price;

        console.log(id)
    }
});
}
