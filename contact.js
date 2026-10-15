// Function to Handle Advertiser Lead Form Submission
function handleLeadSubmission(e) {
  e.preventDefault();

  var brandName = document.getElementById("brandName").value;
  var brandEmail = document.getElementById("brandEmail").value;
  var service = document.getElementById("selectedService").value;
  var successAlert = document.getElementById("successAlert");

  if (!brandName || !brandEmail) {
    alert("Please fill in all required fields.");
    return;
  }

  // Show Success Alert
  if (successAlert) {
    successAlert.classList.remove("hidden");
  }

  // Optional: If you connect n8n webhook URL later, you can add fetch() request here:
  /*
  fetch('YOUR_N8N_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brandName: brandName, brandEmail: brandEmail, service: service })
  });
  */

  // Reset Form
  document.getElementById("leadForm").reset();
}
