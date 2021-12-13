const google = require('google');
const Discord = require(`discord.js`);

module.exports = {
  config: {
      name: `reload`,
      aliases: [`retract`]
  },
  run: async (bot, message, args) => {
    let retia = message.content.split(/[ ]+/);
    let suffix = retia.slice(1).join(' ');
    if (!suffix) {
        message.channel.send({
            embed: {
                color: 0xff2727,
                description: `Give me something to search first!`,
                footer: {
                    text: 'Bot latency: ' + `${Date.now() - message.createdTimestamp}` + ' ms',
                }
            }
        });
    }
    google.resultsPerPage = 25;
    google(suffix, function (err, res) {
        if (err) message.channel.send({
            embed: {
                color: 0xff2727,
                description: `Oh no: **${message.author.username}**, ${err}`,
                footer: {
                    text: 'Bot Latency ' + `${Date.now() - message.createdTimestamp}` + ' ms',
                }
            }
        });
        for (var i = 0; i < res.links.length; ++i) {
            var link = res.links[i];
            if (!link.href) {
                res.next;
            } else {
                let embed = new Discord.RichEmbed()
                    .setColor(221)
                    .setAuthor(`Here are the results I found for: "${suffix}"`, `https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png`)
                    .setDescription(`**Link**: [${link.title}](${link.href})\n**Description**:\n${link.description}`)
                    .setTimestamp()
                    .setFooter('API Lantancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms', message.author.displayAvatarURL);
                return message.channel.send({
                    embed: embed
                });
            } return message.react("✅");
        }
    });
  }
}