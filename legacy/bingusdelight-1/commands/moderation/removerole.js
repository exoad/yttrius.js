const { MessageEmbed } = require('discord.js');
module.exports = {
  config: {
      name: `removerole`,
      category: '',
      description: '',
      aliases: [`roleremove`]
  },
  run: async (bot, message, args) => {
    try {
          if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return message.reply("I have invalid permission value of `MANAGE_ROLES`");
    if (message.mentions.users.size === 0) return message.reply("No user was mentioned.");
    if(!message.member.hasPermission(`MANAGE_ROLES`)) return message.reply(`<:error:795038461932732466> You have insufficient perm value of \`MANAGE_ROLES\``)
    let member = message.guild.member(message.mentions.users.first());
    if (!member) return message.reply("I could not find that user\nError code: `9`");
    let rname = message.content.split(" ").splice(2).join(" ");
    let role = message.guild.roles.cache.find(val => val.name === rname);
    if (!role) return message.reply("I could not find a role with that alias!\nError Code: `17`");
    let botRolePosition = message.guild.member(bot.user).roles.highest.position;
    let rolePosition = role.position;
    let userRolePossition = message.member.roles.highest.position;
    if (userRolePossition <= rolePosition) return message.channel.send("Your role is lower than the specified user!\nError Code: `18`")
    if (botRolePosition <= rolePosition) return message.channel.send("Seems like I don't have the right permissions!\nError code `2`");
    member.roles.remove(role).catch(e => {
        return message.channel.send("That user has a higher role than the highest role I have!\nError code `2`");
    });
    message.channel.send(`<a:green_tick:800155380650082355> Successfully removed **${role.name}** from user **${message.mentions.users.first().username}**!\n*Author: ${message.author.username}*`);
  } catch (err) {
      console.log(err)
      return message.channel.send("Oh no, an error occurred!\nThis error has been marked in the devlogs and will be reviewed soon\n*Sorry for the inconvenience.\nError code: \`5`");
      bot.channels.cache.get('811261110543712256').send(`${err.stack}`)
  }
}
}

