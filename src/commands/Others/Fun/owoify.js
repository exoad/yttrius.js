// @ts-ignore
const { MessageEmbed, MessageAttachment } = require("discord.js");
// @ts-ignore
const config = require("../../../../configs/token.json");
// @ts-ignore
const resource = require("../../../../configs/resource.json");
const superagent = require("superagent");
const { Database } = require("secure-db");
const moment = require("moment");
const fs = require("fs");
module.exports = {
  config: {
    name: `owo`,
    category: "",
    description: "",
    aliases: [`owoify`],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    try {
      if (
        message.content.includes("@everyone") ||
        message.content.includes("nigger") ||
        message.content.includes("@here") ||
        message.content.includes("niggers") ||
        message.content.includes("porn") ||
        message.content.includes("bitch")
      )
        return message.reply("Wtf are you trying to make me do");
      if (!args[0]) return message.reply("You didn't provide anything!");
      message.delete();
      const { body } = await superagent.get(
        "https://nekos.life/api/v2/owoify?text=" + args.join("%20")
      );

      if (args[0].length > 200) {
        message.channel.send("Woah watch the message length! >200");
      }
      message.channel.send(body.owo);
      if (body.owo == undefined) {
        message.channel.send(body.msg);
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
