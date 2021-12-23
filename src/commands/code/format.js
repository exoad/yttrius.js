// @ts-ignore
const { MessageEmbed, MessageAttachment } = require("discord.js");
// @ts-ignore
const config = require("../../../configs/token.json");
// @ts-ignore
const resource = require("../../../configs/resource.json");
const { Database } = require("secure-db");
const moment = require("moment");
const fs = require("fs");
const prettier = require("prettier");
module.exports = {
  config: {
    name: `format`,
    category: "",
    description: "",
    aliases: [``],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    try {
      let lang = args[0];
      let code = args.slice(1).join(" ");
      if (!lang) {
        return message.reply("Please specify a language!");
      }
      if (!code) {
        return message.reply("Please specify the code!");
      }
      let formatted = prettier.format(code, {
        parser: lang,
        semi: false,
        singleQuote: true,
        trailingComma: "none",
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        bracketSpacing: true,
        arrowParens: "always",
        requirePragma: false,
        insertPragma: false,  
        proseWrap: "preserve",
        htmlWhitespaceSensitivity: "strict",
        endOfLine: "lf",
      });
      let embed = new MessageEmbed()
        .setTitle("Formatted Code")
        .setDescription("```"+ formatted + "```")

      message.channel.send({ embeds: [embed] });

      
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

      message.channel.send({ embeds: [embed] });
    }
  },
};
