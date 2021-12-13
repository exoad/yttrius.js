module.exports = {
    config: {
        name: `ot`,
        aliases: [``]
    },
    run: async (bot, message, args) => {
        if(!message.guild.id.size < 1) return message.reply("You must supply a Guild ID")
        if (message.author.id !== '709776016314204283') return message.reply("no")
        message.guild.leave()
            .then(g => console.log(`Left the guild ${g}`))
             .catch(console.error);
    }
}