const Tgfancy = require("tgfancy");
const dotenv = require("dotenv");
const ytdl = require("ytdl-core");

const initGreetings = require("./functions/greetings");
const initHandleVideoButtons = require("./functions/handleVideoButtons");
const initGetVideoLinks = require("./functions/getVideoLinks");

dotenv.config();
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

