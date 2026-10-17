// Real Gemini AI Commercial Script Generator Integration
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

  outputBox.innerText = "⚡ Connecting to Gemini AI Engine...\nGenerating live custom commercial script...";

  // ⚠️ YAHAN APNI GEMINI API KEY APPLIY KAREIN
  const GEMINI_API_KEY = ""; 

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Write a high-impact, professional 30-second TV commercial script for a brand named "${brand}" targeting "${audience}". Include Scene directions, Audio cues, Voiceover script, and Call to Action.`
          }]
        }]
      })
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      outputBox.innerText = data.candidates[0].content.parts[0].text;
    } else {
      outputBox.innerText = "Error generating script. Please check API Key or try again.";
    }
  } catch (error) {
    console.error("AI Script Error:", error);
    outputBox.innerText = "Failed to connect to AI engine. Ensure network connectivity.";
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
