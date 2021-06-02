module.exports = (bot) => {
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const userName = msg.from.first_name;
        const helpText = [
            ":book: <b>Help</b>\n",
            "The only thing you need to do is send me a YouTube video URL, like this one:\n",
            "- https://youtu.be/YxQThi_xOag\n",
            "There are many ways to get a video URL. For example, you can:\n",
            "1. Tap the share button on YouTube app inside a video",
            "2. Use @vid bot, just typing @vid <i>search</i>",
            "3. Copy the browser's link",
            "\n After you sent me the URL, just click the <b>Download</b> button, and I'll get the music for you!"
        ];
      
        bot.sendMessage(chatId, `:sparkles: Hi, ${userName}!`);
      
        bot.sendMessage(chatId, helpText.join("\n"), { parse_mode: "HTML", disable_web_page_preview: true });
    });
}