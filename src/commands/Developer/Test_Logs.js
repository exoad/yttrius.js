// @ts-ignore
const { Discord, MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
module.exports = {
  config: {
    name: `logs`,
    aliases: [`logs_test`],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    if (message.author.id !== config.owner_id)
      return message.reply("Credentials Mismatch | Access Denied");
    const fs = require("fs");
    var smth = "";
    fs.writeFile(
      `${__dirname}/../../../logs/${Date.now()}_error.log`, smth,
      function (err2) {
        if (err2) {
          return console.log(err2);
        }
      }
    );
  },
};
