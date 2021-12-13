const { MessageEmbed } = require('discord.js');
const superagent = require('superagent')
module.exports = {
  config: {
      name: `joke`,
      category: '',
      description: '',
      aliases: [`iwannalaugh`]
  },
  run: async (bot, message, args) => {
    try {
      const rety = message.content.split(" ");
      if(rety[1] == "any")
      {
      const body = await superagent 
      .get(`https://v2.jokeapi.dev/joke/Any?format=txt`);
			
        const embed = new MessageEmbed()
        .setDescription(`${body.text}`)
        .setFooter("Type \"any\" can contain dark jokes")
        .setColor("RANDOM")

      message.channel.send({ embed })
      } else if(rety[1] == "dark")
      {
        const body = await superagent
        .get('https://v2.jokeapi.dev/joke/Dark?format=txt');
        
        const embed = new MessageEmbed()
        .setDescription(`||${body.text}||`)
        .setFooter("Your choice to look")
        .setColor("RANDOM")

        message.channel.send({ embed })
      } else if(rety[1] == "pun")
      {
        const body = await superagent
        .get('https://v2.jokeapi.dev/joke/Pun?format=txt');

        const embed = new MessageEmbed()
        .setDescription(`||${body.text}||`)
        .setColor("RANDOM")

        message.channel.send({ embed })
      } else if(!rety[1] || rety[1] == undefined)
      {
        const embed = new MessageEmbed()
        .setTitle("Jokes Command Usage")
        .setDescription("Having trouble using this command?")
        .addField("Basic Usage:", "`>>joke {pun/any/dark/programming}`")
        .addField("Example:", ">>joke pun")
        .setTimestamp()

        message.channel.send({ embed })
      } else if(rety[1] == "programming"){
				const body = await superagent.get('https://v2.jokeapi.dev/joke/Programming?format=txt');

				const embed = new MessageEmbed()
				.setDescription(`${body.text}`)
				.setColor("RANDOM")

				message.channel.send({ embed })
			}
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred!\nThis error has been marked in the devlogs and will be reviewed soon\n*Sorry for the inconvenience.`);
      bot.channels.cache.get('').send(`${err.stack}`)
  }
}
}
