const Discord =  require('discord.js');
module.exports = {
    config: {
        name: `avatar`,
        aliases: [`av`]
    },
    run: async (bot, message, args) => {
        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 1024 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 });
        if (message.mentions.users.size > 0) {
          const embed = new Discord.MessageEmbed()
            .setColor(10812580)
            .setTitle(`:white_check_mark: ${message.mentions.users.first().username}\'s Profile Picture:`)
            .setImage(`${avatar}`)
            message.channel.send({embed});
        } else {
          const embed = new Discord.MessageEmbed()
          .setColor(10812580)
          .setTitle(`:white_check_mark: ${message.author.username}\'s Profile Picture:`)
          .setImage(`${avatar + "?size=1024"}`)
          message.channel.send({embed});
        }
            //error handler and listener
    const token = process.env.token;
    bot.on("error", () => { bot.login(token) });
    }
};