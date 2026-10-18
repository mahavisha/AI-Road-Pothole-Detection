const roadImage = document.getElementById("roadImage");
const preview = document.getElementById("preview");
const placeholder = document.getElementById("previewPlaceholder");
const fileStatus = document.getElementById("fileStatus");
const result = document.getElementById("result");
const detectButton = document.getElementById("detectButton");
const dropzone = document.getElementById("dropzone");
let currentPreviewUrl = null;

roadImage.addEventListener("change", () => {
  const file = roadImage.files && roadImage.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    result.textContent = "Please choose a valid image file.";
    result.className = "result-message error";
    roadImage.value = "";
    return;
  }

  if (currentPreviewUrl) URL.revokeObjectURL(currentPreviewUrl);
  currentPreviewUrl = URL.createObjectURL(file);
  preview.src = currentPreviewUrl;
  preview.style.display = "block";
  placeholder.style.display = "none";
  fileStatus.textContent = file.name;
  detectButton.disabled = false;
  result.textContent = "Image loaded successfully. Detection is not connected yet.";
  result.className = "result-message";
});

detectButton.addEventListener("click", () => {
  if (!roadImage.files || !roadImage.files[0]) {
    result.textContent = "Please select a road image first.";
    result.className = "result-message error";
    return;
  }

  // This frontend preview does not run AI inference.
  // Connect this button to a Flask/API endpoint when the model is ready.
  result.textContent = "Image ready. To detect potholes, connect this page to your trained AI model through a backend API.";
  result.className = "result-message success";
});

["dragenter", "dragover"].forEach(eventName => {
  dropzone.addEventListener(eventName, event => {
    event.preventDefault();
    dropzone.classList.add("dragging");
  });
});
["dragleave", "drop"].forEach(eventName => {
  dropzone.addEventListener(eventName, event => {
    event.preventDefault();
    dropzone.classList.remove("dragging");
  });
});
dropzone.addEventListener("drop", event => {
  const file = event.dataTransfer.files && event.dataTransfer.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    result.textContent = "Please drop a valid image file.";
    result.className = "result-message error";
    return;
  }
  const transfer = new DataTransfer();
  transfer.items.add(file);
  roadImage.files = transfer.files;
  roadImage.dispatchEvent(new Event("change"));
});

// Highlight the sidebar destination as the user navigates.
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});
