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

            outputBox.value = "⏳ Connecting to AI Engine... Generating commercial script...";
            if (generateBtn) generateBtn.disabled = true;

            // Pehle Active Production Webhook try karega, agar fail hua to Test Webhook try karega
            const urls = [
                'http://localhost:5678/webhook/generate-script',
                'http://localhost:5678/webhook-test/generate-script'
            ];

            let scriptText = null;
            let lastError = null;

            for (const url of urls) {
                try {
                    const response = await fetch(url, {
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
                        continue;
                    }

                    // Text response handle karna taake empty JSON crash na ho
                    const rawText = await response.text();
                    
                    if (!rawText || rawText.trim() === "") {
                        continue;
                    }

                    try {
                        const data = JSON.parse(rawText);
                        if (data && data.script) {
                            scriptText = data.script;
                        } else if (data && data.message) {
                            scriptText = data.message;
                        } else {
                            scriptText = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
                        }
                    } catch (pErr) {
                        // Agar n8n direct plain text return kar raha ho
                        scriptText = rawText;
                    }

                    if (scriptText) break; // Success! Loop stop ho jaye ga

                } catch (err) {
                    lastError = err;
                }
            }

            if (scriptText) {
                outputBox.value = scriptText;
            } else {
                outputBox.value = `❌ Response Empty/Failed:\n\n` +
                                 `n8n workflow request receive kar raha hai lekin wapas text nahi bhej raha.\n\n` +
                                 `Fix Check:\n` +
                                 `1. n8n me "Respond to Webhook" node ke andar Response Body me yeh daalein:\n` +
                                 `   {\n     "script": "={{ $json.candidates[0].content.parts[0].text }}"\n   }\n` +
                                 `2. Workflow ko Top-Right se "Active" (Green) zaroor karein.`;
            }

            if (generateBtn) generateBtn.disabled = false;
        });
    }
});
