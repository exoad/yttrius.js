const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const resource = require("../../../configs/resource.json");
const config = require("../../../configs/token.json");
const moment = require("moment");
module.exports = {
  config: {
    name: `userdocs`,
    category: "",
    description: "",
    aliases: [`userdoc`],
  },
  run: async (bot, message, args) => {
    try {
      message.channel.send("**Fetching Documetations...**").then((m) => {
        setTimeout(function () {
          m.edit(
            "**Fetched the documentations for:** `Accounts & Trust System`"
          );
          // fetch the file and send it as an attachment
          const attachment = new Discord.MessageAttachment(
            `${__dirname}/../../../lib/archives/account_readmes/README.txt`
          );
          message.channel.send({ files: [attachment] });
        }, 1000);
      });
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

      message.channel.send({ embeds: [embed] });
    }
  },
};
