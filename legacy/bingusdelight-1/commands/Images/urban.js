const urban = require('urban');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');
module.exports = {
  config: {
      name: `urban`,
      category: '',
      description: '',
      aliases: [`define`, `urbandefine`]
  },
  run: async (bot, message, args) => {
    try {
      if (args.length < 1) {
        return message.channel.send('Nothing entered');
    }
    let word = args.join(" ");
		const body = await superagent.get('https://random-word-api.herokuapp.com/word?number=10');
				if(args[0] == "exoad" || args[0] == "Exoad"){
					        const embed = new MessageEmbed()
            .setTitle("Word: exoad")
            .setDescription(`**Definition:** \`\`\`css\n${body.text}\`\`\` \n**Example:** \`\`\`css\nWow its exoad. Programming!\`\`\``)
            .setColor('#16a5b8')
            .addField(':small_red_triangle: Upvotes', "420", true)
            .addField(':small_red_triangle_down: Downvotes', "69", true)
            .addField('Requested by:', `${message.author.tag}`, true)
						.addField("Definition Author", "Somebody101", true)
						.addField(":link: Link:", "[Click Here](https://discord.gg/QwNTcpyZbF)", true)
            .setTimestamp(new Date())
            .setFooter(`Defined by Urban Dictionary`);

        message.channel.send({ embed });
				} else {
				urban(word).first(json => {
        if (!json) {
            return message.channel.send('Found nothing.');
        }
        const embed = new MessageEmbed()
            .setTitle("Word: "+json.word)
            .setDescription(`**Definition:** \`\`\`css\n${json.definition}\`\`\` \n**Example:** \`\`\`css\n${json.example}\`\`\``)
            .setColor('#16a5b8')
            .addField(':small_red_triangle: Upvotes', json.thumbs_up, true)
            .addField(':small_red_triangle_down: Downvotes', json.thumbs_down, true)
            .addField('Requested by:', `${message.author.tag}`, true)
						.addField("Definition Author", json.author, true)
						.addField(":link: Link:", "[Click Here](https://www.urbandictionary.com/define.php?term="+args.join("%20")+")", true)
            .setTimestamp(new Date())
            .setFooter(`Defined by Urban Dictionary`);

        message.channel.send({ embed });
				bot.channels.cache.get('806245388095979560').send(`${message.author.id}\n**Server ID**:  ${message.guild.id}\n**Input** ${word}\n**TYPE** Urban`);
				})
    };
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
}
}
