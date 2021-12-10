// @ts-ignore
const { MessageEmbed, MessageAttachment } = require("discord.js");
// @ts-ignore
const config = require("../../../configs/token.json");
// @ts-ignore
const resource = require("../../../configs/resource.json");
const { Database } = require("secure-db");
const moment = require("moment");
module.exports = {
  config: {
    name: `db_reset`,
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
      registered.reset();
      // write to /web/dblastreset.txt
      fs.writeFileSync(
        "../../../web/dblastreset.txt",
        `${new Date().toLocaleString()}`
      );
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
        err,
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );

      message.channel.send({ embeds: [embed] }).then((m) => {
        m.delete({ timeout: 5000 });
      });
    }
  },
};
