const { MessageEmbed } = require("discord.js");
const config = require("../../../../configs/token.json");
const chnl = require("../../../../configs/chnl.json");
const resource = require("../../../../configs/resource.json");
const superagent = require("superagent");
const colors = require("../../../../configs/colors.json");
const moment = require("moment");
const molarcalc = require("molarcalc");
module.exports = {
  config: {
    name: `molar`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      let mole = args[0];
      if (!mole || mole == undefined) {
        const embed = new MessageEmbed()
          .setThumbnail(resource.aw_snap)
          .setTitle("Oops, looks like your missing some parameters")
          .addField(
            "Proper Usage",
            "`" + config.prefix + "molar {formula/compound}`"
          )
          .addField(
            "Description",
            "Input a chemical formula to get it's molar mass"
          )
          .addField(
            "Exclusions (Unreadable)",
            "1. `Tri` & `acetyl`\n2. `Ac` for `acetyl` (Write as CH3CO, etc.)\n3. Spaces are not allowed\n4. Make sure each letter is capitalzed correctly"
          )
          .addField("Example Usage", "```" + config.prefix + "molar H2O```")
          .setFooter("Have questions? Join the support server!")
          .setColor("#e66149");

        message.channel.send({ embeds: [embed] });
      } else {
        const reg = JSON.parse(JSON.stringify(molarcalc.calc(mole)));
        const embed = new MessageEmbed()
          .setTitle("Molar Mass for: " + reg)
          .addField("Atoms Contents:", reg.atoms)
          .addField("Molar Mass:", reg.mass);

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
