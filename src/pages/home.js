import { messages } from "../components/messages";
import { selector } from "../components/selector";
import { bots } from "../apis/bot.config";
import robotImg from "../assets/robot.png";
import { chat } from "../components/chat";

export const home = () => {
  const app = document.createElement("div");
  app.appendChild(selector(bots));
  app.appendChild(messages());
  app.appendChild(chat());

  const selectedBotInfo = document.createElement("div");
  selectedBotInfo.id = "selectedBotInfo";
  selectedBotInfo.innerHTML = `
      <img id="selectedBotAvatar" src="${robotImg}" alt="Bot Avatar" width="25" height="25"/>
      <span id="selectedBot">Sélectionnez un bot</span>
    `;
  app.appendChild(selectedBotInfo);

  return app;
};

export const getSelectedBotAvatar = () => {
  const selectedBotAvatar = document.getElementById("selectedBotAvatar");
  return selectedBotAvatar ? selectedBotAvatar.src : robotImg;
};
