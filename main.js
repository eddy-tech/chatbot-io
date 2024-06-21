import { bots } from "./src/apis/bot.config";
import { home } from "./src/pages/home";
import { addMessage } from "./src/components/messages";
import "./src/styles/style.css";

document.querySelector("#app").appendChild(home());

const messageContainer = document.getElementById("messages");
const getBotNames = () => bots.map((bot) => bot.name);

const sendMessage = async () => {
  const chatInput = document.getElementById("chatInput");
  const messageText = chatInput.value;
  const selectedBotName = document.querySelector("#selectedBot").innerText;

  if (messageText && getBotNames().includes(selectedBotName)) {
    addMessage(messageContainer, "Moi", messageText, true);

    const bot = bots.find((b) => b.name === selectedBotName);
    if (bot) {
      const [command, ...args] = messageText.split(" ");
      const botResponse = await bot.respondToCommand(command, args);
      addMessage(messageContainer, bot.name, botResponse, false);
    }
  }

  chatInput.value = "";
};

document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("chatInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
