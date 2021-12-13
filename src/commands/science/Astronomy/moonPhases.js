const { MessageEmbed } = require("discord.js");
const config = require("../../../../configs/token.json");
// @ts-ignore
const chnl = require("../../../../configs/chnl.json");
const resource = require("../../../../configs/resource.json");
// @ts-ignore
const superagent = require("superagent");
// @ts-ignore
const colors = require("../../../../configs/colors.json");
// @ts-ignore
const Moon = require("lunarphase-js");
const mphase = require("../../../../configs/mphase.json");
const moment = require("moment");
module.exports = {
  config: {
    name: `mphase`,
    category: "",
    description: "",
    aliases: [`moonphase`],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    try {
      // @ts-ignore
      const waxing = Moon.isWaxing();
      // @ts-ignore
      const waning = Moon.isWaning();
      // @ts-ignore
      const julianDate = Moon.getJulianDate();
      // @ts-ignore
      const age = Moon.getLunarAge();
      // @ts-ignore
      const agePercent = Moon.getLunarAgePercent();
      let userTime = args.slice(0).join(" ");
      var thumbna, wow;

      if (!userTime) {
        const embed = new MessageEmbed()
          .setTitle("Oops, looks like you are missing some parameters!")
          .setThumbnail(resource.aw_snap)
          .setDescription(
            "This command is to get information on the moon on a certain day"
          )
          .addField(
            "Main Usage Formatting",
            "```" + config.prefix + "mphase [user_time]```"
          )
          .addField(
            "user_time",
            "**Accepted Parameters:**\n`YYYY/MM/DD`- Specific Date\n`today`- Get information on today"
          )
          .addField("Example Usage", "```;mphase 2021/03/01```")
          .setFooter("Still have questions? Join the support server!");

        message.channel.send({ embeds: [embed] });
      } else if (userTime == "today" || userTime == "rn" || userTime == "now") {
        // @ts-ignore
        const phase = Moon.getLunarPhase();
        if (phase == "New") {
          thumbna = mphase.new;
        } else if (phase == "Waning Crescent") {
          thumbna = mphase.waning_cresc;
        } else if (phase == "Last Quarter") {
          thumbna = mphase.last_quart;
        } else if (phase == "Waning Gibbous") {
          thumbna = mphase.waning_gib;
        } else if (phase == "Full") {
          thumbna = mphase.full;
        } else if (phase == "Waxing Gibbous") {
          thumbna = mphase.waxing_gib;
        } else if (phase == "First Quarter") {
          thumbna = mphase.first_quart;
        } else if (phase == "Waxing Crescent") {
          thumbna = mphase.waxing_cresc;
        } else {
          thumbna = mphase.full;
        }
        if (phase.includes("New")) {
          wow = ":new_moon:";
        } else if (phase.includes("Waning Crescent")) {
          wow = ":waning_crescent_moon:";
        } else if (phase.includes("Last Quarter")) {
          wow = ":last_quarter_moon:";
        } else if (phase.includes("Waning Gibbous")) {
          wow = ":waning_gibbous_moon:";
        } else if (phase.includes("Full")) {
          wow = ":full_moon:";
        } else if (phase.includes("Waxing Gibbous")) {
          wow = ":waxing_gibbous_moon:";
        } else if (phase.includes("First Quarter")) {
          wow = ":first_quarter_moon:";
        } else if (phase.includes("Waxing Crescent")) {
          wow = ":waxing_crescent_moon:";
        } else {
          wow = ":full_moon:";
        }
        const embed = new MessageEmbed()
          .setTitle("Moon Information for date: Today")
          .setDescription(
            `**__Information: Moon Today__**\n\`Moon Phase:\`${wow} ${phase}\n\`Waxing:\`${waxing}\n\`Waning:\` ${waning}\n\`Current Julian Date:\` ${julianDate}\n\`Lunar Age:\` ${age}\n\`Lunar Age Percent:\` ${agePercent}`
          )
          .setAuthor(message.author.username, message.author.avatarURL)
          .setImage(thumbna);
        message.channel.send({ embeds: [embed] });
      } else {
        const date = new Date(userTime);
        // @ts-ignore
        const phase = Moon.getLunarPhase(date);
        if (phase == "New") {
          thumbna = mphase.new;
        } else if (phase == "Waning Crescent") {
          thumbna = mphase.waning_cresc;
        } else if (phase == "Last Quarter") {
          thumbna = mphase.last_quart;
        } else if (phase == "Waning Gibbous") {
          thumbna = mphase.waning_gib;
        } else if (phase == "Full") {
          thumbna = mphase.full;
        } else if (phase == "Waxing Gibbous") {
          thumbna = mphase.waxing_gib;
        } else if (phase == "First Quarter") {
          thumbna = mphase.first_quart;
        } else if (phase == "Waxing Crescent") {
          thumbna = mphase.waxing_cresc;
        } else {
          thumbna = mphase.full;
        }
        if (phase.includes("New")) {
          wow = ":new_moon:";
        } else if (phase.includes("Waning Crescent")) {
          wow = ":waning_crescent_moon:";
        } else if (phase.includes("Last Quarter")) {
          wow = ":last_quarter_moon:";
        } else if (phase.includes("Waning Gibbous")) {
          wow = ":waning_gibbous_moon:";
        } else if (phase.includes("Full")) {
          wow = ":full_moon:";
        } else if (phase.includes("Waxing Gibbous")) {
          wow = ":waxing_gibbous_moon:";
        } else if (phase.includes("First Quarter")) {
          wow = ":first_quarter_moon:";
        } else if (phase.includes("Waxing Crescent")) {
          wow = ":waxing_crescent_moon:";
        } else {
          wow = ":full_moon:";
        }
        const embed = new MessageEmbed()
          .setTitle("Moon Information for date: " + date)
          .setDescription(
            `**__Information: Moon Today__**\n\`Moon Phase:\` ${wow} ${phase}\n\`Waxing:\`${waxing}\n\`Waning:\` ${waning}\n\`Current Julian Date:\` ${julianDate}\n\`Lunar Age:\` ${age}\n\`Lunar Age Percent:\` ${agePercent}`
          )
          .setAuthor(message.author.username, message.author.avatarURL)
          .setImage(thumbna);
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
