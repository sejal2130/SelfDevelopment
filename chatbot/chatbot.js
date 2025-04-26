document.addEventListener("DOMContentLoaded", function () {
    let chatbotContainerCheck = setInterval(() => {
        const chatbotIcon = document.getElementById("chatbotIcon");
        const chatbotWindow = document.getElementById("chatbotWindow");
        const closeChatbot = document.getElementById("closeChatbot");
        const chatInput = document.getElementById("chatInput");
        const sendMessageButton = document.getElementById("sendMessage");
        const chatMessages = document.getElementById("chatbotMessages");

        if (chatbotIcon && chatbotWindow && closeChatbot && chatInput && sendMessageButton && chatMessages) {
            clearInterval(chatbotContainerCheck);

            chatbotIcon.addEventListener("click", function () {
                chatbotWindow.style.display = "flex";
            });

            closeChatbot.addEventListener("click", function () {
                chatbotWindow.style.display = "none";
            });

            sendMessageButton.addEventListener("click", sendMessage);
            chatInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter") sendMessage();
            });

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

            function displayMessage(sender, text, className) {
                let messageBubble = document.createElement("div");
                messageBubble.classList.add("chat-message", className);
                messageBubble.innerHTML = `<strong>${sender}:</strong> ${text}`;
                chatMessages.appendChild(messageBubble);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function getBotResponse(message) {
                message = message.toLowerCase();
                if (message.includes("hello")) return "Hi there! How can I assist you?";
                if (message.includes("resources")) return "You can find resources under the Resources section!";
                return "I'm still learning! Can you try asking something else?";
            }
        }
    }, 500);
});
