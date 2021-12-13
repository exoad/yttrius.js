const Discord = require('discord.js');
module.exports = {
    config: {
        name: `kick`,
        aliases: []
    },
    run: async (bot, message, args) => {
      let user = message.mentions.users.first();
      if(user == message.author) return message.reply("<:y_confused:795036004591075328> Self Harm is not ok, please visit: https://suicidepreventionlifeline.org/")
      if (user.id === bot.user.id) return message.reply("<:smug:795036394593976351> You can't kick me.")
      if (message.mentions.users.first().id === "709776016314204283") return message.reply("<:y_confused:795036004591075328> Why would you want to kick my developer");
      if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(`<:y_confused:795036004591075328> Woah there! Seems like you are missing some necessary perms!`);
      if(!user) return console.log(`<:y_confused:795036004591075328> Invalid User | Mention someone!`)
      let reason = args.slice(1).join(" ");
      if(!reason) reason = `ReasonBlank`;
      const embed = new Discord.MessageEmbed()
      .setColor(10339544)
      .setTitle(`${user} has been kicked by ${message.author.tag}`)
      .setFooter('This was commenced by the kick command')
      .setDescription(`**Reason:** ${reason}`)
      .setTimestamp()
    message.guild.members.ban(user, { embed } )
    message.reply({ embed })
        //error handler and listener
    const token = process.env.token;
    bot.on("error", () => { bot.login(token) });
    }
}
