const { MessageEmbed } = require("discord.js");
const config = require("../../../../configs/token.json");
const chnl = require("../../../../configs/chnl.json");
const resource = require("../../../../configs/resource.json");
const superagent = require("superagent");
const chemicaltools = require("chemicaltools");
const fetch = require("node-fetch");
const moment = require("moment");
const colors = require("../../../../configs/colors.json");
const npt = require("node-periodic-table");
module.exports = {
  config: {
    name: `element`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      function capStuff(cap) {
        return cap.charAt(0).toUpperCase() + cap.slice(1);
      }
      let toSearch = args[0];
      if (!toSearch || toSearch == undefined) {
        const embed = new MessageEmbed()
          .setTitle("Oops, looks like you are missing some arguments")
          .setDescription(
            "**Usage:** `" + config.prefix + "element {element_name}`\n"
          )
          .addField(
            "Accepted Parameters for [element_name]:",
            "`element_symbol`, `element_atomic_number`, `element_fullname`"
          )
          .setFooter("Have questions? Join the support server!")
          .setThumbnail(resource.aw_snap)
          .setColor("#e66149");

        message.channel.send({ embeds: [embed] });
      } else {
        const smth = stringify(chemicaltools.searchElement(capStuff(toSearch)));
        var body = parse(smth);
        if (body.iupac == null || !body.iupac || body.iupac == undefined) {
          const embed = new MessageEmbed()
            .setTitle("Hmmm, looks like that element doesn't exist (yet)")
            .setDescription(
              "**Usage:** `" + config.prefix + "element {element_name}`\n"
            )
            .addField(
              "Accepted Parameters for [element_name]:",
              "`element_symbol`, `element_atomic_number`, `element_fullname`"
            )
            .addField(
              "Example",
              "`" +
                config.prefix +
                "element Hydrogen`\n**Parameters Taken:** `element_fullname`"
            )
            .setFooter("Have questions? Join the support server!")
            .setThumbnail(resource.aw_snap)
            .setColor("#e66149");

          message.channel.send({ embed });
        } else {
          const oc = stringify(npt.getBySymbol(body.symbol));
          const ewww = parse(oc);
          const embed = new MessageEmbed()
            .setTitle(body.iupac)
            .setDescription(
              `\n**Symbol:** ${body.symbol}\n**Atomic Number:** ${body.number}\n**Atomic Mass: ** ${body.mass}\n**Origin:** ${body.origin}\n**Appearance:** ${ewww.appearance}\n**Boil (K):** ${ewww.boil}\n**Category:** ${ewww.category}\n**Color (If Any):** ${ewww.color}\n**Density:** ${ewww.density}\n**Discoverer:** ${ewww.discovered_by}\n**Melting Point (K):** ${ewww.melt}\n**Molar Heat:** ${ewww.molar_heat}\n**Named By:** ${ewww.named_by}\n**Main State:** ${ewww.phase}\n**Course Description:** ${ewww.summary}\n**Position on Periodic Table (X, Y):** (${ewww.xpos}, ${ewww.ypos})\n**Shells:** ${ewww.shells}\n**Electron Config.:** ${ewww.electron_configuration}\n**Electron Affinity:** ${ewww.electron_affinity}\n**Electronegativity Pauling:** ${ewww.electronegativity_pauling}\n**Ionization Energies:** \`\`\`${ewww.ionization_energies}\`\`\``
            )
            .setThumbnail(body.url)
            .setFooter(`Requested by ${message.author.username}`)
            .setColor("RANDOM");

          message.channel.send({ embeds: [embed] });
        }
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
      const log = fs.createWriteStream("../../../logs/" + Date.now() + "_error.log", {
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

function stringify(arg0) {
  return JSON.stringify(arg0);
}

function parse(smth) {
  return JSON.parse(smth);
}
