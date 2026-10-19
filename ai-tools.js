document.addEventListener('DOMContentLoaded', () => {
    const scriptForm = document.getElementById('script-generator-form');
    const outputBox = document.getElementById('script-output');
    const generateBtn = document.getElementById('generate-btn');

    if (scriptForm) {
        scriptForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const brandName = document.getElementById('brandName').value.trim();
            const targetAudience = document.getElementById('targetAudience').value.trim();

            if (!brandName || !targetAudience) {
                alert('Please fill in all required fields.');
                return;
            }

            // Status indication
            outputBox.value = "⏳ Connecting to AI Engine... Generating commercial script...";
            if (generateBtn) generateBtn.disabled = true;

            try {
                // Try Production URL first, fallback to Test URL if needed
                const response = await fetch('http://localhost:5678/webhook/generate-script', {
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
                    throw new Error(`Server response error: ${response.status}`);
                }

                const data = await response.json();

                if (data && data.script) {
                    outputBox.value = data.script;
                } else if (typeof data === 'string') {
                    outputBox.value = data;
                } else {
                    outputBox.value = JSON.stringify(data, null, 2);
                }

            } catch (error) {
                console.error("Script Generation Error:", error);
                outputBox.value = `❌ Connection Error: Could not reach n8n backend engine.\n\n` +
                                 `Details: ${error.message}\n\n` +
                                 `Quick Checklist:\n` +
                                 `1. Ensure n8n is running locally (http://localhost:5678).\n` +
                                 `2. Make sure the workflow is ACTIVE (Top-right toggle in n8n = Green ON).\n` +
                                 `3. Verify Webhook Node path is set to 'generate-script'.`;
            } finally {
                if (generateBtn) generateBtn.disabled = false;
            }
        });
    }
});
