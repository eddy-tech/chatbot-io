import { getSelectedBotAvatar } from "../pages/home";

export const message = (sender, text, timestamp, isUser) => {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.innerHTML = `
  <div class="message-container">
      <div class="message-content">
        <div class="sender">  ${
          !isUser
            ? `<img class="avatar" src="${getSelectedBotAvatar()}" alt="${sender} Avatar" width="25" height="25"/>`
            : ""
        } ${sender} <span class="timestamp">${timestamp}</span></div>
        <span class="text">${text}</span>
      </div>
  </div>
  `;
  return messageDiv;
};
