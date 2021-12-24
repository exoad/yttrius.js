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
// import language pack
const langlist = require("../../../json/lang/deep_attributes.json");
module.exports = {
  config: {
    name: `format`,
    category: "",
    description: "",
    aliases: [`frmt`],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    try {
      function makeEmbed(content, message, lang) {
        let embed = new MessageEmbed()
          .setTitle("Formatted Code")
          .setDescription("```" + lang + "\n" + content + "```")
          .setAuthor(message.author.username, message.author.avatarURL())
          .setFooter("Code Formatted is done by a real human ;)");
        message.channel.send({ embeds: [embed] });
      }
      let lang = args[0];
      let code = args.slice(1).join(" ");
      let avaliable_langs = [
        "javascript",
        "typescript",
        "html",
        "json",
        "js",
        "ts",
        "css",
        "scss",
        "c++",
        "cpp",
        "cxx",
        "c",
        "java",
        "c#",
        "csharp",
        "j++",
      ];
      if (!lang || !avaliable_langs.includes(lang)) {
        const embed_no_lang = new MessageEmbed()
          .setTitle(
            "Whoops, looks like that wasn't a recognized language / parser!"
          )
          .setDescription(
            "This format command currently requries a specified parser or language in order to work.\n\n"
          )
          .addField(
            "Command Syntax",
            "`" + config.prefix + "format <language> <code>`"
          )
          .addField(
            "<language>",
            "The language or parser you want to use to format your code.\n\n```js, json, typescript, html, css, scss, c++, c, c#, java```"
          )
          .addField(
            "<code>",
            "The code you want to format.\n\nThis can be a pastebin link, or a code copied."
          )
          .addField(
            "Example Usage",
            "`" + config.prefix + "format js 'console.log(\"Hello World!\")'`"
          );

        return message.channel.send({ embeds: [embed_no_lang] });
      }
      if (!code) {
        const embed_no_code = new MessageEmbed()
          .setTitle("Whoops, looks like you forgot some code!")
          .setDescription(
            "This format command currently requries a specified parser or language in order to work.\n\n"
          )
          .addField(
            "Command Syntax",
            "`" + config.prefix + "format <language> <code>`"
          )
          .addField(
            "<language>",
            "The language or parser you want to use to format your code.\n\n```js, json, typescript, html```"
          )
          .addField(
            "<code>",
            "The code you want to format.\n\nThis can be a pastebin link, or a code copied."
          )
          .addField(
            "Example Usage",
            "`" + config.prefix + "format js 'console.log(\"Hello World!\")'`"
          );

        return message.channel.send({ embeds: [embed_no_code] });
      }
      if (langlist.web.includes(lang)) {
        makeEmbed(
          prettier.format(code, {
            parser: lang == "js" || lang == "javascript" ? "babel" : lang,
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
          }),
          message,
          lang
        );
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
