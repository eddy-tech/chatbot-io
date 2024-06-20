const fetchPlayerStats = async (commandType, playerId) => {
  // minecraft, steam, xbox
  if (!commandType || !playerId) {
    return "Veuillez saisir un launcher (minecraft, steam, xbox) et un identifiant de joueur.";
  }

  const url = `https://playerdb.co/api/player/${commandType}/${playerId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const filteredStats = data.data.player;

    if (commandType === "steam") {
      return formatSteamStats(filteredStats);
    }

    if (commandType === "minecraft") {
      return formatMinecraftStats(filteredStats);
    }

    if (commandType === "xbox") {
      return formatXboxPlayerStats(filteredStats);
    }

    return "Aucun filtre appliqué. Veuillez saisir un launcher (minecraft, steam, xbox).";
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return "Erreur lors de la récupération des données.";
  }
};

const formatSteamStats = (stats) => {
  const { meta, avatar, username } = stats;
  return `
    Voici les statistiques de ${username} sur Steam :<br>
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 10px; background-color: #68ab57; padding: 10px; border-radius: 15px;">
      <img src="${avatar}" alt="avatar" width="50" height="50" style="border-radius: 50%;">
      <b>${username}</b> ${meta.loccountrycode}<br>
      <b>SteamID</b> ${meta.steamid}<br>
      <b>Steam2ID</b> ${meta.steam2id}<br>
      <b>Steam3ID</b> ${meta.steam3id}<br>
      <a href="${meta.profileurl}" target="_blank">${meta.profileurl}</a>
    </div>
  `;
};

const formatMinecraftStats = (stats) => {
  const { id, avatar, username, skin_texture, raw_id } = stats;
  return `
    Voici les statistiques de ${username} sur Minecraft :<br>
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 10px; background-color: #68ab57; padding: 10px; border-radius: 15px;">
      <img src="${avatar}" alt="avatar" width="50" height="50" style="border-radius: 50%;">
      <b>${username}</b><br>
      <b>ID</b> ${id}<br>
      <b>Raw ID</b> ${raw_id}<br>
      <b>Skin</b> <a href="${skin_texture}" target="_blank">Voir le skin</a>
    </div>
  `;
};

const formatXboxPlayerStats = (stats) => {
  const { meta, avatar, username } = stats;
  return `
      Voici les statistiques de ${username} sur Xbox Live :<br>
      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 10px; background-color: #68ab57; padding: 10px; border-radius: 15px;">
        <img src="${avatar}" alt="avatar" width="50" height="50" style="border-radius: 50%;">
        <b>${username}</b><br>
        <b>Gamerscore</b> ${meta.gamerscore}<br>
        <b>Account Tier</b> ${meta.accountTier}<br>
        <b>Reputation</b> ${meta.xboxOneRep}
      </div>
    `;
};

export { fetchPlayerStats };
