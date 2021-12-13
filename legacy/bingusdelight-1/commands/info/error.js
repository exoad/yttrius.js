const { ReactionManager } = require('discord.js');
const talkedRecently = new Set();
module.exports = {
    config: {
        name: `report`,
        category: 'Info',
        description: 'Suggest something for the bot and your suggestion will be sent to the dev!',
        aliases: []
    },
    run: async (bot, message, args) => {
        if (talkedRecently.has(message.author.id) && message.author.id != '709776016314204283') {
            message.channel.send("Woah bud! This command is on cooldown for 5 minutes!");
    } else {
        const embed = {
            "plainText": "**READ THE FOLLOWING**",
            "title": "TOS",
            "description": "By clicking ✅ you are signifying you have understood the following.\n\nBy clicking ❎ you disagree with the TOS\n\n~exoad",
            "author": {
              "name": "Yttrius Suggestion TOS",
              "icon_url": "https://discord.com/assets/5f8aee4f266854e41de9778beaf7abca.svg"
            },
            "color": 16777215,
            "footer": {
              "text": "Yttrius Report TOS",
              "icon_url": "https://images-ext-1.discordapp.net/external/w-Unj1FQpBIiN3I48V2MvuYk2Wkqpv7kf3hceRMkfGQ/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/792193904614703114/d2127aad3175d633efc6c2d2884ca1e5.png?width=285&height=285"
            },
        }

        message.reply({ embed });

// Reacts so the user only have to click the emojis
message.react('✅').then(r => {
        message.react('❎');
});

// First argument is a filter function
message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❎'),
        { max: 1, time: 30000 }).then(collected => {
                if (collected.first().emoji.name == '✅') {
                    message.channel.send('**Your report has been marked.**\nIf your compliance with the TOS is broken, your idea will be discarded and investigation will take place');
                    const content = `New Report! \n **${message.author.username}#${message.author.discriminator}** (${message.author.id}) has suggested the following:\n~~--------------------------------~~\n${args.join(" ")}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
                    bot.channels.cache.get('795761142491381780').send(`${content}`).then(message => {
                        message.react("<:approved:796184118273507359>");
                        message.react("<:denied:796184118341009408>");
                        });
                }   
                else
                        message.reply('Thank you for your honesty.\nYour report will not be marked.');
        })

    }
        talkedRecently.add(message.author.id);
        setTimeout(() => {

          talkedRecently.delete(message.author.id);
        }, 300000);

    }
    }