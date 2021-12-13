const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');
module.exports = {
  config: {
      name: `lizard`,
      category: '',
      description: '',
      aliases: [`randomlizard`]
  },
  run: async (bot, message, args) => {
    try {
      const { body } = await superagent 
      .get('https://nekos.life/api/lizard');

      const embed = new MessageEmbed()
      .setTitle('A random Lizard')
      .setImage(`${body.url}`)
      .setColor("RANDOM")

      message.channel.send({ embed }).then(m=>{
        m.react('❤️')
      })
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred!\nThis error has been marked in the devlogs and will be reviewed soon\n*Sorry for the inconvenience.*`);
      bot.channels.cache.get('').send(`${err.stack}`)
  }
}
}
