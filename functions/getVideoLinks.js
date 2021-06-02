const ytdl = require("ytdl-core");
const sendVideoInfo = require("./sendVideoInfo");

module.exports = (bot) => {
    bot.on("text", msg => {
        const chatId = msg.chat.id;
        if (ytdl.validateURL(msg.text)) {
            sendVideoInfo(bot, msg);
        } else {
            const invalidUrlMessage = [
                ":exclamation: <b>Invalid URL</b>\n",
                "Send me a valid YouTube URL, like this one:\n",
                "- https://youtu.be/YxQThi_xOag\n"
            ]
            bot.sendMessage(chatId, invalidUrlMessage.join("\n"), { parse_mode: "HTML", disable_web_page_preview: true });
        }
    });
} 