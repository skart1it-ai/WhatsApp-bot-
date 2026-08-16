const config = require("./config");
const {
  getTikTokStatus,
  createPromotionPlan
} = require("./tiktok");

async function handleCommand(client, message) {
  const text = (message.body || "").trim();

  if (!text.startsWith(config.prefix)) {
    return;
  }

  const args = text.slice(config.prefix.length).trim().split(/\s+/);

  const command = (args.shift() || "").toLowerCase();

  switch (command) {
    case "menu":
    case "help":
      return menu(message);

    case "ping":
      return message.reply("🏓 Pong!");

    case "info":
      return message.reply(
        `🤖 *${config.botName}*\n\n` +
        `Prefix: ${config.prefix}\n` +
        `Status: Online ✅`
      );

    case "tiktok":
      return tiktokMenu(message);

    case "ttstatus":
      return tiktokStatus(message);

    case "boost":
      return tiktokBoost(message, args);

    default:
      return message.reply(
        `❌ Unknown command.\n\nType *${config.prefix}menu* to see available commands.`
      );
  }
}

async function menu(message) {
  const p = config.prefix;

  const text =
`╭━━━〔 🤖 ${config.botName} 〕━━━╮

👋 *Welcome!*

📌 *GENERAL*
${p}menu
${p}ping
${p}info

🎵 *MEDIA*
${p}download
${p}music
${p}video

🤖 *AI*
${p}ai <question>

🎵 *TIKTOK*
${p}tiktok
${p}ttstatus
${p}boost <video/profile>

⚙️ *TOOLS*
${p}search
${p}caption

╰━━━━━━━━━━━━━━━━━━╯`;

  return message.reply(text);
}

async function tiktokMenu(message) {
  const text =
`🎵 *TikTok Tools*

1️⃣ TikTok profile promotion
2️⃣ TikTok video promotion
3️⃣ Promotion planning
4️⃣ TikTok API status

Use:

*${config.prefix}boost video YOUR_VIDEO_URL*

or

*${config.prefix}boost profile @username*

⚠️ Boosting is designed for legitimate promotion.
The bot does not generate fake followers, fake likes,
spam, or artificial engagement.`;

  return message.reply(text);
}

async function tiktokStatus(message) {
  const status = getTikTokStatus();

  return message.reply(
    `🎵 *TikTok API Status*\n\n` +
    `Integration: ${status.connected ? "Configured ✅" : "Not configured ⚠️"}\n` +
    `Mode: ${status.mode}`
  );
}

async function tiktokBoost(message, args) {
  if (!args.length) {
    return message.reply(
      `Example:\n\n` +
      `*${config.prefix}boost video https://www.tiktok.com/...*\n\n` +
      `or\n\n` +
      `*${config.prefix}boost profile @username*`
    );
  }

  const type = args[0].toLowerCase();
  const target = args.slice(1).join(" ");

  if (!target) {
    return message.reply("❌ Please provide a video URL or profile username.");
  }

  if (type !== "video" && type !== "profile") {
    return message.reply(
      "❌ Choose either *video* or *profile*."
    );
  }

  const plan = createPromotionPlan(type, target);

  return message.reply(
    `🚀 *Promotion Plan Created*\n\n` +
    `Type: ${plan.type}\n` +
    `Target: ${plan.target}\n\n` +
    `Status: ${plan.status}\n\n` +
    `This starter version creates the promotion plan only. ` +
    `Actual paid promotion must be connected to an authorized TikTok advertising/promotion API.`
  );
}

module.exports = handleCommand;