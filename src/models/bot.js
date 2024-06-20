class Bot {
  constructor(name, avatar) {
    this.name = name;
    this.avatar = avatar;
    this.commands = {};
  }

  addCommand(command, action) {
    this.commands[command] = action;
  }

  async respondToCommand(command, args = []) {
    if (this.commands[command]) {
      const response = await this.commands[command](...args);
      return response;
    } else {
      return "Je ne comprends pas cette commande.";
    }
  }
}

export { Bot };
