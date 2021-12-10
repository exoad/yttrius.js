// @ts-ignore
const { Discord, MessageEmbed } = require("discord.js");
const config = require("../../../configs/token.json");
module.exports = {
    config: {
        name: `eval`,
        aliases: [`jseval`],
    },
    // @ts-ignore
    run: async(bot, message, args) => {
        if (message.author.id !== config.owner_id)
            return message.reply("Credentials Mismatch | Access Denied");
        try {
            // var code should be everything after the first space and the initial command
            let code = args.join(" ");
            message.channel.send(`\`\`\`js\n${code}\n\`\`\``);
            // eval code
            let evaled = eval(code);
            message.channel.send(evaled);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            const embed = new MessageEmbed()
                .setColor(0x1fd66e)
                .addField(":inbox_tray: Through: ", `\`\`\`js\n${code}\`\`\``)
                .addField(
                    ":inbox_tray: Throughout: ",
                    `\`\`\`js\n${clean(evaled)}\n\`\`\``
                );
            message.channel.send({ embeds :[embed] });
        } catch (err) {
            const embed = new MessageEmbed()
                .setColor(0x1fd66e)
                .addField(":outbox_tray: In: ", `\`\`\`js\n${code}\`\`\``)
                .addField(":outbox_tray: Out: ", `\`\`\`js\n${clean(err)}\`\`\``);
            message.channel.send({ embeds : [embed] });
        }

        function clean(text) {
            if (typeof text === "string")
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
    },
};
