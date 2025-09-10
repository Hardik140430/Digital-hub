const form = document.getElementById("userForm");
const previewContainer = document.getElementById("preview-container");
const previewDiv = document.getElementById("preview");
const confirmBtn = document.getElementById("confirmBtn");

let submittedUser = null;

// Form submission
form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const user = {
		name: document.getElementById("name").value,
		age: document.getElementById("age").value,
		gender: document.getElementById("gender").value,
		hobby: document.getElementById("hobby").value,
		email: document.getElementById("email").value,
		phone: document.getElementById("phone").value
	};

	try {
		const response = await fetch("/user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user)
		});

		if (response.ok) {
			submittedUser = await response.json();
			showPreview();
			document.getElementById("popupModal").style.display = "block";
		} else {
			document.getElementById("errorModal").style.display = "block";
		}
	} catch (error) {
		console.error(error);
		document.getElementById("errorModal").style.display = "block";
	}
});

// Show preview
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

// Edit single field
async function editField(field) {
	const newValue = prompt(`Enter new value for ${field}:`, submittedUser[field]);
	if (!newValue) return;

	try {
		const response = await fetch(`/user/${submittedUser.id}?field=${field}&value=${newValue}`, {
			method: "PATCH"
		});

		if (response.ok) {
			submittedUser = await response.json();
			showPreview();
		} else {
			document.getElementById("errorModal").style.display = "block";
		}
	} catch (error) {
		console.error(error);
		document.getElementById("errorModal").style.display = "block";
	}
}

// Confirm button (optional)
confirmBtn.addEventListener("click", () => {
	document.getElementById("popupModal").style.display = "block";
});

// Close popup when clicking on X
document.getElementById("closeModal").onclick = function() {
	document.getElementById("popupModal").style.display = "none";
};

document.getElementById("closeModal1").onclick = function() {
	document.getElementById("errorModal").style.display = "none";
}

// Close popup when clicking outside modal
window.onclick = function(event) {
	const modal = document.getElementById("popupModal");
	const modal2 = document.getElementById("errorModal");
	if (event.target === modal) {
		modal.style.display = "none";
	} else if (event.target === modal2) {
		modal2.style.display = "none";
	}
};
