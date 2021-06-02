const ytdl = require("ytdl-core");
const https = require("https");
const fs = require("fs");
const { InlineKeyboard, InlineKeyboardButton, Row } = require("node-telegram-keyboard-wrapper");

function formatTime(seconds) {
    let hours = 0;
    let minutes = 0;
    let res = "";
    seconds = parseInt(seconds);

    if (seconds > 3600) {
        hours = Math.floor(seconds / 3600);
        seconds %= 3600;
    }

    if (seconds > 60) {
        minutes = Math.floor(seconds/60);
        seconds %= 60;
    }

    if (hours > 0) {
        if (hours < 10) res += `0${hours}:`;
        else res += `${hours}:`;
    }

    if (minutes > 0) {
        if (minutes < 10) res += `0${minutes}:`;
        else res += `${minutes}:`;
    } else res += "00:";

    if (seconds < 10) res += `0${seconds}`;
    else res += `${seconds}`;

    return res;
}

module.exports = async (bot, msg) => {
    const chatId = msg.chat.id;
    const url = msg.text;
    const searchingMessage = await bot.sendMessage(chatId, `:mag_right: Searching for: ${url}`, { disable_web_page_preview: true });

    bot.sendChatAction(chatId, "typing");

    const videoInfo = await ytdl.getInfo(url);
    videoInfo.videoDetails.lengthSeconds = formatTime(videoInfo.videoDetails.lengthSeconds);
    const image = fs.createWriteStream(msg.from.id.toString() + ".jpeg");
    const request = https.get(videoInfo.videoDetails.thumbnails[videoInfo.videoDetails.thumbnails.length - 2].url, res => {
        res.pipe(image);

        image.on("finish", async () => {
            const photoCaption = [
                `🎬 <a href="${url}">${videoInfo.videoDetails.title}</a>`,
                `👤 <a href="${videoInfo.videoDetails.author.channel_url}">${videoInfo.videoDetails.author.name}</a>`,
                `🕑 <b>${videoInfo.videoDetails.lengthSeconds}</b> 💾 <i>Soon</i>`
            ];
            const videoButtons = new InlineKeyboard();
            const buttonsRow = new Row(new InlineKeyboardButton("❌ Cancel", "callback_data", "cancel"), new InlineKeyboardButton("📥 Download", "callback_data", "download"));
            videoButtons.push(buttonsRow);

            const thumbnail = await bot.sendPhoto(chatId, fs.createReadStream(msg.from.id.toString() + ".jpeg"), { caption: photoCaption.join("\n"), parse_mode: "HTML", reply_markup: videoButtons.getMarkup() });
            global.chats.push({ videoInfo, fromId: msg.from.id, thumbnail });
            bot.deleteMessage(chatId, searchingMessage.message_id);
            fs.unlinkSync(msg.from.id.toString() + ".jpeg");
        });
    });
}