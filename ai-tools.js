document.addEventListener('DOMContentLoaded', () => {
    const scriptForm = document.getElementById('script-generator-form');
    const outputBox = document.getElementById('script-output');
    const generateBtn = document.getElementById('generate-btn');

    if (scriptForm) {
        scriptForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Form Inputs Gather Karein
            const brandName = document.getElementById('brandName').value.trim();
            const targetAudience = document.getElementById('targetAudience').value.trim();

            if (!brandName || !targetAudience) {
                alert('Please fill in all required fields.');
                return;
            }

            // 2. Loading State Show Karein
            outputBox.value = "Generating commercial script via AI Engine... Please wait...";
            if (generateBtn) generateBtn.disabled = true;

            try {
                // 3. Local n8n Test Webhook Call
                const response = await fetch('http://localhost:5678/webhook-test/generate-script', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        brandName: brandName,
                        targetAudience: targetAudience
                    })
                });

                if (!response.ok) {
                    throw new Error(`Server returned status ${response.status}`);
                }

                const data = await response.json();

                // 4. Output Render Karein
                if (data && data.script) {
                    outputBox.value = data.script;
                } else if (typeof data === 'string') {
                    outputBox.value = data;
                } else {
                    outputBox.value = JSON.stringify(data, null, 2);
                }

            } catch (error) {
                console.error("Script Generation Error:", error);
                outputBox.value = `Error: Could not retrieve script from AI engine.\nDetails: ${error.message}\n\nTip: Ensure n8n is running locally and click 'Listen for Test Event' in n8n Webhook node.`;
            } finally {
                if (generateBtn) generateBtn.disabled = false;
            }
        });
    }
});
