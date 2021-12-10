const { MessageEmbed } = require("discord.js");
const config = require("../../../../configs/token.json");
const chnl = require("../../../../configs/chnl.json");
const resource = require("../../../../configs/resource.json");
const superagent = require("superagent");
const moment = require("moment");
module.exports = {
  config: {
    name: `apod`,
    category: "",
    description: "",
    aliases: [`nasadaily`],
  },
  run: async (bot, message, args) => {
    try {
      const { body } = await superagent.get(
        `https://api.nasa.gov/planetary/apod?api_key=6xN4Xyh4nluXEufxFnT0fLzku2lEgBUYbv3Orttc`
      );

      if (body.hdurl == undefined) {
        const embed = new MessageEmbed()
          .setTitle(`${body.title}`)
          .setDescription(`${body.explanation}`)
          .setThumbnail(resource.nasa)
          .setFooter(`${body.date} | Copyright ${body.copyright}`);

        message.channel.send({ embeds: [embed] });
      } else if (body.copyright == undefined) {
        const embed = new MessageEmbed()
          .setTitle(`${body.title}`)
          .setDescription(`${body.explanation}`)
          .setThumbnail(resource.nasa)
          .setImage(`${body.hdurl}`)
          .setFooter(`${body.date}`);

        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setTitle(`${body.title}`)
          .setDescription(`${body.explanation}`)
          .setThumbnail(resource.nasa)
          .setImage(`${body.hdurl}`)
          .setFooter(`${body.date} | Copyright ${body.copyright}`);

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
