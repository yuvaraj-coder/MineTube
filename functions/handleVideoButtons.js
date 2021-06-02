const downloadVideo = require("./downloadVideo");

module.exports = (bot) => {
    bot.on("callback_query", async query => {
        bot.editMessageReplyMarkup({}, { message_id: query.message.message_id, chat_id: query.message.chat.id });

        if (query.data === "download") {
            bot.answerCallbackQuery(query.id, "✅ Starting download!");
            const downloadMessage = await bot.sendMessage(query.message.chat.id, "Your download has started, wait a little bit!");
            downloadVideo(bot, query, downloadMessage);
        } else {
            global.chats = global.chats.filter(chat => chat.fromId != query.from.id);
            bot.sendMessage(query.message.chat.id, "Your download have been canceled!");
            bot.answerCallbackQuery(query.id, "❌ Download cancelado");
        }
    });
}