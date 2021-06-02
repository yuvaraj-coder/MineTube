const ytdl = require("ytdl-core");
const fs = require("fs");

module.exports = async (bot, query, msg) => {
    const chatId = query.message.chat.id;
    const { videoInfo } = global.chats.find(chat => chat.fromId === query.from.id);
    bot.sendChatAction(chatId, "upload_audio");

    const stream = ytdl.downloadFromInfo(videoInfo, { filter: "audioonly" })
        .pipe(fs.createWriteStream(query.from.id + ".mp3")).on("finish", async () => {
            bot.editMessageText("Almost there! Uploading your file...", { chat_id: chatId, message_id: msg.message_id });
            bot.sendAudio(chatId, fs.createReadStream(query.from.id + ".mp3"), {
                title: videoInfo.videoDetails.title,
                duration: videoInfo.videoDetails.lengthSeconds
            }).then(() => {
                bot.deleteMessage(chatId, msg.message_id);
                fs.unlinkSync(query.from.id + ".mp3");
                global.chats = global.chats.filter(chat => chat.fromId != query.from.id);
            });
        });
} 