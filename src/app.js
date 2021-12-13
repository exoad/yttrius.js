// @ts-ignore
const { Collection, MessageEmbed, Intents } = require("discord.js");
const Discord = require("discord.js");
const bot = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_MESSAGE_REACTIONS", "GUILD_INVITES"],
});

const express = require("express");
const app = express();
const port = 3000;
const keep_alive = require(`./keep_alive.js`);

bot.setMaxListeners(25);

// @ts-ignore
app.get("/", (req, res) => res.send("Online."));

app.listen(port, () => console.log(`On port ${port}`));

const { prefix } = require(`../configs/token.json`);
[`aliases`, `commands`].forEach((x) => (bot[x] = new Discord.Collection()));
["command", "events"].forEach((x) => require(`./handlers/${x}`)(bot));

// @ts-ignore
bot.on("messageCreate", async(message) => {
    if (
        message.content == `<@${bot.user.id}>` ||
        message.content == `<@!${bot.user.id}>`
    )
        return message.channel.send(`Hey there! My prefix is \`${prefix}\`!`);
    if (message.content == "rtu") {
        const embed = new MessageEmbed().setThumbnail(
            "http://www.thecolorapi.com/id?format=svg&hex=FF0000"
        );
        // @ts-ignore
        message.channel.send({embeds : [embed] });
    }
    if(message.content == prefix + "hi") {
        message.channel.send("Hello " + message.author.username);
    }
});

//user make
const { TOKEN } = require("../configs/token.json");
bot.login(`${TOKEN}`);