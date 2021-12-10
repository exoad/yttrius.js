// DEPRECATED : const Database = require("easy-json-database");
const { Database } = require("secure-db");
const { MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
const resource = require("../../../configs/resource.json");
const moment = require("moment");
module.exports = {
  config: {
    name: `myaccount`,
    category: "",
    description: "",
    aliases: [`account`],
  },
  run: async (bot, message, args) => {
    try {
      message.channel
        .send(
          "**Checking the database...**\n*Please be patient, this won't last long*"
        )
        .then((m) => {
          setTimeout(function () {
            const db = new Database("account");
            const fs = require("fs");
            // get /web/dblastreset.txt
            var dblastreset;
            fs.readFile("./web/dblastreset.txt", "utf8", function (err, data) {
              if (err) throw err;
              dblastreset = data;
            });

            // DEPRECATED DEPENDENCY : const db = new Database("db/registry_user.json");
            if (!db.has(message.author.id)) {
              m.edit(
                "**Failed to retrieve your account**\nReason: You are not registered\nLast Reset: " +
                  dblastreset
              );
            } else {
              m.edit("Your Account information below:");
              const embed = new MessageEmbed()
                .setTitle(message.author.username + "'s Public Account Details")
                .setDescription(
                  "See any anomalies? Use `" +
                    config.prefix +
                    "support` to report the issue!"
                )
                // @ts-ignore
                .addField(
                  "Registry Status",
                  JSON.stringify(db.get(`${message.author.id}.reg`)),
                  true
                )
                .addField(
                  "Account Trust Level",
                  JSON.stringify(db.get(`${message.author.id}.trust`)),
                  true
                )
                .addField(
                  "Account Badge(s)",
                  db.get(`${message.author.id}.tags`),
                  true
                )
                .addField(
                  "Wallet Balance",
                  JSON.stringify(db.get(`${message.author.id}.wallet`)),
                  true
                )
                .addField(
                  "Coins",
                  JSON.stringify(db.get(`${message.author.id}.coins`)),
                  true
                )
                .addField(
                  "Reputation",
                  JSON.stringify(db.get(`${message.author.id}.reps`)),
                  true
                )
                .addField(
                  "Registration Date",
                  JSON.stringify(db.get(`${message.author.id}.time_reg`)),
                  true
                )
                .setColor("RANDOM");
              message.channel.send({ embeds: [embed] });
            }
          }, 1500);
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
