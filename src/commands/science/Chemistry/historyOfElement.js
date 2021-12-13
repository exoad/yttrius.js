const { MessageEmbed } = require("discord.js");
const config = require("../../../../configs/token.json");
const chnl = require("../../../../configs/chnl.json");
const resource = require("../../../../configs/resource.json");
const superagent = require("superagent");
const colors = require("../../../../configs/colors.json");
const moment = require("moment");
var elementHistories = require("element-histories");
module.exports = {
  config: {
    name: `historyelement`,
    category: "",
    description: "",
    aliases: [`elementhistory`, `elehistory`],
  },
  run: async (bot, message, args) => {
    try {
      let toElement = args[0];
      if (!toElement || toElement == undefined) {
        const embed = new MessageEmbed()
          .setTitle("Oops, looks like you are missing some arguments")
          .setDescription(
            "**Usage:** `" + config.prefix + "elehistory {element_name}`\n"
          )
          .setFooter("Have questions? Join the support server!")
          .setThumbnail(resource.aw_snap)
          .setColor("#e66149");

        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setTitle("Element: " + toElement)
          .addField("Story", elementHistories.story(toElement))
          .addField("Country of Origin", elementHistories.country(toElement))
          .setThumbnail(elementHistories.image(toElement));

        message.channel.send({ embeds: [embed] });
      }
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
