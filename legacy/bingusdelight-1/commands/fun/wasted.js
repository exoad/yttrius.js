const Discord = require('discord.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
module.exports = {
  config: {
    name: `wasted`,
    description: '',
    category: '',
    aliases: [`waste`]
  },
  run: async (bot, message, args) => {
    try {
      let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });

      message.channel.send({ files: [{ attachment: `https://some-random-api.ml/canvas/wasted?avatar=${avatar}`, name: "pixel.png" }] })
    } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
  }
}
