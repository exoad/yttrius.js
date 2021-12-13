const { MessageEmbed } = require('discord.js');
const jimp = require('jimp');
const superagent = require('superagent');
const config = require("../../config.json");
module.exports = {
    config: {
        name: `create`,
        aliases: [`memecreate`, `imagecreate`]
    },
    run: async (bot, message, args) => {

    try {
        let userchoice = message.content.split(" ");


        if(!userchoice[1] || userchoice[1] == undefined)
        {
        const embed = new MessageEmbed()
          .setTitle('Create an image Command')
          .setDescription('Read how to use this command below to create your image')
          .addField('Basic Usage:', "`"+config.prefix+"create {template name} {arguments...}`")
          .addField('Template Names:', "`pill, changemymind, car, meeting, grave, firsttime, drip, redblue, sector, qr`")
          .addField('Argument Parameters:', "Pill: `text`\nChangemymind: `text`\nCar: `text`\nMeeting: `text`\nGrave: `user`\nFirsttime: `user`\nDrip: `user`\nRedBlue: `text1 text2`\nSector: `text`\nqr: `text`")
          .addField('Example Usage:', "`"+config.json+"create pill truth`")
          .addField('Support:', "If you need extra support, you can join my discord server: `https://discord.gg/wTAcPZxwqq`")
          .setTimestamp()
          .setColor("RANDOM")

          message.channel.send({ embed })
        } else if(userchoice[1] == "pill")
        {
                let rety = message.content.split(" ").slice(2);
                 if(!rety || rety == undefined) return message.channel.send("The ``pill`` parameter uses ``text``")
                else {
                let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK) 
                let welcome = await jimp.read('https://imgflip.com/s/meme/Hard-To-Swallow-Pills.jpg')
                welcome.print(font, 250, 770, `${rety.join(" ")}`) 
                welcome.write('./Images/pill.jpg') 
                message.channel.send(``, { files: ["./Images/pill.jpg"] }) 
                }

        } else if(userchoice[1] == "changemymind")
        { 
          let rety = message.content.split(" ").slice(2);
          if(!rety || rety == undefined) return message.channel.send("The ``changemymind`` parameter uses ``text``")
            message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/changemymind?text=${rety.join(" ")}`, name: "changemymind.png"}]});
        } else if(userchoice[1] == "car")
        {
          let rety = message.content.split(" ").slice(2);
          if(!rety) return message.channel.send("The ``car`` parameter uses ``text``")
          message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/carreverse?text=${rety.join(" ")}`, name: "car.png"}]})
        } else if(userchoice[1] == "meeting")
        {
          let rety = message.content.split(" ").slice(2);
          if(!rety) return message.channel.send("The `meeting` parameter uses ``text``")
          message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/emergencymeeting?text=${rety.join(" ")}`, name: "meeting.png"}]})
        } else if(userchoice[1] == "grave")
        {
          try {
          let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
          if(!member || member == undefined) return message.channel.send("The `drip` parameter uses `user`")
          var user;
            if (!member && !args[0]) 
            {
		          user = message.author;
	          } else if (args[0] && !member) {
		        if (isNaN(args[0])) return message.reply("I could not find a user with that ID!");
		          user = bot.users.get(args[0]);
		        if (!user) return message.reply("I could not find that user!");
	          } else {
		        user = member;
	          }
          let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
          message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/grave?user=${avatar}`, name: "grave.png"}]}).then(m=> {
						m.react("🇫");
					})
          

          } catch (err) {
            bot.channels.cache.get('806244020971634698').send(`${err.stack}`)
            console.log(err)
          }
        } else if(userchoice[1] == 'firsttime')
        {
          let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
          if(!member || member == undefined) return message.channel.send("The `firsttime` parameter uses `user`")
          var user;
            if (!member && !args[0]) 
            {
		          user = message.author;
	          } else if (args[0] && !member) {
		        if (isNaN(args[0])) return message.reply("I could not find a user with that ID!");
		          user = bot.users.get(args[0]);
		        if (!user) return message.reply("I could not find that user!");
	          } else {
		        user = member;
	          }
          let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
          message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/firsttime?user=${avatar}`, name: "firsttime.png"}]}) 
        } else if(userchoice[1] == 'drip')
        {
          let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
          if(!member || member == undefined) return message.channel.send("The `drip` parameter uses `user`")
          var user;
            if (!member && !args[0]) 
            {
		          user = message.author;
	          } else if (args[0] && !member) {
		        if (isNaN(args[0])) return message.reply("I could not find a user with that ID!");
		          user = bot.users.get(args[0]);
		        if (!user) return message.reply("I could not find that user!");
	          } else {
		        user = member;
	          }
          let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
          message.channel.send({ files: [{ attachment: `https://vacefron.nl/api/drip?user=${avatar}`, name: "drip.png"}]})
        } else if(userchoice[1] == 'redblue')
        {
          let rety = message.content.split(" ");
          if(!rety || rety  == undefined) return message.channel.send('The `redblue` parameter uses `text1 text2`')
          if(rety[2] == undefined || rety[3] == undefined) return message.channel.send(`Parameter type requires two arguments of 'text1' & 'text2'`)
          else 
          {
                let font = await jimp.loadFont(jimp.FONT_SANS_64_WHITE) 
                let welcome = await jimp.read('https://media.discordapp.net/attachments/804537883901689896/806275425353203722/1e4lu0.png?width=1239&height=646')
                welcome.print(font, 350, 295, `${rety[2]}`)
                welcome.print(font, 865, 310, `${rety[3]}`) 
                welcome.write('./commands/Images/redblue.png') 
                message.channel.send(``, { files: ["./commands/Images/redblue.png"] }) 
                }
        } else if(userchoice[1] == 'testing')
        {
            if(message.author.id != '709776016314204283') return message.channel.send('This is a testing command')
            let rety = message.content.split(" ").join(" ").slice(2);
            if(!rety || rety == undefined) return message.channel.send()
          
        } else if(userchoice[1] == 'sector')
        {
          let rety = message.content.split(" ").slice(2);
          if(!rety || rety == undefined) return message.channel.send('The `sector` parameter uses `text`')
          else 
          {
            let font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE)
            let welcome = await jimp.read('https://images-ext-2.discordapp.net/external/v83AcBU2c9qnPr5M0GMHEhOjRP2Yk73_1EdGC_USd3U/%3Fwidth%3D437%26height%3D647/https/media.discordapp.net/attachments/795444330176708628/806344984591859742/2gn00f.jpg?width=415&height=615')
            welcome.print(font, 199, 270, `${rety.join(" ")}`)
            welcome.write('./commands/Images/sector.jpg')
            message.channel.send(``, { files: ["./commands/Images/sector.jpg"]})
          }

        } else if(userchoice[1] == 'qr')
        {
          let rety = message.content.split(" ").slice(2);
          if(!rety || rety == undefined) 
          {
            message.channel.send("The `qr` parameter uses `text`")
          } else {

            const embed = new MessageEmbed()
            .setTitle('Your custom QR')
            .setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${rety.join("_")}`)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`)
            
            message.channel.send({ embed })
          }

        }

    } catch (err) {
      message.channel.send("**Oh no something went wrong!**\nThe devs is working on fixing this issue\n*Sorry for the inconvenience*")
      bot.channels.cache.get('806244020971634698').send(`${err.stack}`)
      console
      
    }
    }
}


