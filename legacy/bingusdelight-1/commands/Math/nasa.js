const talkedRecently = new Set();
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent')
module.exports = {
  config: {
      name: `nasa`,
      category: '',
      description: '',
      aliases: [`nasatoday`]
  },
  run: async (bot, message, args) => {
    try {
  if (talkedRecently.has(message.author.id)) {
            message.reply("Woah! Relax! This command is on cooldown for 10 minutes! \nNote this command only retrieves new info every **new** day!");
    } else {
			const { body } = await superagent
      .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`);

			if(body.hdurl == undefined){
      const embed = new MessageEmbed()
      .setTitle(`${body.title}`)
      .setDescription(`${body.explanation}`)
      .setFooter(`${body.date} | Copyright ${body.copyright}`)

      message.channel.send({ embed })
			} else {
      const embed = new MessageEmbed()
      .setTitle(`${body.title}`)
      .setDescription(`${body.explanation}`)
      .setImage(`${body.hdurl}`)
      .setFooter(`${body.date} | Copyright ${body.copyright}`)

      message.channel.send({ embed })
			}
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 600000);
    }
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred!\nThis error has been marked in the devlogs and will be reviewed soon\n*Sorry for the inconvenience.`);
      bot.channels.cache.get('').send(`${err.stack}`)
  }
}
}
