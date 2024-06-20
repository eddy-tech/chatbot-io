class Message {
  constructor(sender, text, timestamp = new Date()) {
    this.sender = sender;
    this.text = text;
    this.timestamp = timestamp;
  }
}

export { Message };
