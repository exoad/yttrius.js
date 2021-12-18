// legacy code

// @ts-ignore
const { MessageEmbed, MessageAttachment } = require("discord.js");
// @ts-ignore
const config = require("../../../configs/token.json");
// @ts-ignore
const resource = require("../../../configs/resource.json");
const { Database } = require("secure-db");
const moment = require("moment");
const fs = require("fs");
module.exports = {
  config: {
    name: `avatar`,
    category: "",
    description: "",
    aliases: [``],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    try {
      let avatar = message.mentions.users.size
        ? message.mentions.users
            .first()
            .avatarURL({ format: "png", dynamic: true, size: 1024 })
        : message.author.avatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          });
      if (message.mentions.users.size > 0) {
        const embed = new MessageEmbed()
          .setColor(10812580)
          .setTitle(
            `:white_check_mark: ${
              message.mentions.users.first().username
            }\'s Profile Picture:`
          )
          .setImage(`${avatar}`);
        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setColor(10812580)
          .setTitle(
            `:white_check_mark: ${message.author.username}\'s Profile Picture:`
          )
          .setImage(`${avatar + "?size=1024"}`);
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
