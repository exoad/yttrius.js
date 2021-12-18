// @ts-ignore
const { MessageEmbed, MessageAttachment } = require("discord.js");
// @ts-ignore
const config = require("../../../../configs/token.json");
// @ts-ignore
const resource = require("../../../../configs/resource.json");
const superagent = require("superagent");
const { Database } = require("secure-db");
const moment = require("moment");
const colors = require("../../../../configs/colors.json");
const fs = require("fs");
module.exports = {
  config: {
    name: `rndmimg`,
    category: "",
    description: "",
    aliases: [`img`],
  },
  // @ts-ignore
  run: async (bot, message, args) => {
    try {
      function displayError() {
        const embed = new MessageEmbed()
          // @ts-ignore
          .setColor(colors.error)
          .setTitle("Random Image")
          .setDescription(
            "This command gives the user a random image of something (usually an animal)"
          )
          .addField("Usage", `\`\`\`${config.prefix}rndmimg <type>\`\`\``)
          .addField("<type>", "```goose, lizard, cat, fox```")
          .addField("Example", `\`${config.prefix}rndmimg goose\``);

        message.channel.send({ embeds: [embed] });
      }
      let type = args[0];
      if (!type || type == "") {
        displayError();
      } else if (type == "goose" || type == "geese") {
        const { body } = await superagent.get(
          "https://nekos.life/api/v2/img/goose"
        );

        const embed = new MessageEmbed()
          .setTitle("A random geese/goose")
          .setImage(`${body.url}`)
          .setColor("RANDOM");

        message.channel.send({ embeds: [embed] }).then((m) => {
          m.react("❤️");
        });
      } else if (type == "lizard" || type == "lizards") {
        const { body } = await superagent.get("https://nekos.life/api/lizard");

        const embed = new MessageEmbed()
          .setTitle("A random Lizard")
          .setImage(`${body.url}`)
          .setColor("RANDOM");

        message.channel.send({ embeds: [embed] }).then((m) => {
          m.react("❤️");
        });
      } else if (type == "cat" || type == "cats") {
        const { body } = await superagent.get("http://aws.random.cat/meow");
        const embed = new MessageEmbed()
          .setTitle("A random cat")
          .setImage(`${body.file}`)
          .setColor("RANDOM");

        message.channel.send({ embeds: [embed] }).then((m) => {
          m.react("❤️");
        });
      } else if (type == "fox" || type == "foxes") {
        const { body } = await superagent.get("https://randomfox.ca/floof/");
        const embed = new MessageEmbed()
          .setTitle("A random fox")
          .setImage(`${body.image}`)
          .setColor("RANDOM");

        message.channel.send({ embeds: [embed] }).then((m) => {
          m.react("❤️");
        });
      } else {
        displayError();
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
