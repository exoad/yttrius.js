/*
 * TODO: Make all science commands a sub category
 */
const { MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
const chnl = require("../../../configs/chnl.json");
const resource = require("../../../configs/resource.json");
const cmd = require("../../../configs/cmd_list.json");
const moment = require("moment");
module.exports = {
  config: {
    name: `help`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      let cat = args[0];
      let cat_cmd = args[1];
      //this function makes the embeds so there wont be repetitive embeds everywhere
      function makeCommandList(menu_name, list_items, isCat) {
        if (isCat) {
          const embed = new MessageEmbed()
            .setTitle(menu_name + " Category")
            .setDescription(
              "Here are all the avaliable " +
                menu_name.toLowerCase() +
                " sub-categories.\nUse `" +
                config.prefix +
                "help " +
                menu_name.toLowerCase() +
                " {subcategory}`"
            )
            .addField("Categories", "```" + list_items + "```")
            .setThumbnail(resource.yet);

          message.channel.send({ embeds: [embed] });
        } else {
          const embed = new MessageEmbed()
            .setTitle(menu_name + " Commands")
            .setDescription(
              "Here are all commands for the category " +
                menu_name.toLowerCase() +
                ".\nUse `" +
                config.prefix +
                "cmd {command}`"
            )
            .addField("Commands", "```" + list_items + "```")
            .setThumbnail(resource.yet);

          message.channel.send({ embeds: [embed] });
        }
      }

      function getCommands(cat) {
        let cmd_list = "";
        for (let i = 0; i < cmd[cat].length; i++) {
          // if it is not the last item insert a comma
          if (i != cmd[cat].length - 1) {
            cmd_list += cmd[cat][i] + ", ";
          } else {
            cmd_list += cmd[cat][i];
          }
        }
        return cmd_list;
      }
      if (!cat || cat == undefined) {
        const embed = new MessageEmbed() // <-- Main Entry Point
          .setTitle("Main Help Menu | Categories & Sub-Categories")
          .setDescription(
            "Here you will find all of the categories! Wanting to find info on a specific command? Use `" +
              config.prefix +
              "cmd {command}`Need support? Join my discord server [here](" +
              chnl.spprt_server +
              ")"
          )
          .addField(
            ":jigsaw: General Commands",
            `Use \`${config.prefix}help general\` to access all generalized / utility / fun commands`,
            true
          )
          .addField(
            ":test_tube: Science Categories",
            `Use  \`${config.prefix}help science\` to access all sub-categories for science`,
            true
          )
          .addField(
            ":tools: Tools Categories",
            `Use  \`${config.prefix}help tools\` to access commands that are general tools (calculators, etc.)`,
            true
          )
          .addField(
            ":jigsaw: Other Categories",
            `Use  \`${config.prefix}help others\` to access all other sub-categories that could not fit onto this list`,
            true
          )
          .addField(
            ":dividers: Social Commands",
            `Use \`${config.prefix}help social\` to access all Account related commands`,
            true
          )
          .addField(
            ":mag: Robot Events",
            `Use \`${config.prefix}help events\` to access all commands related to robot events (vex)`,
            true
          )
          .addField(
            ":information_source: Information",
            `Use \`${config.prefix}help info\` to access all info commands`,
            true
          )
          .setThumbnail(resource.science)
          .setFooter('The prefix is "' + config.prefix + '"!');

        message.channel.send({ embeds: [embed] });
      } else {
        if (
          (cat == "science" || cat == "sci") &&
          (!cat_cmd || cat_cmd == undefined)
        ) {
          makeCommandList(
            "Science",
            "chemistry, astronomy, otherscience",
            true
          );
        } else if (
          (cat_cmd == "chemistry" || cat_cmd == "chem") &&
          (cat == "science" || cat == "sci")
        ) {
          // loop through all commands in the category that has group "chemistry"
          makeCommandList("Chemistry", getCommands("chemistry"), false);
        } else if (
          (cat_cmd == "astro" || cat_cmd == "astronomy") &&
          (cat == "science" || cat == "sci")
        )
          makeCommandList("Astronomy", getCommands("astronomy"), false);
        else if (
          (cat_cmd == "otherscience" || cat_cmd == "othersci") &&
          (cat == "science" || cat == "sci")
        )
          makeCommandList("Other Science", "earth", false);
        else if (cat == "general")
          makeCommandList("General", getCommands("general"), false);
        else if (cat == "tools" || cat == "tool")
          makeCommandList("Tools", getCommands("tools"), false);
        else if (
          (cat == "others" || cat == "other") &&
          (!cat_cmd || cat_cmd == undefined)
        )
          makeCommandList("Other", "fun", true);
        else if (cat == "social")
          makeCommandList("Social", getCommands("social"), false);
        else if (cat == "events" || cat == "event")
          makeCommandList("Robots", getCommands("robotics"), false);
        else if (cat == "others" && cat_cmd == "fun")
          makeCommandList("Fun", getCommands("fun"), false);
        else if (cat == "info")
          makeCommandList("Info", getCommands("information"), false);
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
