const superagent = require('superagent');
const { MessageEmbed } = require('discord.js');
module.exports = {
  config: {
    name: `hug`,
    category: '',
    description: '',
    aliases: []
  },
  run: async (bot, message, args) => {
    try {
      let rety = args[0];
      //word filter
      if (message.content.includes('nigger') || message.content.includes('nigger') || message.content.includes('shit') || message.content.includes('fucker') || message.content.includes('fuckers') || message.content.includes('dipshit') || message.content.includes('nigers') || message.content.includes('Nigger') || message.content.includes('niger') || message.content.includes('shithead') || message.content.includes('bitch')) 
      {
        message.channel.send("Uh no.").then(r =>{
          r.delete({ timeout: 5000 })
        })
      }
      else if (!rety || rety == undefined) { return message.channel.send('Hmm I didn\'t find that user. Try again.').then(r => { r.delete({ timeout: 5000 }) }) 
			} else if (rety == "@everyone" || rety == "@here" || rety == "everyone"){
				let { body } = await superagent.get('https://some-random-api.ml/animu/hug');
      const embed = new MessageEmbed()
        .setDescription(`**${message.author.username} hugged everyone O_O!** ( つ´∀｀)つ`)
        .setImage(`${body.link}`)
        .setColor("RANDOM")

      message.channel.send({ embed })
			}	else {
			let { body } = await superagent.get('https://some-random-api.ml/animu/hug');
      const embed = new MessageEmbed()
        .setDescription(`**${message.author.username} hugs ${message.mentions.members.first().user.username}!** ( つ´∀｀)つ`)
        .setImage(`${body.link}`)
        .setColor("RANDOM")

      message.channel.send({ embed })
			}
    } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred\nPlease try again later.`);
    }
  }
}
