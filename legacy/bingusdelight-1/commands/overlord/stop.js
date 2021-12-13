module.exports = {
    config: {
        name: `ytu`,
        aliases: [`stop`, 'fuck', 'die',`destroy`,`destroymankind`]
    },
    run: async (bot, message, args) => {
        if(message.author.id !== "709776016314204283") return message.reply(`:negative_squared_cross_mark: Access Denied :negative_squared_cross_mark:`);
        message.reply("Bye bye. **Stopping...**")
        bot.destroy();
    }
}