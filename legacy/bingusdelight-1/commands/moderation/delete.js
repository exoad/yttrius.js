const { MessageEmbed } = require('discord.js');
module.exports = {
  config: {
    name: `delete`,
    category: '',
    description: '',
    aliases: [`msgdelete`]
  },
  run: async (bot, message, args) => {
    try {
      const deleteCount = parseInt(args[0], 10);
      if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply("I have invalid permission value of `MANAGE_MESSAGES`");
      if (!message.member.hasPermission("MANAGE_MESSAGES")) 
      {
        const embed = new MessageEmbed()
        .setTitle('Permission Error Encountered!')
        .setDescription("It appears you do not have the right permission to operate this command!")
        .addField('Required Permission:', "MANAGE_MESSAGES")
        .addField('Permission ID:', '8192')
        .setTimestamp()
        message.channel.send({ embed });
      }

      else {
        // Ooooh nice, combined conditions. <3
        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
          return message.channel.send("**Values accepted:** 2-100");
        }

        await message.channel.bulkDelete(deleteCount).then(m => message.channel.send(`:white_check_mark: Successfully deleted ${deleteCount} messages`)).catch(error => message.reply(`**Something went wrong!**\n1.Internal error\n2.Specified deletion amount contained invalid characters\n**3.I have missing permissions!**`));
      }   
    } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred\nPlease try again later.`);
    }
  }
}
