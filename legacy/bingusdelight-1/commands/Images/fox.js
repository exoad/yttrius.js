//https://some-random-api.ml/facts/fox
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');
const config = require('../../config.json');
module.exports = {
  config: {
    name: `fox`,
    description: '',
    category: '',
    aliases: [``]
  },
  run: async (bot, message, args) => {
    try {
    var toChoose = args[0];
    if(!toChoose){
      const { body } = await superagent
        .get('https://randomfox.ca/floof/');
      
      const embed = new MessageEmbed()
      .setTitle("Random Fox")
      .setImage(`${body.image}`)
      .setColor("RANDOM")
      .setFooter("Use "+config.prefix+"fox fact for fox fact!")

      message.channel.send({ embed })
    } else if(toChoose == "fact" || toChoose == "facts"){
        const { body } = await superagent.get('https://some-random-api.ml/facts/fox');
        const embed = new MessageEmbed()
        .setTitle("Fox Fact")
        .setDescription(`${body.fact}`)
        .setColor("RANDOM");

        message.channel.send({ embed })
    }
      
    } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
  }
}
