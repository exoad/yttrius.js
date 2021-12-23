// @ts-nocheck
// @ts-ignore
const { Discord, MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
const emojis = require("../../../configs/emojis.jsonc");
module.exports = {
  config: {
    name: `test_emj`,
    aliases: [`test_emj`],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    if (message.author.id !== config.owner_id)
      return message.reply("Credentials Mismatch | Access Denied");
    message.channel.send({ files: ["../../../configs/emojis.jsonc"] });
  },
};
