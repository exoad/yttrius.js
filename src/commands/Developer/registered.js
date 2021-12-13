// @ts-ignore
const { MessageEmbed, MessageAttachment } = require("discord.js");
// @ts-ignore
const config = require("../../../configs/token.json");
// @ts-ignore
const resource = require("../../../configs/resource.json");
const { Database } = require("secure-db");
module.exports = {
  config: {
    name: `registered`,
    category: "",
    description: "",
    aliases: [``],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    try {
      if (message.author.id != config.owner_id) return;
      const db = require("secure-db");
      const registered = new Database("account");
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
