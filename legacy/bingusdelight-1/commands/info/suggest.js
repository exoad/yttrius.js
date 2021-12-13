const { ReactionManager } = require('discord.js');
const talkedRecently = new Set();
module.exports = {
    config: {
        name: `suggest`,
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
              "text": "Yttrius Suggestion TOS",
              "icon_url": "https://images-ext-1.discordapp.net/external/w-Unj1FQpBIiN3I48V2MvuYk2Wkqpv7kf3hceRMkfGQ/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/792193904614703114/d2127aad3175d633efc6c2d2884ca1e5.png?width=285&height=285"
            },
            "fields": [
              {
                "name": "Banned Ideas (for now)",
                "value": "Eval Command, Self-Ban, Purge, Prune, Softban, TempBan, SoftKick, TempKick, Music, Rank, Bank System, Currency",
                "inline": true
              },
              {
                "name": "Irrelevance",
                "value": "Things that are outside of \"suggestions\" for the bot will be instantly denied and will result in further investigation. (ex. Advertisement of any form)",
                "inline": true
              },
              {
                "name": "Specific",
                "value": "If you have an idea, do your best to explain it. Don't be general, being general means the idea will be ignored immediately. ",
                "inline": true
              },
              {
                "name": "Appropriateness ",
                "value": "Abuse of this command, such as using racial slurs, curse words/cuss/swear, and other forms of harassment will get an instant ban from the usage of the system. ",
                "inline": true
              },
              {
                "name": "Report",
                "value": "Use this command for it's intended purposes, if you want to report a problem use ``>>report {user_report}`` to report a problem in the Yttrius System",
                "inline": true
              }
            ]
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
                    message.channel.send('**Your suggestion has been marked.**\nIf your compliance with the TOS is broken, your idea will be discarded and investigation will take place');
                    const content = `New Suggestion! \n **${message.author.username}#${message.author.discriminator}** (${message.author.id}) has suggested the following:\n~~--------------------------------~~\n${args.join(" ")}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
                    bot.channels.cache.get('793262834297339924').send(`${content}`).then(message => {
                        message.react("<:approved:796184118273507359>");
                        message.react("<:denied:796184118341009408>");
                        });
                }   
                else
                        message.reply('Thank you for your honesty.\nYour suggestion will not be marked.');
        })

    }
        talkedRecently.add(message.author.id);
        setTimeout(() => {

          talkedRecently.delete(message.author.id);
        }, 300000);

    }
    }