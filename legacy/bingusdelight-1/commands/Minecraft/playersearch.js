const mojang = require('mojang-api');
const { Discord, MessageEmbed} = require('discord.js');
const config = require('../../config.json');
module.exports = {
  config: {
      name: `mcplayer`,
      category: 'Minecraft',
      description: 'Search a minecraft player using the Mojang API',
      aliases: [`psearch`]
  },
  run: async (bot, message, args) => {
    try {
    
      if(!args.length) {
        message.reply('Invalid UUID | Cannot be blank | To search for a player\'s UUID use ``'+config.prefix+'uuid {playername}``');
        return;
    }

    mojang.profile(args[0], (err, resp) => {
        if(err) {
            message.reply('I could not find that user | To search for a player\'s UUID use ``'+config.prefix+'uuid {playername}``');
            return;
        }

        mojang.nameHistory(args[0], (err, resp1) => {
            if(err) {
                message.reply('Error. Please Try Again Later. | To search for a player\'s UUID use ``'+config.prefix+'uuid {playername}``');
                console.error(err);
                return;
            }
            
            let nameHistory = '';
            resp1.forEach(element => {
                nameHistory += element.name + ', ';
            });
            nameHistory = nameHistory.slice(0, nameHistory.length - 2);
            const embedMessage = new MessageEmbed()
            .setColor('#fccf03')
            .setTitle('Player Info')
            .setAuthor(resp.name, `https://mc-heads.net/avatar/${resp.name}`)
            .setDescription(resp.name+"'s profile")
            .setThumbnail(`https://mc-heads.net/head/${resp.name}/left`)
            .addField('Player Username:', resp.name)
            .addField('Player UUID:', resp.id)
            .addField('Player Skin(Download):', 'https://crafatar.com/skins/' + resp.id + '.png')
            .addField('Player Cape(if any):', 'https://crafatar.com/capes/' + resp.id + '.png')
            .addField('Player head(1.13+):', `/give @s minecraft:player_head{SkullOwner:"${resp.name}"}`)
            .addField('Player Head(1.12-):', `/give @s minecraft:skull{SkullOwner:"${resp.name}"}`)
            .addField('Player Name History:', nameHistory)
            .setImage(`https://mc-heads.net/body/${resp.id}`)
            .setTimestamp()
            .setFooter('YttriusMC')
            message.channel.send({  embed: embedMessage  });
        });
    });
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred. Please Try Again.\nThis error has been marked and will be resolved ASAP.\nSorry for the inconvenience`);
  }
  }
}
