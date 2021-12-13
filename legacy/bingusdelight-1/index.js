const { Client, Collection, Discord } = require('discord.js');
const bot = new Client();

const { prefix } = require(`./config.json`);
const keep_alive = require(`./keep_alive.js`);
const superagent = require('superagent');
const { MessageEmbed } = require('discord.js');
[`aliases`, `commands`].forEach(x => bot[x] = new Collection());
["command", "events"].forEach(x => require(`./handlers/${x}`)(bot));
bot.setMaxListeners(25);
bot.on('message', message => {
  if (message.content == `<@${bot.user.id}>` || message.content == `<@!${bot.user.id}>`)
  return message.channel.send(`My prefix is ${prefix}`);

  if(message.content == `${prefix}highlight`) 
  {
    let rety = message.content.split(" ");
    if(!rety || rety == undefined)
    {
      message.channel.send("Invalid Characters")
    }
    message.channel.send("```" + rety + "```");
  }
  if(message.content.includes(`senpai`) && message.guild.id == '792194075599568926')
  {
    message.delete();
    message.reply('bad word, thats a no no :|').then(m => {
      m.delete({ timeout: 5000});
    })
  }
})


const token = process.env.token;
bot.login(token);