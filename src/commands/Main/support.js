const { MessageEmbed } = require("discord.js");
const token = require("../../../configs/token.json");
const resource = require("../../../configs/resource.json");
const config = require("../../../configs/token.json");
const moment = require("moment");
const superagent = require("superagent");
module.exports = {
  config: {
    name: `support`,
    category: "",
    description: "",
    aliases: [`supportserver`],
  },
  run: async (bot, message, args) => {
    try {
      const embed = new MessageEmbed()
        .setTitle("Support")
        .setDescription(
          "Have questions regarding usage of the bot? Come join the discord!"
        )
        .addField(
          "Main Discord Support Server",
          "[Invite Link](" + token.server_invite1 + ")"
        )
        .addField(
          "Backup Invite Link",
          "[Backup Link](" + token.backup_server_invite + ")"
        );

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      const embed = new MessageEmbed()
        .setTitle("Whoops, looks like something went wrong!")
        .setThumbnail(resource.aw_snap)
        .setDescription(
          "Use `" +
            config.prefix +
            "help` for a list of avaliable commands or use `" +
            config.prefix +
            "support` to join the support server!"
        )
        .setFooter("Still facing issues? Join the support server!");

      const fs = require("fs");

      fs.writeFile(
        `${__dirname}/../../../logs/${Date.now()}_error.log`,
        err + "\n",
        function (err2) {
          if (err2) {
            return console.log(err2);
          }
        }
      );

      message.channel.send({ embeds: [embed] });
    }
  },
};
