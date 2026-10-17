// Real Gemini AI Script Generator via n8n Backend
async function generateAIScript() {
  var brandInput = document.getElementById("scriptBrand");
  var audienceInput = document.getElementById("scriptAudience");
  var outputBox = document.getElementById("scriptOutput");

  var brand = brandInput.value.trim();
  var audience = audienceInput.value.trim();

  if (!brand || !audience) {
    alert("Please enter both Brand Name and Target Audience!");
    return;
  }

  outputBox.innerText = "⚡ Connecting to Gemini AI Engine via Secure Backend...\nGenerating custom script...";

  try {
    // Calling n8n Cloud Webhook (Zero API keys in frontend)
    const response = await fetch("http://localhost:5678/webhook-test/generate-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brandName: brand,
        targetAudience: audience
      })
    });

    const data = await response.json();
    if (data && data.script) {
      outputBox.innerText = data.script;
    } else {
      outputBox.innerText = "Error: Could not retrieve script from AI engine.";
    }
  } catch (error) {
    console.error("AI Script Error:", error);
    outputBox.innerText = "Failed to connect to backend engine. Ensure n8n workflow is active.";
  }
}

// Function to Calculate Commercial Rate Card Budget
function calculateRate() {
  var serviceSelect = document.getElementById("calcService");
  var weeksInput = document.getElementById("calcWeeks");
  var estimateDisplay = document.getElementById("totalEstimate");

  if (!serviceSelect || !weeksInput || !estimateDisplay) return;

  var baseRate = parseInt(serviceSelect.value) || 1500;
  var weeks = parseInt(weeksInput.value) || 1;

  if (weeks < 1) weeks = 1;

  var total = baseRate * weeks;
  estimateDisplay.innerText = "$" + total.toLocaleString();
}
