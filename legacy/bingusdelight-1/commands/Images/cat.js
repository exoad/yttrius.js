//https://some-random-api.ml/facts/cat
//http://aws.random.cat/meow
const { Discord, MessageEmbed } = require('discord.js');
const superagent = require('superagent');
module.exports = {
    config: {
        name: "cat",    
    },
    run: async (bot, message, args) => {
        try {
            let toChoose = args[0];
            if(!toChoose) {
                const { body } = await superagent.get('http://aws.random.cat/meow');
                const embed = new MessageEmbed()
                .setTitle(
                    "Cat"
                )
                .setImage(
                    `${body.file}`
                )
                .setTimestamp()
                .setFooter(
                    "Use >>cat facts for cat facts!"
                )
                .setColor(
                    "RANDOM"
                )
                message.channel.send({ embed })
            } else if(toChoose == "facts" || toChoose == "fact") {
                const { body } = await superagent.get('https://some-random-api.ml/facts/cat');
                const embed = new MessageEmbed()
                .setTitle("Random Cat Fact")
                .setDescription(`${body.fact}`)
                .setColor("RANDOM")
                
                message.channel.send({ embed })
            }
        } catch (err){
            message.channel.send("Something went wrong...");
            console.log(err.message);
        }
    }
}