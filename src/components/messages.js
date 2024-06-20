import { message } from "./message";

export const messages = () => {
  const messageContainer = document.createElement("div");
  messageContainer.id = "messages";
  messageContainer.style.overflowY = "scroll";
  messageContainer.style.height = "60vh";

  // Forcer le défilement vers le bas au chargement initial
  setTimeout(() => {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, 0);

  return messageContainer;
};

export const addMessage = (messageContainer, sender, text, isUser) => {
  const timestamp = new Date().toLocaleTimeString().toString().slice(0, -3);
  const msg = message(sender, text, timestamp, isUser);
  const botName = document.querySelector("#selectedBot").innerText;

  // Ajouter la classe "user" ou "bot" pour le style
  if (isUser) {
    msg.classList.add("user");
  } else {
    msg.classList.add("bot");
  }

  // Ajouter le message à la conversation
  messageContainer.appendChild(msg);
  messageContainer.scrollTop = messageContainer.scrollHeight;

  // Sauvegarder le message dans le localStorage
  const currentMessages = getMessagesFromLocalStorage(botName);
  currentMessages.push({ sender, text, timestamp });
  saveMessagesToLocalStorage(botName, currentMessages);
};

// Sauvegarder da,ns le localStorage
export const saveMessagesToLocalStorage = (botName, messages) => {
  localStorage.setItem(`chat_${botName}`, JSON.stringify(messages));
};

// Récupérer les messages du localStorage
export const getMessagesFromLocalStorage = (botName) => {
  const messages = localStorage.getItem(`chat_${botName}`);
  return messages ? JSON.parse(messages) : [];
};
