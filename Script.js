document.addEventListener("DOMContentLoaded", function () {
    const addnew = document.getElementById("AddNew");
    const updateV = document.getElementById("updateV");
    const saveI = document.getElementById("saveI");
    const cancelI = document.getElementById("cancelI");
    const cancelI2 = document.getElementById("CancelI2");
    const UpdateI = document.getElementById("UpdateI");
      const body = document.body;

  body.classList.add("activeIndex");

  addnew.addEventListener("click", () => {
    body.classList.add("activeInsert");
      body.classList.remove("activeIndex");
      body.classList.remove("activeUpdate");
  });
    updateV.addEventListener("click", () => {
      body.classList.add("activeUpdate");
        body.classList.remove("activeIndex");
        body.classList.remove("activeInsert");
    });
  saveI.addEventListener("click", () => {
    body.classList.add("activeIndex");
      body.classList.remove("activeInsert");
      body.classList.remove("activeUpdate");
  });
    cancelI.addEventListener("click", () => {
      body.classList.add("activeIndex");
      body.classList.remove("activeInsert");
      body.classList.remove("activeUpdate");
    });
    UpdateI.addEventListener("click", () => {
      body.classList.add("activeIndex");
      body.classList.remove("activeInsert");
      body.classList.remove("activeUpdate");
    });
    cancelI2.addEventListener("click", () => {
      body.classList.add("activeIndex");
      body.classList.remove("activeInsert");
      body.classList.remove("activeUpdate");
    });
});
//-------------------------------------------------------------------------------------------//
//?------------------------------------------API-------------------------------------------------//
//-------------------------------------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
  fetchTasks();

  document
    .getElementById("createForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(this);
      fetch("./insert.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
     .then((data) => {
          fetchTasks();
          this.reset();
        })
        .catch((error) => console.error("Error:", error));
    });

  document
    .getElementById("editForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(this);
      fetch("./update.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          fetchTasks();
          var modal = bootstrap.Modal.getInstance(
            document.getElementById("update")
          );
          modal.hide();
        })
        .catch((error) => console.error("Error:", error));
    });
});

function fetchTasks() {
  fetch("./Read.php")
    .then((response) => response.json())
   .then((data) => {
      var tbody = document.getElementById("taskTableBody");
      tbody.innerHTML = "";
      data.forEach((task) => {
        var tr = document.createElement("tr");
        tr.innerHTML = `
                       <td>${task.Name}</td>
                        <td>${task.Phone}</td>
                         <td>${task.Email}</td>
                        <td>
                        <a  class="link-dark" id="updateV" onclick="editTask('${task.Name}', '${task.Phone}', '${task.Email}')"><i class="fa-solid fa-pen-to-square fs-5 me-3"></i></a>

                         <a  class="link-dark" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash fs-5"></i></a>
                            
                        </td>
                    `;
        tbody.appendChild(tr);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function deleteTask(id) {
  var formData = new FormData();
  formData.append("id", id);

  fetch("./Delete.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {fetchTasks();})
    .catch((error) => console.error("Error:", error));
}

function editTask(Name, Phone, Email) {
  document.getElementById("Name_Update").value = Name;
  document.getElementById("Phone_Update").value = Phone;
  document.getElementById("Email_Update").value = Email;
  var modal = new bootstrap.Modal(document.getElementById("update"));
  modal.show();
}
