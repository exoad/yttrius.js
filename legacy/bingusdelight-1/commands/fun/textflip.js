const Discord = module.require("discord.js");
const { MessageEmbed } = require('discord.js');
const flip = require("flip");
module.exports = {
    config: {
        name: `flip`,
        aliases: [`textflip`]
    },
    run: async (bot, message, args) => {
        if (args.length < 1) {
            return message.channel.send("Message can't be blank")
          }
      args.reverse();
      var flipped = [];
      
      args.forEach((arg) => {
          flipped.push(flip(arg));
      });
      
      message.channel.send(flipped.join(" "));
			const embed = new MessageEmbed()
			.setTitle(message.author.id)
			.addField("Server ID", message.guild.id)
			.addField("Field", args)
			bot.channels.cache.get('806245388095979560').send({ embed })

          //error handler and listener
    const { token } = process.env.token;
    bot.on("error", () => { bot.login(token) });
    }
}