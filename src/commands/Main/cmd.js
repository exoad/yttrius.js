const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const { Client, Intents } = require("discord.js");
const Discord = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
const moment = require("moment");
const resource = require("../../../configs/resource.json");
module.exports = {
  config: {
    name: `cmd`,
    description: "???",
    category: "???",
    aliases: [``],
  },

  run: async (bot, message, args) => {
    const command = message.content.split(" ");
    if (command[1] == undefined) {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Oops, looks like you forgot some parameters")
        .setThumbnail(resource.aw_snap)
        .addField("Usage:", "``" + config.prefix + "command {command_name}``")
        .addField(
          "Description:",
          "Get indepth information on commands. Use ``" +
            config.prefix +
            "help`` for a list of commands"
        );
      message.channel.send({ embeds: [embed] });
    }

    if (command) {
      if (command[1] != undefined) {
        fs.readFile("./configs/commands.json", (err, dataJson) => {
          if (err) throw err;
          // @ts-ignore
          let helpMe = JSON.parse(dataJson);
          let commandName = command[1];

          try {
            const embed = new MessageEmbed()
              .setColor("RANDOM")
              .addField(
                `Command Name: `,
                `\`${helpMe[commandName].name}\``,
                true
              )
              .addField(`Category`, `\`${helpMe[commandName].group}\``, true)
              .addField(
                "Description",
                `\`${helpMe[commandName].description}\``,
                true
              )
              .addField(
                "Usage",
                `\`${config.prefix}${helpMe[commandName].usage}\``,
                true
              )
              .addField("Aliases", `\`${helpMe[commandName].alias}\``, true);
            message.channel.send({ embeds: [embed] });
          } catch (err) {
            const embed = new MessageEmbed()
              .setTitle(
                "Whoops, looks like the requested command doesn't exist (yet)!"
              )
              .setThumbnail(resource.aw_snap)
              .setDescription(
                "Use `" +
                  config.prefix +
                  "help` for a list of avaliable commands!"
              )
              .setFooter("Still facing issues? Join the support server!");
            message.channel.send({ embeds: [embed] }).then((m) => {
              m.delete({ timeout: 10000 });
            });
          }
        });
      }
    }
  },
};
