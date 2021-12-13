const fs = require('fs');
const {
  promisify
} = require('util');
const readdir = promisify(fs.readdir);
const Discord = require("discord.js");
const bot = new Discord.Client();
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    config: {
        name: `command`,
        description: '???',
        category: '???',
        aliases: [`commands`, `cmd`, `find`, `cmdsearch`, `cmds`]
    },
    
    run: async (bot, message, args) => {

        const command = message.content.split(' '); 
        if(command[1] == undefined){
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .addField("Usage:", "``"+config.prefix+"command {command_name}``")
                .addField("Description:", "Get indepth information on commands. Use ``"+config.prefix+"help`` for a list of commands");
            message.channel.send(embed);    
        }

        if(command){
          if(command[1] != undefined){ 
              fs.readFile(__dirname + '/commands.json', (err, dataJson) => {  
                  if (err) throw err;
                  let helpMe = JSON.parse(dataJson);
                  let commandName = command[1];
      
                  try{
                      const embed = new MessageEmbed()
                          .setColor("RANDOM")
                          .addField(`Command Name: ${helpMe[commandName].name}`,`Category: ${helpMe[commandName].group}\n`+`Description: ${helpMe[commandName].description}\n`+`Usage: ${helpMe[commandName].usage}`);
                      message.channel.send(embed);    
                  }
                  catch(err){
                      message.channel.send('There was an error!\n1. I could not find that command').catch();
                  }
              });
            }
        }
    }
}