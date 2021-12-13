const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    config: {
        name: `ban`,
        aliases: [`bank`, `bonk`]
    },
    run: async (bot, message, args) => {
        let banMember = message.mentions.members.first();
        let user = message.mentions.users.first();
        if(banMember == message.author) return message.reply("<:error:795038461932732466> Self Harm is not ok, please visit: https://suicidepreventionlifeline.org/")
        if (user === bot.user.id) return message.reply("<:smug:795036394593976351> You can't ban me.")
        if (message.mentions.users.first() === "709776016314204283") return message.reply("<:y_confused:795036004591075328> Why would you want to ban my developer");
        if(!message.member.hasPermission(`BAN_MEMBERS`) && message.member != '709776016314204283') return message.reply(`<:error:795038461932732466> Hey! You don't have permissions to ban!`)
        if(!banMember) return message.reply(`<:error:795038461932732466> Invalid User | Mention someone!`)
        let banreason = args.slice(1).join(" ");
        if(!banreason) banreason = `Reason was left blank`;

        const embed = new Discord.MessageEmbed()
          .setColor(14839836)
          .setTitle(`<a:green_tick:800155380650082355> ${banMember.user.tag} has been banned by ${message.author.tag}`)
          .setImage('https://media.tenor.com/images/56bc17988e02b6534d824f82ffc8236a/tenor.gif')
          .setFooter('This was commenced by the ban/bank/bonk command')
          .setDescription(`**Reason:** ${banreason}\n**Banned ID:** ${banMember.id}\n**Moderator ID:**${message.author.id}`)
          .setTimestamp()
        message.guild.members.ban(banMember, { embed } )
        message.reply({ embed })
            //error handler and listener
    const token = process.env.token;
    bot.on("error", () => { bot.login(token) });
    }
    //{reason: `Staff: ${message.author.tag} || Reason: ${banreason}`}
}