const { MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
const chnl = require("../../../configs/chnl.json");
const resource = require("../../../configs/resource.json");
const superagent = require("superagent");
const token = require("../../../configs/token.json");
const colors = require("../../../configs/colors.json");
const moment = require("moment");
module.exports = {
  config: {
    name: `invite`,
    category: "",
    description: "",
    aliases: [`invitebot`],
  },
  run: async (bot, message, args) => {
    try {
      const embed = new MessageEmbed()
        .setTitle("Invite Yttrius to your servers")
        .setDescription(
          "Wanna invite `Yttrius` to your own server(s)? Check the links below!"
        )
        .addField("Invite Link #1 (Admin)", "[Admin](" + token.perm1 + ")")
        .addField(
          "Invite Link #2 (Primary Permissions)",
          "[Primary Permissions](" + token.perm2 + ")"
        )
        .addField(
          "Invite Link #3 (Limited Permissions)",
          "[Limited Permissions](" + token.perm3 + ")"
        )
        .setFooter("Thanks for inviting the bot!");

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
        err,
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );

      message.channel.send({ embeds: [embed] }).then((m) => {
        m.delete({ timeout: 5000 });
      });
    }
  },
};
