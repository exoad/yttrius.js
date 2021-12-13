const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');
module.exports = {
  config: {
      name: `token`,
      category: '',
      description: '',
      aliases: [`bottoken`, `btoken`]
  },
  run: async (bot, message, args) => {
    try {
      const { body } = await superagent
      .get('https://some-random-api.ml/bottoken');

			message.channel.send("My bot token is: "+body.token)
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred!\nThis error has been marked in the devlogs and will be reviewed soon\n*Sorry for the inconvenience.`);
      bot.channels.cache.get('').send(`${err.stack}`)
  }
}
}
