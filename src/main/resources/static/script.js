const form = document.getElementById("userForm");
const previewContainer = document.getElementById("preview-container");
const previewDiv = document.getElementById("preview");
const confirmBtn = document.getElementById("confirmBtn");

let submittedUser = null;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    hobby: document.getElementById("hobby").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  try {
    const response = await fetch("http://localhost:8090/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      submittedUser = await response.json();
      showPreview();
      Swal.fire({
        title: "Form Submitted!",
        html: `
    <b>Name:</b> ${submittedUser.name} <br>
    <b>Age:</b> ${submittedUser.age} <br>
    <b>Gender:</b> ${submittedUser.gender} <br>
    <b>Hobby:</b> ${submittedUser.hobby} <br>
    <b>Email:</b> ${submittedUser.email} <br>
    <b>Phone:</b> ${submittedUser.phone}
  `,
        icon: "success",
        confirmButtonText: "Done",
        confirmButtonColor: "#28a745",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "error submitting form",
        icon: "failure",
        confirmButtonText: "OK",
        confirmButtonColor: "#e64214ff",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error",
      text: "sever error",
      icon: "failure",
      confirmButtonText: "OK",
      confirmButtonColor: "#e64214ff",
    });
  }
});

function showPreview() {
  form.style.display = "none";
  previewContainer.style.display = "block";

  previewDiv.innerHTML = "";
  for (let key in submittedUser) {
    if (key !== "id") {
      const div = document.createElement("div");
      div.innerHTML = `${key}: ${submittedUser[key]} <button onclick="editField('${key}')">Edit</button>`;
      previewDiv.appendChild(div);
    }
  }
}

async function editField(field) {
  Swal.fire({
    title: `Edit ${field}`,
    input: "text",
    inputLabel: `Enter new value for ${field}:`,
    inputValue: submittedUser[field],
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#28a745",
  }).then((result) => {
    if (result.isConfirmed) {
      const newValue = result.value;
      if (newValue && newValue.trim() !== "") {
        submittedUser[field] = newValue;
        document.getElementById(`${field}Value`).innerText = newValue;
      }
    }
  });
  if (!newValue) return;

  try {
    const response = await fetch(
      `http://localhost:8090/user/${submittedUser.id}?field=${field}&value=${newValue}`,
      {
        method: "PATCH",
      }
    );

    if (response.ok) {
      submittedUser = await response.json();
      showPreview();
    } else {
      Swal.fire({
        title: " Error",
        text: "error",
        icon: "failure",
        confirmButtonText: "OK",
        confirmButtonColor: "#e64214ff",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: " Error",
      text: "sever error",
      icon: "failure",
      confirmButtonText: "OK",
      confirmButtonColor: "#e64214ff",
    });
  }
}
confirmBtn.addEventListener("click", () => {
  Swal.fire({
    title: "✅ Successfull!",
    text: "form submitted succefully",
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#2cba6cff",
  });
});
