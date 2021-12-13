const { MessageEmbed } = require('discord.js'); 
module.exports = {
    config: {
        name: `invite`,
        aliases: [`in`]
    },
    run: async (bot, message, args) => {
        const embed = new MessageEmbed()
				.setTitle("Invite Yttrius to your own servers!")
				.addField("Invite Link #1 (Administrator)", "[Administrator Invite Link](https://discord.com/api/oauth2/authorize?client_id=792193904614703114&permissions=8&scope=bot)")
				.addField("Invite Link #2 (Primary Permissions)", "[Primary Invite Link](https://discord.com/api/oauth2/authorize?client_id=792193904614703114&permissions=1275591751&scope=bot)")
				.addField("Invite Link #3 (Minimal Permissions NOT RECOMMENDED)", "[Minimal Permissions](https://discord.com/api/oauth2/authorize?client_id=792193904614703114&permissions=201714759&scope=bot)")
        message.reply({embed});	
            //error handler and listener
    const token = process.env.token;
    bot.on("error", () => { bot.login(token) });
    }
}