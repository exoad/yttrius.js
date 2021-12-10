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
      const log = fs.createWriteStream("./logs/" + Date.now() + "_error.log", {
        flags: "a",
      });
      log.write(
        `${moment().format("YYYY-MM-DD HH:mm:ss")} - ${err.message} - ${
          message.author.tag
        } - ${message.author.id} - ${message.guild.name} - ${
          message.guild.id
        } - ${message.channel.name} - ${message.channel.id} - ${
          message.content
        }\n`
      );
      log.end();

      message.channel.send({ embeds: [embed] }).then((m) => {
        m.delete({ timeout: 5000 });
      });
    }
  },
};
