const { MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
const chnl = require("../../../configs/chnl.json");
const resource = require("../../../configs/resource.json");
const superagent = require("superagent");
const moment = require("moment");
const colors = require("../../../configs/colors.json");
module.exports = {
  config: {
    name: `math`,
    category: "",
    description: "",
    aliases: [`calc`],
  },
  run: async (bot, message, args) => {
    try {
      //replace + & /
      let toCalc = args.slice(0).join(" ");
      const body = await superagent.get(
        "https://api.mathjs.org/v4/?expr=" +
          toCalc.replace(/+/g, "%2B").replace(/\//g, "%")
      );
      console.log(body);
      if (!toCalc || toCalc == undefined) {
        const embed = new MessageEmbed()
          .setTitle("Oops, looks like you're missing some parameters!")
          .setDescription("**Usage:** `" + config.prefix + "math {equation}`\n")
          .addField(
            "Accepted Parameters for [equation]:",
            "`operation(values)` => **Operation** factor can be `sqrt`, `add`, `divide`, etc.\n**Values** are numbers to be altered and separated by `,`"
          )
          .addField(
            "Example",
            "`" +
              config.prefix +
              "element Hydrogen`\n**Parameters Taken:** `element_fullname`"
          )
          .setFooter("Have questions? Join the support server!")
          .setThumbnail(resource.aw_snap)
          .setColor("#e66149");

        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .addField(":inbox_tray: Input", "```css\n" + toCalc + "```")
          .addField(":outbox_tray: Output", "```css\n" + body.text + "```");

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
