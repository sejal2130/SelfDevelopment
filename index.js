document.addEventListener("DOMContentLoaded", function () {
    const chatbotIcon = document.getElementById("chatbotIcon");
    const chatbotWindow = document.getElementById("chatbotWindow");
    const closeChatbot = document.getElementById("closeChatbot");
    const chatInput = document.getElementById("chatInput");
    const sendMessageButton = document.getElementById("sendMessage");
    const chatMessages = document.getElementById("chatbotMessages");

    // Open chatbot
    chatbotIcon.addEventListener("click", function () {
        chatbotWindow.style.display = "flex";
    });

    // Close chatbot
    closeChatbot.addEventListener("click", function () {
        chatbotWindow.style.display = "none";
    });

    // Send Message
    function sendMessage() {
        let userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        displayMessage("You", userMessage, "user-message");

        setTimeout(() => {
            let botResponse = getBotResponse(userMessage);
            displayMessage("Bot", botResponse, "bot-message");
        }, 1000);

        chatInput.value = "";
    }

    // Display message function
    function displayMessage(sender, text, className) {
        let messageBubble = document.createElement("div");
        messageBubble.classList.add("chat-message", className);
        messageBubble.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(messageBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle enter key press
    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    // Handle send button click
    sendMessageButton.addEventListener("click", function () {
        sendMessage();
    });

    // Chatbot response logic
    function getBotResponse(message) {
        message = message.toLowerCase();
        if (message.includes("hello")) return "Hi there! How can I assist you?";
        if (message.includes("resources")) return "You can find resources under the Resources section!";
        if (message.includes("mental development")) return "Check out the mental development resources!";
        return "I'm still learning! Can you try asking something else?";
    }
});
