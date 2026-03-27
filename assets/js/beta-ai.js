/**
 * Beta AI - Generation 1 Logic
 * Meisophant Digital Services - Stable v1 Version
 */
const GEMINI_KEY = 'AIzaSyBS2q53ZGo41xpsxz-Ol_1FP985hI8dW5w';
const AI_NAME = "Beta AI";

// Using the absolute stable v1 endpoint
const API_URL = `https://googleapis.com{GEMINI_KEY}`;

async function chat() {
    const input = document.getElementById('userInput');
    const window = document.getElementById('chatWindow');
    const status = document.getElementById('status');
    const message = input.value.trim();

    if (!message) return;

    // 1. Show User Message
    window.innerHTML += `<p style="text-align: right;"><strong>You:</strong> ${message}</p>`;
    input.value = "";
    window.scrollTop = window.scrollHeight;
    status.style.display = "block";

    try {
        // 2. Fetch using standard POST
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Your name is ${AI_NAME}. You are the generational AI for Meisophant Digital Services. Be brief and brilliant. User: ${message}` }]
                }]
            })
        });

        const data = await response.json();

        // 3. Robust Data Extraction (The Fix)
        let aiResponse = "";
        
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            aiResponse = data.candidates[0].content.parts[0].text;
        } else if (data.error) {
            aiResponse = `System Error: ${data.error.message}`;
        } else {
            aiResponse = "System reached a logic dead-end. Please try again.";
        }

        // 4. Update UI
        status.style.display = "none";
        window.innerHTML += `<p style="color: mediumpurple; text-align: left;"><strong>${AI_NAME}:</strong> ${aiResponse}</p>`;
        window.scrollTop = window.scrollHeight;

    } catch (error) {
        console.error("Uplink Error:", error);
        status.style.display = "none";
        window.innerHTML += `<p style="color: red;"> <strong> Connection failed,</strong> ${error.message}</p>`;
    }
}

// Ensure the button works immediately
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.onclick = chat;
    }
    
    document.getElementById('userInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') chat();
    });
});
