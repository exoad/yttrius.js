const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
module.exports = {
  config: {
    name: `advice`,
    category: '',
    description: '',
    aliases: [`tip`]
  },
  run: async (bot, message, args) => {
    try {
      const { text } = await request.get('http://api.adviceslip.com/advice');
      const body = JSON.parse(text);

      const embed = new MessageEmbed()
      .setTitle('Here is your advice!')
      .setDescription(`${body.slip.advice}`)
      .setColor("RANDOM")

      message.channel.send({ embed })
    } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred\nPlease try again later.`);
    }
  }
}
