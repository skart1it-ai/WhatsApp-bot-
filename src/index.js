const express = require("express");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const config = require("./config");
const handleCommand = require("./commands");

const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "online",
    bot: config.botName
  });
});

app.listen(config.port, () => {
  console.log(`Web server running on port ${config.port}`);
});

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "main-bot"
  }),

  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  }
});

client.on("qr", qr => {
  console.log("\nScan this QR code with WhatsApp:\n");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log(`✅ ${config.botName} is online!`);
});

client.on("authenticated", () => {
  console.log("✅ WhatsApp authenticated.");
});

client.on("auth_failure", message => {
  console.error("❌ Authentication failed:", message);
});

client.on("disconnected", reason => {
  console.log("WhatsApp disconnected:", reason);
});

client.on("message", async message => {
  try {
    await handleCommand(client, message);
  } catch (error) {
    console.error("Command error:", error);

    try {
      await message.reply(
        "❌ Something went wrong while processing your command."
      );
    } catch {}
  }
});

client.initialize();