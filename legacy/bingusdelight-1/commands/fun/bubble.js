const { MessageEmbed } = require('discord.js');
const talkedRecently = new Set();
module.exports = {
  config: {
      name: `bwrap`,
      category: '',
      description: '',
      aliases: [`bubblewrap`]
  },
  run: async (bot, message, args) => {
    try {
              if (talkedRecently.has(message.author.id)) {
            message.reply("Greed. Please wait 1 minute").then(m => {m.delete({timeout: 5000})});
    } else {
      const embed = new MessageEmbed()
      .setTitle("Your sheet of Bubble Wrap x1!")
      .setDescription("||pop|| ||pop|| ||pop|| ||pop|| ||pop||\n||pop|| ||pop|| ||pop|| ||pop|| ||pop||\n||pop|| ||pop|| ||pop|| ||pop|| ||pop||\n||pop|| ||pop|| ||pop|| ||pop|| ||pop||\n||pop|| ||pop|| ||pop|| ||pop|| ||pop||\n||pop|| ||pop|| ||pop|| ||pop|| ||pop||\n||pop|| ||pop|| ||pop|| ||pop|| ||pop||")
      .setColor("RANDOM")
      .setFooter("Enjoy! :D")

      message.channel.send({ embed })

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 60000);
    }

  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred!\nThis error has been marked in the devlogs and will be reviewed soon\n*Sorry for the inconvenience.`);
      bot.channels.cache.get('').send(`${err.stack}`)
  }
}
}