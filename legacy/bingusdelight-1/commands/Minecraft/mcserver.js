const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { realpathSync } = require('fs');
const superagent = require('superagent');
module.exports = {
  config: {
    name: `mcserver`,
    description: '',
    category: '',
    aliases: [``]
  },
  run: async (bot, message, args) => {
    try {
      let rety = args[0];
      if(!rety || rety == undefined) return message.channel.send("Invalid Address Provided")
      const { body } = await superagent.get('https://api.mcsrvstat.us/2/'+rety);
      if(!body.hostname) return message.channel.send("Invalid Response | `Error 404 Not Found`")
      else { const embed = new MessageEmbed()
        .setTitle('Minecaft Server')
        .addField('IP', body.ip, true)
        .addField('PORT', body.port, true)
        .addField('Ping', body.debug.ping, true)
        .addField("MOTD", `**CLEAN:**\n\`${body.motd.clean}\``, true)
        .addField("Version", body.version, true)
        .addField('Is Online?', body.online, true)
        .addField("Player", `${body.players.online}/${body.players.max} (Online/Max)`, true)
        .addField('Query', body.debug.query, true)
        .addField('AnimatedMOTD', body.debug.animatedmotd, true)
        .addField('Cache Time', body.debug.cachetime, true)
        .addField("Protocol", body.protocol, true)
        .addField("HostName", body.hostname, true)
        .addField("Software", body.software, true)
        .addField("Map", body.map, true)
        .setTimestamp()
        .setColor("RANDOM")

      message.channel.send({ embed })
      }
    } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
  }
}
