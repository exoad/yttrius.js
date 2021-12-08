// DEPRECATED : const Database = require("easy-json-database");
const { Database } = require('secure-db');
const { MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
const resource = require("../../../configs/resource.json");
module.exports = {
  config: {
    name: `myaccount`,
    category: "",
    description: "",
    aliases: [`account`],
  },
  run: async (bot, message, args) => {
    try {
      message.channel.send("**Checking the database...**\n*Please be patient, this won't last long*").then((m) => {
        setTimeout(function () {
          const db = new Database("account");
          // DEPRECATED DEPENDENCY : const db = new Database("db/registry_user.json");
          if(!db.has(message.author.id)) {
            m.edit("**Failed to retrieve your account**\nReason: You are not registered");
          } else {
            m.edit("Your Account information below:");
            const embed = new MessageEmbed()
            .setTitle(message.author.username + "'s Public Account Details")
            .setDescription("See any anomalies? Use `" + config.prefix + "support` to report the issue!")
            // @ts-ignore
            .addField("Registry Status", JSON.stringify(db.get(`${message.author.id}.reg`)), true)
            .addField("Account Trust Level", JSON.stringify(db.get(`${message.author.id}.trust`)), true)
            .addField("Account Tags", JSON.stringify(db.get(`\`${message.author.id}.tags\``)), true)
            .addField("Wallet Balance", JSON.stringify(db.get(`${message.author.id}.wallet`)), true)
            .addField("Coins", JSON.stringify(db.get(`${message.author.id}.coins`)), true)
            .addField("Reputation", JSON.stringify(db.get(`${message.author.id}.reps`)), true)
            .addField("Registration Date", JSON.stringify(db.get(`${message.author.id}.time_reg`)), true)
            .setColor("RANDOM");
            message.channel.send({embeds: [embed]});
          }
        }, 1500);
      })
    } catch (err) {
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
      message.channel.send({ embeds : [embed] }).then((m) => {
        m.delete({ timeout: 5000 });
      });
    }
  },
};
