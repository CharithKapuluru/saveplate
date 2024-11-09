// notification.js

// Function to show toast notification
export function showToast(message) {
  // Check if the toast element exists
  let toast = document.getElementById("toast");

  // Create a toast element if it doesn't exist
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.classList.add("toast");
    document.body.appendChild(toast);
  }

  // Update the message and show the toast
  toast.textContent = message;
  toast.classList.add("show");

  // Remove the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
