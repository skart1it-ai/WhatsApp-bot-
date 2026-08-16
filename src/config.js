require("dotenv").config();

module.exports = {
  botName: process.env.BOT_NAME || "WhatsApp Bot",
  prefix: process.env.PREFIX || "!",
  port: Number(process.env.PORT || 3000),

  tiktok: {
    accessToken: process.env.TIKTOK_ACCESS_TOKEN || "",
    clientKey: process.env.TIKTOK_CLIENT_KEY || "",
    clientSecret: process.env.TIKTOK_CLIENT_SECRET || ""
  }
};