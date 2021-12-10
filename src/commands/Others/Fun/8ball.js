const { MessageEmbed } = require("discord.js");
const profanity = require("@2toad/profanity").profanity;
const resource = require("../../../../configs/resource.json");
const config = require("../../../../configs/token.json");
const colors = require("../../../../configs/colors.json");
const moment = require("moment");
module.exports = {
  config: {
    name: `8ball`,
    category: "",
    description: "",
    aliases: [`eightball`],
  },
  run: async (bot, message, args) => {
    try {
      function doRandHT() {
        var rand = [
          ":8ball: As I see it, yes.",
          ":8ball: Ask again later.",
          ":8ball: Better not tell you now.",
          ":8ball: Cannot predict now.",
          ":8ball: Concentrate and ask again.",
          ":8ball: Don’t count on it.",
          ":8ball: It is certain.",
          ":8ball: It is decidedly so.",
          ":8ball: Most likely.",
          ":8ball: My reply is no.",
          ":8ball: My sources say no.",
          ":8ball: Outlook not so good.",
          ":8ball: Outlook good.",
          ":8ball: Reply hazy, try again.",
          ":8ball: Signs point to yes.",
          ":8ball: Very doubtful.",
          ":8ball: Without a doubt.",
          ":8ball: Yes.",
          ":8ball: Yes – definitely.",
          ":8ball: You may rely on it.",
        ];
        return rand[Math.floor(Math.random() * rand.length)];
      }
      let user_prompt = message.content.split(" ").slice(1);
      if (profanity.exists(user_prompt))
        message.channel.send("**Blacklisted Words**\n*Please try again*");
      else if (
        !user_prompt ||
        user_prompt == undefined ||
        user_prompt == null
      ) {
        const embed = new MessageEmbed()
          .setTitle("Oops looks like you are missing some arguments...")
          .setThumbnail(resource.aw_snap)
          .addField(
            "Command Usage",
            "```" + config.prefix + "8ball {user_prompt}```"
          )
          .addField("user_prompt", "Your message goes here")
          .addField(
            "Example Usage",
            "```" + config.prefix + "8ball Am i happy?"
          )
          .setColor("#e66149");
        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setTitle(doRandHT())
          .setColor("RANDOM")
          .setDescription(
            message.author.username + " asks: " + user_prompt.join(" ")
          );
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
