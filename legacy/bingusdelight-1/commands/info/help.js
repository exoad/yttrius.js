const fs = require('fs');
const {
  promisify
} = require('util');
const readdir = promisify(fs.readdir);
const { MessageEmbed, version, Discord } = require("discord.js");
const config = require('../../config.json');
module.exports = {
  config: {
    name: `help`,
    category: 'Info',
    description: '???',
    aliases: [`commandlist`, `helplist`]
  },
  run: async (bot, message, args) => {
    const talkedRecently = new Set();

    if (talkedRecently.has(message.author.id)) {
      message.channel.send("Woah your using the commands way too fast! Slow down a bit!\n``Cooldown: 60 seconds``");
    } else {
      let rety = args[0];
      //main help
      if(!rety || rety == undefined) {
        const embed = new MessageEmbed()
          .setTitle("Yttrius Help Menu")
          .setDescription("This is the main help menu. To get specific info on a command use `"+config.prefix+"find {command}`\nUse `"+config.prefix+"help {category}` to get commands in that category")
          .setColor("RANDOM")
          .setThumbnail('https://images-ext-2.discordapp.net/external/KbKfM6ORdzK0wL0-QkmYcCwv4IzS8G6M79Y37IVo3xQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/792193904614703114/f1ff10faed996f407f0ff1a16ca36e77.png?width=653&height=653')
          .addField(':video_game: Fun Commands', "Use `"+config.prefix+"help fun`", true)
          .addField(':information_source: Info & Utility Commands', "Use `"+config.prefix+"help info`", true)
          .addField('<:yttrius_moderation:804372335356018708> Moderation Commands', "Use `"+config.prefix+"help mod`", true)
          .addField('<:yttrius_mc:804361806449475665> Minecraft Commands', "Use `"+config.prefix+"help mc`", true)
          .addField(':frame_photo: Images & Media:', "Use `"+config.prefix+"help media`", true)
					.addField(':atom: Math & Science:', "Use `"+config.prefix+"help science`", true)
          .setFooter('https://exoad.github.io/yttrius/')
          .setTimestamp()

          message.channel.send({ embed })

      //fun helpmenu 
      } else if(rety == 'fun') {
        const embed = new MessageEmbed()
        .setTitle('Yttrius Fun Commands')
        .setDescription('Here you can find commands that are related **fun**.\nUse `'+config.prefix+'find {cmd_name}` to get info on a specific command')
        .addField("Commands:", "`8ball, kill, gulag, meme, dadjoke, vote, triggered, rolldice, coinflip, embedecho, echo, why, owo, wran, textflip, sthought, bann, fact, insult, joke, hug, yesno, bubblewrap, leakmyinfo, gay, wasted, rep`", true)
        .setColor("RANDOM")
        .setFooter('https://exoad.github.io/yttrius/')
        .setTimestamp()

        message.channel.send({ embed })


      //util
      } else if(rety == 'info') {
        const embed = new MessageEmbed()
        .setTitle('Yttrius Info Commands')
        .setDescription("Here you can find commands for **information**.\nUse `"+config.prefix+"find {cmd_name}` to get info on a specific command")
        .addField("Commands:", "`avatar, serverinfo, botinfo, userinfo, ping, suggest, report, invite, cinvite, find, help`")
        .setColor("RANDOM")
        .setFooter('https://exoad.github.io/yttrius/')
        .setTimestamp()
        message.channel.send({ embed })

      //mod
      } else if(rety == 'mod') {
        const embed = new MessageEmbed()
        .setTitle('Yttrius Moderation Commands')
        .setDescription("Here you can find commands for **moderation**.\nUse `"+config.prefix+"find {cmd_name}` to get info on a specific command")
        .addField('Commands:', "`ban, kick, delete, removerole, addrole`")
        .setColor("RANDOM")
        .setFooter('https://exoad.github.io/yttrius/')
        .setTimestamp()

        message.channel.send({ embed })

      //mc
      } else if(rety == 'mc') {
        const embed = new MessageEmbed()
        .setTitle('Yttrius Minecraft Commands')
        .setDescription("Here you can find commands for **minecraft**.\nUse `"+config.prefix+"find {cmd_name}` to get info on a specific command")
        .addField('Commands:', "`mcsearch, uuid, mcserver`")
        .setColor("RANDOM")
        .setFooter('https://exoad.github.io/yttrius/')        
        .setTimestamp()

        message.channel.send({ embed })

      //media
      } else if(rety == 'media') {
        const embed = new MessageEmbed()
        .setTitle('Yttrius Images & Media Commands')
        .setDescription("Here you can find commands for **image & media**.\nUse `"+config.prefix+"find {cmd_name}` to get info on a specific command")
        .addField('Commands:', "`create, meme, sthought, urban, covid, time, youtube, lizard, goose, advice, cat, gituser, fox, imbored, random, inspire`")
        .setColor("RANDOM")
        .setFooter('https://exoad.github.io/yttrius/')
        .setTimestamp()

        message.channel.send({ embed })
      } else if(rety == "sci" || rety == "science" || rety == "math") {
				const embed = new MessageEmbed()
				.setTitle("Yttrius Math & Science Commands")
				.setDescription("Here you can find commands for **math & science**.\nUse `"+config.prefix+"find {cmd_name}` to get info on a specific command")
				.addField('Commands', "`nasa, tempconvert, weather, calc, evaluate`")
				.setColor("RANDOM")
				.setFooter("https://exoad.github.io/yttrius/")
				.setTimestamp()

				message.channel.send({ embed })
			}
			 else {
          const embed = new MessageEmbed()
          .setTitle("Yttrius Help Menu")
          .setDescription("This is the main help menu. To get specific info on a command use `"+config.prefix+"find {command}`\nUse `"+config.prefix+"help {category}` to get commands in that category")
          .setColor("RANDOM")
          .setThumbnail('https://images-ext-1.discordapp.net/external/w-Unj1FQpBIiN3I48V2MvuYk2Wkqpv7kf3hceRMkfGQ/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/792193904614703114/d2127aad3175d633efc6c2d2884ca1e5.png?width=300&height=300')
          .addField(':video_game: Fun Commands', "Use `"+config.prefix+"help fun`", true)
          .addField(':information_source: Info & Utility Commands', "Use `"+config.prefix+"help info`", true)
          .addField('<:yttrius_moderation:804372335356018708> Moderation Commands', "Use `"+config.prefix+"help mod`", true)
          .addField('<:yttrius_mc:804361806449475665> Minecraft Commands', "Use `"+config.prefix+"help mc`", true)
          .addField(':frame_photo: Images & Media:', "Use `"+config.prefix+"help media`", true)
          .addField(':green_circle: Other Commands:', "Use `"+config.prefix+"help other`", true)
          .setFooter('https://exoad.github.io/yttrius/')
          .setTimestamp()

          message.channel.send({ embed })
      }
      talkedRecently.add(message.author.id);
      setTimeout(() => {

        talkedRecently.delete(message.author.id);
      }, 60000);
    }

    try {

    } catch (error) {
      return message.channel.send(
        `Something went wrong`
      );
    }

  }
}