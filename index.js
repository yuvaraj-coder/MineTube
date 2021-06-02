const Tgfancy = require("tgfancy");
const ytdl = require("ytdl-core");
const dotenv = require("dotenv").config();

const initGreetings = require("./functions/greetings");
const initHandleVideoButtons = require("./functions/handleVideoButtons");
const initGetVideoLinks = require("./functions/getVideoLinks");

global.chats = [];

const bot = new Tgfancy(process.env.TOKEN, {
  polling: true,
  tgfancy: {
    emojification: true,
  },
});

bot.on("polling_error", msg => console.log(msg));

initGreetings(bot);
initHandleVideoButtons(bot);
initGetVideoLinks(bot);

console.log("Bot polling");

