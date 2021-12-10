const { MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
const chnl = require("../../../configs/chnl.json");
const resource = require("../../../configs/resource.json");
const superagent = require("superagent");
const colors = require("../../../configs/colors.json");
const talkedRecently = new Set();
const wiki = require("wikipedia");
const moment = require("moment");
var profanity = require("@2toad/profanity").profanity;
module.exports = {
  config: {
    name: `whatis`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      if (talkedRecently.has(message.author.id)) {
        message.reply(
          "You are being rate limited, try again in 15 seconds minute. "
        );
      } else {
        function capStuff(cap) {
          return cap.charAt(0).toUpperCase() + cap.slice(1);
        }
        var chemi = [
          "chemistry",
          "chem",
          "physical settings",
          "physical setting",
          "chemi",
        ];
        let toSearch = args.slice(0).join(" ");
        if (!toSearch || toSearch == undefined) {
          const embed = new MessageEmbed()
            .setTitle("Whoops looks like you are missing some parameters!")
            .addField("Usage", "`" + config.prefix + "whatis {item}`")
            .addField(
              "Description",
              "`{item}` is the thing to be searched and this command searches valid arguments and gets valid data from the input"
            )
            .setFooter("Have questions? Join the support server!")
            .setThumbnail(resource.aw_snap);

          message.channel.send({ embeds: [embed] });
          bot.channels.cache.get(chnl.whatis).send(toSearch);
        } else if (!profanity.exists(toSearch)) {
          const embed = new MessageEmbed()
            .setTitle("Uh No.")
            .setDescription(
              "Entered query contained items that are not allowed, please revise your search.**NOTICE THIS COMMAND IS MONITORED**"
            )
            .setFooter("Have questions? Join the support server!");
          message.channel.send({ embeds: [embed] });
          bot.channels.cache
            .get(chnl.whatis)
            .send(
              `**Author ID:** ${message.author.id}\n**Input:** ${toSearch}`
            );
        } else if (toSearch) {
          // @ts-ignore
          const page = await wiki.page(capStuff(toSearch));
          const summary = await page.summary();
          const str = JSON.parse(JSON.stringify(summary));

          const embed = new MessageEmbed()
            .setTitle("What is " + toSearch + "?")
            .setDescription(str.extract)
            .addField(
              "Link",
              "[Click Here](https://en.wikipedia.org/wiki/" +
                capStuff(toSearch.replace(" ", "_")) +
                ")"
            );
          message.channel.send({ embed });
          bot.channels.cache
            .get(chnl.whatis)
            .send(
              `**Author ID:** ${message.author.id}\n**Input:** ${toSearch}`
            );
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 15000);
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
