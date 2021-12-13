const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");
const resource = require("../../../../configs/resource.json");
const config = require("../../../../configs/token.json");
const moment = require("moment");
module.exports = {
  config: {
    name: `fact`,
    category: "",
    description: "",
    aliases: [`coolfact`, `randomfact`, `dumbfact`],
  },
  run: async (bot, message, args) => {
    try {
      const { body } = await superagent.get("https://nekos.life/api/v2/fact");

      const embed = new MessageEmbed()
        .setTitle("Random Facts")
        .setDescription(body.fact)
        .setColor("RANDOM")
        .setTimestamp();

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

      message.channel.send({ embeds: [embed] }).then((m) => {
        m.delete({ timeout: 5000 });
      });
    }
  },
};
