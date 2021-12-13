const { MessageEmbed } = require('discord.js');
module.exports = {
  config: {
    name: `createinvite`,
    aliases: [`cinvite`]
  },
  run: async (bot, message, args) => {
    const talkedRecently = new Set();

    if (talkedRecently.has(message.author.id)) {
      message.channel.send("This command is on cooldown for 10 minutes!");
    } else {
      try {
        const setChannelID = message.content.split(' ');
        if(!setChannelID) return message.channel.send("Please provide a channelID!")
        message.guild.channels.cache.get(setChannelID[1]).createInvite().then(invite => {
          const embed = new MessageEmbed()
            .setTitle('Server invite for this server')
            .setDescription(`\`${invite.url}\``)
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp()
            .setColor("RANDOM")
          message.channel.send({ embed })
        });
      } catch (error) {
        message.channel.send(
          `Something went wrong`
        );
        bot.channels.cache.get('806244820364296202').send(`${error}`)
        console.log(error)
      }
      talkedRecently.add(message.author.id);
      setTimeout(() => {

        talkedRecently.delete(message.author.id);
      }, 600000);
    }

  }
}
