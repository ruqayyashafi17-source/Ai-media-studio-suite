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

            outputBox.value = "Generating commercial script... Please wait...";
            if (generateBtn) generateBtn.disabled = true;

            try {
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
                    throw new Error(`HTTP Error! Status: ${response.status}`);
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
                // Yeh line ab exact error screen par dikha degi
                outputBox.value = "ASAL ERROR: " + error.message + "\n\n(Yeh error copy karke mujhe bata dein)";
            } finally {
                if (generateBtn) generateBtn.disabled = false;
            }
        });
    }
});
