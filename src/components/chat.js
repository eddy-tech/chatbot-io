export const chat = () => {
  const chatBox = document.createElement("div");
  chatBox.id = "chatBox";
  chatBox.innerHTML = `
    <input id="chatInput" type="text" placeholder="Tapez un message"/>
    <button id="sendButton">Envoyer</button>
  `;
  return chatBox;
};
