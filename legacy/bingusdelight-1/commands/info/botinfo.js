const {MessageEmbed, version} = require('discord.js');
const config = require('../../config.json');
module.exports = {
    config: {
        name: `botinfo`,
        description: ``,
        aliases: [`systeminfo`,`binfo`]
    },
    run: async (bot, message, args) => {
            try {

                let totalSeconds = (bot.uptime / 1000);
                let days = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = Math.floor(totalSeconds % 60);
                let uptime = `System Uptime: Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`;

                const embed = new MessageEmbed()
                  .setColor(15257933)
                  .setTitle('Exoad\'s Primary Server')
                  .setDescription('Yttrius can be moved from the Primary to the Temporary Server depending on the situations.')
                  .addField('``Specifications::``', `**System Memory:** ${(process.memoryUsage().heapUsed / 4096 / 4096).toFixed(2)}MBS/4,096 MB\n**CPU:** Intel(R) Xeon Platinum 8276 @2.20GHz\n**OS:** Linux Debian/CriOS (x64)`)
                  .addField(`**Uptime:**`, `${uptime}`)
                  //.addField('``DiscordJS & NodeJS version``', `**Node.js:** ${process.version}\n**Discord.js:** ${version}`)
                  .addField("Build", "JavaLib: 2.4.1 Custom\nCPPLib: 1.0 Custom\nNodeJS: `Deprecated`")
                  .addField('``Creator:``', 'exoad#4166')
                  .addField('``Amount of Servers``:', `67`)
                  .addField('Advanced help menu', 'https://exoad.github.io/yttrius/')
									.addField("Bot Current Prefix", config.prefix)
                  .setTimestamp();
                message.channel.send(embed);
              } catch (e) {
                console.log(`${e.message}`);
                console.error;
                message.channel.send(`Oh no, an error occurred!\n${e.message}`);
              }
    }   
}