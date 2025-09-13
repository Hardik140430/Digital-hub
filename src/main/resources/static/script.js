const fields = [
  { name: "fullName", placeholder: "Enter your full name", type: "text" },
  { name: "phone", placeholder: "Enter your phone number", type: "tel" },
  { name: "email", placeholder: "Enter your email", type: "email" },
  { name: "city", placeholder: "Enter your city", type: "text" },
  { name: "favoriteSport", placeholder: "Enter your favorite sport", type: "text" },
  { name: "favoriteTeam", placeholder: "Enter your favorite team", type: "text" },
  { name: "favoriteSportsIcon", placeholder: "Enter your favorite sports icon", type: "text" }
];

let currentStep = 0;
let userData = {};

const inputContainer = document.getElementById("input-container");
const progressBar = document.getElementById("progress-bar");
const previewSection = document.getElementById("preview-section");
const previewContainer = document.getElementById("preview-container");

// Validation rules
function validateInput(fieldName, value) {
  switch (fieldName) {
    case "fullName":
      return /^[a-zA-Z\s]{3,50}$/.test(value) || "Please enter a valid full name (letters only, min 3 chars).";

    case "phone":
      return /^[6-9]\d{9}$/.test(value) || "Enter a valid 10-digit phone number starting with 6-9.";

    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email address.";

    case "city":
      return /^[a-zA-Z\s]{2,50}$/.test(value) || "Enter a valid city name.";

    case "favoriteSport":
      return value.length >= 3 || "Please enter at least 3 characters.";

    case "favoriteTeam":
      return value.length >= 2 || "Please enter at least 2 characters.";

    case "favoriteSportsIcon":
      return value.length >= 2 || "Please enter at least 2 characters.";

    default:
      return value !== "" || "This field is required.";
  }
}

// Show next field automatically
function showField(step) {
  if (step >= fields.length) {
    showPreview();
    return;
  }

  const field = fields[step];

  const wrapper = document.createElement("div");
  wrapper.classList.add("field-wrapper");

  const input = document.createElement("input");
  input.type = field.type || "text";
  input.placeholder = field.placeholder;
  input.setAttribute("data-field", field.name);

  // Enter key → validate and move on
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      validateAndProceed(input, wrapper, step, field.type);
    }
  });

  wrapper.appendChild(input);
  inputContainer.appendChild(wrapper);

  // Smooth reveal animation
  setTimeout(() => wrapper.classList.add("active"), 50);

  if (step === 0) input.focus();
}

// Validate and move to next
function validateAndProceed(input, wrapper, step, type) {
  const value = input.value.trim();
  const fieldName = input.getAttribute("data-field");

  // Run validation
  const validation = validateInput(fieldName, value);

  if (validation !== true) {
    input.classList.add("error");

    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: validation,
      confirmButtonColor: "#007bff"
    });

    setTimeout(() => input.classList.remove("error"), 800);
    return;
  }

  // Save value
  userData[fieldName] = value;

  // Animate current field
  wrapper.classList.add("answered");

  // Next field
  currentStep++;
  updateProgress();
  showField(currentStep);
}

// Progress bar
function updateProgress() {
  const percent = (currentStep / fields.length) * 100;
  if (progressBar) {
    progressBar.style.width = percent + "%";
  }
}

// Show preview
function showPreview() {
  inputContainer.innerHTML = "";
  previewSection.classList.remove("hidden");
  renderPreview();
}

// Render preview with edit/save
function renderPreview() {
  previewContainer.innerHTML = "";

  Object.entries(userData).forEach(([key, value]) => {
    const fieldDef = fields.find(f => f.name === key);

    const row = document.createElement("div");
    row.classList.add("preview-row");

    const label = document.createElement("div");
    label.classList.add("preview-label");
    label.textContent = key + ":";

    const valueDiv = document.createElement("div");
    valueDiv.classList.add("preview-value");
    valueDiv.textContent = value;

    const actions = document.createElement("div");
    actions.classList.add("preview-actions");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.style.display = "none";

    editBtn.onclick = () => {
      const input = document.createElement("input");
      input.type = fieldDef?.type || "text"; // use correct type
      input.value = userData[key];
      input.setAttribute("data-field", key);

      valueDiv.innerHTML = "";
      valueDiv.appendChild(input);

      editBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
    };

    saveBtn.onclick = () => {
      const input = valueDiv.querySelector("input");
      if (input) {
        const newValue = input.value.trim();
        const validation = validateInput(key, newValue);

        if (validation !== true) {
          Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: validation,
            confirmButtonColor: "#007bff"
          });
          return;
        }

        userData[key] = newValue;
        valueDiv.textContent = newValue;
        saveBtn.style.display = "none";
        editBtn.style.display = "inline-block";
      }
    };

    actions.appendChild(editBtn);
    actions.appendChild(saveBtn);

    row.appendChild(label);
    row.appendChild(valueDiv);
    row.appendChild(actions);
    previewContainer.appendChild(row);
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit All";
  submitBtn.classList.add("btn-submit");
  submitBtn.onclick = async () => {
    try {
      const response = await fetch("https://localhost:8080/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        Swal.fire("Success!", "User saved successfully!", "success");
      } else {
        Swal.fire("Error!", "Failed to save user.", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };
  previewContainer.appendChild(submitBtn);
}

// Start form
showField(currentStep);
