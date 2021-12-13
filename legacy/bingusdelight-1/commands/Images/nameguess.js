//https://api.agify.io/?name=michael
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');
module.exports = {
  config: {
      name: `guessmyage`,
      category: '',
      description: '',
      aliases: [``]
  },
  run: async (bot, message, args) => {
    try {
      let avatar = message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
      let rety = args[0];
      if(message.content.includes("nigger") || message.content.includes("niggers") || message.content.includes("NIGGERS") || message.content.includes("NIGGER") || message.content.includes("dipship") || message.content.includes("bitch") || message.content.includes("fuck") || message.content.includes("bitches") || message.content.includes("bitchs") || message.content.includes("nigers") || message.content.includes("n1gger") || message.content.includes("n1ggers") || message.content.includes("shit")) { message.channel.send("No."); bot.channels.cache.get('806245388095979560').send(`${message.author.id} use of language`)}
      else  if (!rety || rety == undefined || rety == " " ){
        message.channel.send("Invalid Parameters | `>>guessmyage {name}`")
      } else{
        const { body } = await superagent
          .get(`https://api.agify.io/?name=${rety}`);

        const embed = new MessageEmbed()
        .setTitle('Guessing your age')
        .setDescription("I guessed your age based on your first name; AI!")
        .addField('Name:', `${body.name}`)
        .addField('My guess', `${body.age}`)
        .addField('Count', `${body.count}`)
        .setFooter('My guess may not be correct')
        .setTimestamp()
        .setColor("RANDOM")
        .setThumbnail(`${avatar +  "?size=2048"}`)
        
        message.channel.send({ embed })
      }
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred!\nThis error has been marked in the devlogs and will be reviewed soon\n*Sorry for the inconvenience.`);
      bot.channels.cache.get('').send(`${err.stack}`)
  }
}
}