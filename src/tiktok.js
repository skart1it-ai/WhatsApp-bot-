const config = require("./config");

function getTikTokStatus() {
  const connected = Boolean(config.tiktok.accessToken);

  return {
    connected,
    mode: connected
      ? "Authorized API mode"
      : "Demo / configuration mode"
  };
}

function createPromotionPlan(type, target) {
  return {
    type: type === "video"
      ? "TikTok Video Promotion"
      : "TikTok Profile Promotion",

    target,

    status: "READY_FOR_API_INTEGRATION",

    createdAt: new Date().toISOString()
  };
}

module.exports = {
  getTikTokStatus,
  createPromotionPlan
};