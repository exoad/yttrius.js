module.exports = {
    config: {
        name: `kill`,
        aliases: [``]
    },
    run: async (bot, message, args) => {
       let rety = message.content.split(" ").slice(1);
       message.reply(`:knife: I have successfully killed: ${rety}`)
    }
}