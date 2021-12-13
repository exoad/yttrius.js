//https://inspirobot.me/api?generate=true
const superagent = require('superagent');
const { MessageEmbed } = require('discord.js');
module.exports = {
  config: {
      name: `inspire`,
      category: '',
      description: '',
      aliases: [`iwannabeinspired`]
  },
  run: async (bot, message, args) => {
    try {
			const body = await superagent.get('https://inspirobot.me/api?generate=true');
			const embed = new MessageEmbed()
			.setTitle("Inspired by AI")
			.setImage(body.text)
			.setColor("RANDOM")

			message.channel.send({ embed })
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred!\nThis error has been marked in the devlogs and will be reviewed soon\n*Sorry for the inconvenience.`);
      bot.channels.cache.get('').send(`${err.stack}`)
  }
}
}