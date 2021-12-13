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
    name: `whois`,
    category: "",
    description: "",
    aliases: [`userinfo`],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    try {
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.member;
      let avatar = message.mentions.users.size
        ? message.mentions.users
            .first()
            .avatarURL({ format: "png", dynamic: true, size: 2048 })
        : message.author.avatarURL({
            format: "png",
            dynamic: true,
            size: 2048,
          });

      var user;
      if (!member && !args[0]) {
        user = message.author;
      } else if (args[0] && !member) {
        if (isNaN(args[0]))
          return message.reply("I could not find a user with that ID!");
        user = bot.users.get(args[0]);
        if (!user) return message.reply("I could not find that user!");
      } else {
        user = member;
      }

      var game;
      if (!user.presence.game) {
        game = "No Status Detected";
      } else {
        game = user.presence.game.name;
      }
      const embed = new MessageEmbed()
        .setTitle(`User Info for ${user.user.tag}`)
        .setDescription("Requested by:" + message.author.tag)
        .addField("Username:", member, true)
        .addField("User ID:", member.id, true)
        .addField(
          "User Status:",
          `${status[member.user.presence.status]}`,
          true
        )
        .addField("Highest Guild Role:", member.roles.highest, true)
        .addField("Color Roles:", member.roles.color || "`None`", true)
        .addField(
          "Joined this guild on:",
          moment(member.joinedAt).format("MMM DD YYYY"),
          true
        )
        .addField("User bot:", member.user.bot ? "True" : "False", true)
        .addField("Application status:", `${game}`, true)
        .addField(
          "Joined Discord on:",
          moment(member.user.createdAt).format("MMM DD YYYY"),
          true
        )
        .setThumbnail(`${avatar}`)
        .setTimestamp()
        .setFooter("YttriusProfiles")
        .setColor("RANDOM");

      message.channel.send({ embed });
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
