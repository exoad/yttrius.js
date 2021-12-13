module.exports = {
    config: {
        name: `embedecho`,
        aliases: [``]
    },
    run: async (bot, message, args) => {
        let userMessage = args.slice(0).join(' ');
        if(!userMessage) return message.reply("``Error`` Apply a message!")
        message.delete().catch(error => {
            if (error.code !== Discord.Constants.APIErrors.UNKNOWN_MESSAGE) {
                message.channel.send("Error | Invalid Permissions Met")
            }
        });
        const embed = {
            "description":`${userMessage}`,
            "color": "#1fdbac"
        }
        message.channel.send({ embed })
            //error handler and listener
				bot.channels.cache.get('806245388095979560').send(`${message.author.id}\n**Server ID**:  ${message.guild.id}\n**Input** ${userMessage}`);
            const { token } = process.env.token;
    bot.on("error", () => { bot.login(token) });
    }
}