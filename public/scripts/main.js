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
if(input === "true"){
$("#PrescriptionSwitcher").prop('checked', true);
}
 
//ADDING NEW CATALOG
  $("#catalogCreator").on('click', function(e){
    e.preventDefault();
    var catalogData = $("#catalogName").val();
    $.ajax({
      url : '/admin/listallcatalogs',
      type : 'POST',
      data : {catalogName : catalogData},
      success : function(response){
        
var html = `<tr>
                <td>${response.catalog_name}</td>
                <td>{عدد الأصناف التابعة للكاتالوج}</td>
                <td class="d-flex justify-content-center">
                    <a href="/admin/editcatalogs/${response.id}" class="btn btn-warning ms-2" data-bs-toggle="tooltip"
                        data-bs-placement="bottom" data-bs-title="تعديل بيانات الكاتالوج"><i
                            class="bi bi-pencil"></i></a>
                    <form action="/admin/deletecatalogs/${response.id}?action=DELETE" method="post">
                        <button type="submit" class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="bottom"
                            data-bs-html="true" data-bs-title="حذف الكاتالوج <b>- لا يمكن الرجوع في هذا الإجراء</b>"><i
                                class="bi bi-trash"></i>
                        </button>
                    </form>
                </td>
            </tr>`;


            $(".refreshCatalog").append(html);
      }
    })
  });