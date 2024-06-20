import { Bot } from "../models/bot";
import { fetchHolidays } from "./holidays";
import { fetchPlayerStats } from "./gamedb";
import { fetchYesNo } from "./yesno";
import HolidayImg from "../assets/umbrella.png";
import GamePadImg from "../assets/gamepad.png";
import YesNoImg from "../assets/yes-no.png";

const bots = [
  new Bot("Vacances Bot", HolidayImg),
  new Bot("Player Stats Bot", GamePadImg),
  new Bot("YesNo Bot", YesNoImg),
];

// Vacances Bot
bots[0].addCommand(
  "hello",
  () =>
    "👋 Bonjour, je suis Vacances Bot !<br>🌴 Vous voulez savoir quand sont les prochains jours fériés ? Je suis là pour vous aider !<br>🗓️ Essayez les commandes suivantes <code>next</code> <code>past</code> <code>all</code>"
);
bots[0].addCommand(
  "help",
  () =>
    "Commandes disponibles <code>hello</code> <code>help</code> <code>next</code> <code>past</code> <code>all</code>"
);
bots[0].addCommand("next", async () => {
  const holidays = await fetchHolidays("next");
  return holidays;
});
bots[0].addCommand("past", async () => {
  const holidays = await fetchHolidays("past");
  return holidays;
});
bots[0].addCommand("all", async () => {
  const holidays = await fetchHolidays("all");
  return holidays;
});

// Player Stats Bot
bots[1].addCommand(
  "hello",
  () =>
    "🎮 Bonjour, je suis Player Stats Bot !<br>📊 Je peux vous aider à obtenir des statistiques de jeu à partir de votre identifiant de joueur.<br>🕹️ Essayez les commandes suivantes  <code>steam 'playerId'</code> <code>minecraft 'playerId'</code> <code>xbox 'playerId'</code><br>📋 Exemple <code>steam pexilo</code>"
);
bots[1].addCommand(
  "help",
  () =>
    "Commandes disponibles <code>hello</code> <code>help</code> <code>steam 'playerId'</code> <code>minecraft 'playerId'</code> <code>xbox 'playerId'</code>"
);
// Utilisation d'arguments pour les commandes
bots[1].addCommand("steam", async (playerId) => {
  const stats = await fetchPlayerStats("steam", playerId);
  return stats;
});
bots[1].addCommand("minecraft", async (playerId) => {
  const stats = await fetchPlayerStats("minecraft", playerId);
  return stats;
});
bots[1].addCommand("xbox", async (playerId) => {
  const stats = await fetchPlayerStats("xbox", playerId);
  return stats;
});

// YesNo Bot
bots[2].addCommand(
  "hello",
  () =>
    "❓ Bonjour, je suis YesNo Bot !<br>🔮 Je peux répondre à vos questions par oui ou non.<br>🗣️Essayez la commande suivante <code>ask 'votre phrase'</code> <code>random</code> <code>guess 'oui'/'non'</code>"
);
bots[2].addCommand(
  "help",
  () =>
    "Commandes disponibles <code>hello</code> <code>help</code> <code>ask 'votre phrase'</code> <code>random</code> <code>guess 'oui' ou 'non'</code>"
);
bots[2].addCommand("ask", async () => {
  const answer = await fetchYesNo("ask");
  return answer;
});
bots[2].addCommand("random", async () => {
  const answer = await fetchYesNo("random");
  return answer;
});
bots[2].addCommand("guess", async (choice) => {
  const answer = await fetchYesNo("guess", choice);
  return answer;
});

export { bots };
