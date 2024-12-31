
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

// PURCHASE INVOICE FUNCTIONALITIES
$("#itemIPCinsertion").on('click', function (e) {
  e.preventDefault()});

  //   var data = $("#itemIPcode").html();

  //   $.ajax({
  //     url: '/admin/purchases/newpurchase',
  //     type: 'POST',
  //     data: { name: data },
  //     success: function (response) {
  //       var html = `<tr>
  //                             <th scope="row" class="apiURI" contenteditable>${response}</th>
  //                             <td>{اسم الصنف}</td>
  //                             <td>{سعر شراء الصنف}</td>
  //                             <td>{نسبة الضريبة}</td>
  //                             <td>{قيمة الضريبة}</td>
  //                             <td>{سعر بيع المنتج}</td>
  //                             <td contenteditable>{الكمية المشتراه}</td>
  //                             <td>
  //                             <a class="btn btn-warning ms-2 linkAPI"></a>
  //                                 <button class="btn btn-sm btn-danger"><i class="bi bi-trash3"></i></button>
  //                             </td>
  //                         </tr>`;

  //       $(".IPClist").append(html);

  //     }
  //   })
  // });


  // // create an observer instance
  // var target = document.querySelector('#AA');
  // var linkAPI = $('.linkAPI');
  // var observer = new WebKitMutationObserver(function (mutations) {
  //   mutations.forEach(function (mutation) {
  //     var apiURI = $('.apiURI').html();
  //     $('.linkAPI').hover(function () {
  //       this.href = `/api/GetOne/${apiURI}`;
  //     });
  //     console.log(apiURI);
  //     console.log(linkAPI);
  //   });
  // });
  // observer.observe(target, { attributes: true, childList: true, characterData: true, subtree: true });
  // //observer.disconnect(); - to stop observing

  var collector = $('#itemIPcode').html();
  console.log(collector);
  fetch(`/api/getOne/${collector}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataReturned) {
      let placeholder = document.querySelector("#AA");
      let out = "";
      for (let data of dataReturned) {
        out += `
    <tr>
    <td>${data.item_barcode}</td>
    </tr>
    `;

      }
      placeholder.innerHTML = out;
    })