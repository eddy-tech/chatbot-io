import { message } from "./message";
import { addMessage, getMessagesFromLocalStorage } from "./messages";

export const selector = (bots) => {
  const selectorDiv = document.createElement("div");
  selectorDiv.id = "selector";

  bots.forEach((bot) => {
    const botButton = document.createElement("button");

    const avatarImg = document.createElement("img");
    avatarImg.src = bot.avatar;
    avatarImg.alt = `${bot.name} avatar`;
    avatarImg.classList.add("bot-avatar");

    botButton.appendChild(avatarImg);
    botButton.innerHTML += bot.name;
    botButton.classList.add("bot-button");

    botButton.addEventListener("click", () => selectBot(bot));
    selectorDiv.appendChild(botButton);
  });

  return selectorDiv;
};

const selectBot = (bot) => {
  document.querySelector("#selectedBot").innerText = bot.name;
  document.querySelector("#selectedBotAvatar").src = bot.avatar;

  const messageContainer = document.getElementById("messages");
  messageContainer.innerHTML = "";

  // Charger l'historique des messages
  const messages = getMessagesFromLocalStorage(bot.name);

  messages.forEach(({ sender, text, timestamp }) => {
    const isUser = sender !== bot.name;
    const msg = message(sender, text, timestamp, isUser);
    isUser ? msg.classList.add("user") : msg.classList.add("bot");

    messageContainer.appendChild(msg);
  });

  messageContainer.scrollTop = messageContainer.scrollHeight;

  throwCommandHello(bot);
};

const throwCommandHello = async (bot) => {
  const messageContainer = document.getElementById("messages");
  const currentMessages = getMessagesFromLocalStorage(bot.name);

  // Vérifiez si la commande "hello" est déjà dans l'historique
  const helloMessageExists = currentMessages.some(
    (msg) => msg.text.includes("Bonjour") && msg.sender === bot.name
  );

  if (!helloMessageExists) {
    const botResponse = await bot.respondToCommand("hello");
    addMessage(messageContainer, bot.name, botResponse, false, false);
  }
};
