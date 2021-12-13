const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');
module.exports = {
  config: {
      name: `imbored`,
      category: '',
      description: '',
      aliases: [``]
  },
  run: async (bot, message, args) => {
    try {
    const { body } = await superagent.get('https://www.boredapi.com/api/activity');
    message.channel.send(">>> **Here is something interesting:**\nActivity: `"+body.activity+"`\nType: `"+body.type+"`\n")
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred!\nThis error has been marked in the devlogs and will be reviewed soon\n*Sorry for the inconvenience.`);
      bot.channels.cache.get('').send(`${err.stack}`)
  }
}
}