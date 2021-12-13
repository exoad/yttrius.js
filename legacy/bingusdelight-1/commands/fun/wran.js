module.exports = {
    config: {
        name: `wran`,
        aliases: [``]
    },
    run: async (bot, message, args) => {
        let reason = args.slice(1).join(' ');
        if (!message.mentions.users.first())
        return message.channel.send("Mention someone first");
        else {
            message.channel.send(`${message.author} has wranned ${message.mentions.users.first()}. \n **Reason**: ${reason}`)
        }
    }
}
