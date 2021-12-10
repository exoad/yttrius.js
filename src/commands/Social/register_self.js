// DEPRECATED : const Database = require("easy-json-database");
const { Database } = require("secure-db");
const { MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
const moment = require("moment");
const resource = require("../../../configs/resource.json");
module.exports = {
  config: {
    name: `register`,
    category: "",
    description: "",
    aliases: [`adduser`],
  },
  run: async (bot, message, args) => {
    try {
      let author = message.author.id;
      message.channel.send("Checking the database...").then((m) => {
        /* DEPRECATED CODE : const db = new Database("db/registry_user.json"); */
        const db = new Database("account");
        setTimeout(function () {
          if (!db.has(author)) {
            if (author == config.owner_id) {
              db.set(author, {
                reg: 3,
                trust: 10,
                tags: `${resource.badge_owner}`,
                wallet: "INF_NULL",
                coins: "INF_NULL",
                reps: 0,
                time_reg: moment().format("MMMM Do YYYY, h:mm:ss a"),
              });
              m.edit(
                "**Registered " +
                  message.author.username +
                  " to the database successfully as owner**"
              );
            } else {
              db.set(author, {
                reg: 1,
                trust: 1,
                tags: `${resource.badge_regular}`,
                wallet: "INF_NULL",
                coins: "INF_NULL",
                reps: 0,
                time_reg: moment().format("MMMM Do YYYY, h:mm:ss a"),
              });
              m.edit(
                "**Registered " +
                  message.author.username +
                  " to the database successfully.**"
              );
            }
          } else {
            if (db.has(author))
              m.edit(
                "**Failed to register you.**\nReason: You are already a registered user!"
              );
            else message.channel.send("An error occured");
          }
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
