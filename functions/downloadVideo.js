const ytdl = require("ytdl-core");
const fs = require("fs");

module.exports = async (bot, query, msg) => {
    const chatId = query.message.chat.id;
    const { videoInfo, thumbnail } = global.chats.find(chat => chat.fromId === query.from.id);
    bot.sendChatAction(chatId, "upload_audio");
    
    const stream = ytdl.downloadFromInfo(videoInfo, { filter: "audioonly" })
        .pipe(fs.createWriteStream(videoInfo.videoDetails.title + ".mp3").on("finish", async () => {
            bot.editMessageText("Almost there! Uploading your file...", { chat_id: chatId, message_id: msg.message_id });
            await bot.sendAudio(chatId, fs.createReadStream(videoInfo.videoDetails.title + ".mp3"), {
                durarion: videoInfo.videoDetails.lengthSeconds,
                title: videoInfo.videoDetails.title,
            });

            if (msg) bot.deleteMessage(chatId, msg.message_id);
            fs.unlinkSync(videoInfo.videoDetails.title + ".mp3");
            global.chats = global.chats.filter(chat => chat.fromId != query.from.id);
        }));   
}