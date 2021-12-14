// @ts-ignore
const { MessageEmbed, MessageAttachment } = require("discord.js");
// @ts-ignore
const config = require("../../../configs/token.json");
// @ts-ignore
const resource = require("../../../configs/resource.json");
const { Database } = require("secure-db");
const moment = require("moment");
const fs = require("fs");
module.exports = {
  config: {
    name: `serverinfo`,
    category: "",
    description: "",
    aliases: [`server`],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    try {
      if (!message.guild) {
        message.reply("This command can only be used in a guild.");
      }
      const d = new Date(message.guild.createdTimestamp);
      let day;
      let month;
      if (d.getDate() < 10) {
        day = `0${d.getDate()}`;
      } else {
        day = d.getDate();
      }
      if (d.getMonth() + 1 < 10) {
        month = `0${d.getMonth() + 1}`;
      } else {
        month = d.getMonth();
      }

      const guild = message.guild;
      const members = message.guild.members.cache.array();
      const Embed = new MessageEmbed()
        .setTitle(`Guild name: ` + message.guild.name)
        .setThumbnail(message.guild.iconURL())
        .addField("Server Owner:", `<@${guild.ownerID}>`, true)
        .addField("Server Region:", guild.region, true)
        .addField("Member Count:", guild.memberCount, true)
        .addField("Verification Level:", message.guild.verificationLevel, true)
        .addField("Channel Count:", message.guild.channels.cache.size, true)
        .addField("Roles:", message.guild.roles.cache.size, true)
        .setFooter(
          `Server ID: ${
            guild.id
          } | Server Created: ${day}/${month}/${d.getFullYear()}`
        );

      message.channel.send({ embeds: [Embed] });
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
      fs.writeFile(
        `${__dirname}/../../../logs/${Date.now()}_error.log`,
        err + "\n",
        function (err2) {
          if (err2) {
            return console.log(err2);
          }
        }
      );

      message.channel.send({ embeds: [embed] }).then((m) => {
        m.delete({ timeout: 5000 });
      });
    }
  },
};
