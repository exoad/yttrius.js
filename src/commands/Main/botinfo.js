const { MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
const chnl = require("../../../configs/chnl.json");
const resource = require("../../../configs/resource.json");
const superagent = require("superagent");
const colors = require("../../../configs/colors.json");
const ready = require("../../../configs/ready.json");
const moment = require("moment");
module.exports = {
  config: {
    name: `bot`,
    category: "",
    description: "",
    aliases: [`botinfo`, `binfo`],
  },
  run: async (bot, message, args) => {
    try {
      let totalSeconds = bot.uptime / 1000;
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);
      const embed = new MessageEmbed()
        .setTitle("Yttrius")
        .setDescription(
          "Yttrius is a discord bot created by `" +
            chnl.owner_name +
            "`. It is a bot that incorporates science as its main focus."
        )
        .addField("Status", ready.status)
        .addField(
          "Bot Package",
          "[Using a C++ Discord Bot API](https://github.com/yourWaifu/sleepy-discord)"
        )
        .addField(
          "APIs & Dependencies",
          "1. [NASA Open APIs](https://api.nasa.gov/)\n2. [LaTeX](https://github.com/latex3/)\n3. [Periodic Table Source](http://www.cplusplus.com/forum/general/89585/)\n4. [Wikipedia Public API](https://www.mediawiki.org/wiki/API:Main_page)"
        )
        .addField("Topics Covered", "`Chemistry, Earth Science, Astronomy`")
        .addField(
          "Extra notes",
          "Use `" + config.prefix + "support` for more info"
        )
        .addField(
          "Bot Uptime",
          `:arrow_up_small: ${days}:${hours}:${minutes}:${seconds}`
        )
        .addField(
          "See the language I am programmed in Action!",
          "[GitHub Repository](https://github.com/exoad/yAPI)"
        )
        .addField("Servers Count", "76");

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

      message.channel.send({ embeds: [embed] })
    }
  }
}
