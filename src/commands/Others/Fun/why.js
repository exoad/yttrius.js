const superagent = require("superagent");
const resource = require("../../../../configs/resource.json");
const config = require("../../../../configs/token.json");
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
module.exports = {
  config: {
    name: `why`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      const { body } = await superagent.get("https://nekos.life/api/v2/why");

      const embed = new MessageEmbed()
        .setTitle("Why? Why? Why?")
        .setDescription(body.why)
        .setColor("RANDOM");

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
      const log = fs.createWriteStream("../../../logs/" + Date.now() + "_error.log", {
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
