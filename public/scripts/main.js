
// ENABLE ALL TOOLTIPS
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Toast for Item Insertion
const toastTriggeronInsert = document.getElementById("InsertNewItem");
const toastLiveInsertion = document.getElementById("liveToast");

if (toastTriggeronInsert) {
  const toastBootstrapInsert =
    bootstrap.Toast.getOrCreateInstance(toastLiveInsertion);
  toastTriggeronInsert.addEventListener("click", () => {
    toastBootstrapInsert.show();
  });
}

// Toast for Item Update
const toastTriggeronUpdate = document.getElementById("UpdateNewItem");
const toastLiveUpdate = document.getElementById("liveToast");

if (toastTriggeronUpdate) {
  const toastBootstrapUpdate =
    bootstrap.Toast.getOrCreateInstance(toastLiveUpdate);
  toastTriggeronUpdate.addEventListener("click", () => {
    toastBootstrapUpdate.show();
  });
}

// Toast for Item Delete
const toastTriggeronDelete = document.getElementById("DeleteItem");
const toastLiveDelete = document.getElementById("liveToast");

if (toastTriggeronDelete) {
  const toastBootstrapDelete =
    bootstrap.Toast.getOrCreateInstance(toastLiveDelete);
  toastTriggeronDelete.addEventListener("click", () => {
    toastBootstrapDelete.show();
  });
}

// Toast for Purchase Invoices
window.onload = (event) => {
  var toastLive = document.getElementById("InvoiceInfotoast");
  var toast = new bootstrap.Toast(toastLive);
  toast.show();
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// PRESCRIPTION SWITCHER FUNCTIONALITY ON EDIT ITEMS PAGE
var input = $('#PrescriptionSwitcher').val()
if (input === "true") {
  $("#PrescriptionSwitcher").prop('checked', true);
}

// SELECTING VENDORS ON PURCHASE
$('#VendorRelated').selectize({
  respect_word_boundaries: false,
  plugins: ["auto_select_on_type"]
});

// SELECTING ITEMS ON PURCHASE
$('#ItemRelated').selectize({
  respect_word_boundaries: false,
  plugins: ["auto_select_on_type"]
});


$("#loadDataBtn").on('click', function (e) {
  e.preventDefault();
  let itemAPI = $('#ItemRelated').val()
  console.log(itemAPI);

  $.ajax({
    url: "/api/getOne/"+itemAPI, //Path to your JSON file
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      let tableRows = "";
      data.forEach(item => {
        tableRows += `
              <tr>
                <td>${item.item_barcode}</td>
                <td>${item.item_name}</td>
                <td contenteditable></td>
                <td>${item.vat_percentage.$numberDecimal  }</td>
                <td>${item.vat_value.$numberDecimal}</td>
                <td>${item.item_retail_price.$numberDecimal}</td>
                <td contenteditable></td>
              </tr>
            `;
      });
      $("#dataTable tbody").append(tableRows); // Insert rows into the table
   
   
   // Function to calculate the sum of a specific column
function calculateColumnSum(columnIndex) {
  let sum = 0;

  // Iterate through each row in the table body
  $("#dataTable tbody tr").each(function () {
    // Get the value of the cell in the specified column
    let cellValue = parseFloat($(this).find("td").eq(columnIndex).text());

    // Add the value to the sum if it's a valid number
    if (!isNaN(cellValue)) {
      sum += cellValue;
    }
  });

  return sum;
}

// Example: Calculate the sum of the 3rd column (index 2) and log it
let total = calculateColumnSum(2); // Replace 2 with the index of the column you want to sum
console.log("Total:", total);
$("#InvoicePrice").text(total.toFixed(2)); // Update the total in the "InvoicePrice" span 
   
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    }
  });
});

