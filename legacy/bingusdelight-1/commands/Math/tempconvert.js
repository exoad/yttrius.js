const { MessageEmbed } = require('discord.js')

module.exports = {
  config: {
      name: `tempconvert`,
      aliases: [`temp`, `tconvert`]
  },
  run: async (bot, message, args, funcs) => {
		const embed = new MessageEmbed()
		.setTitle("Tempconvert Guide")
		.setDescription("Type a choice then enter the value to be convertted below. For furhter help, you can join my support discord: `https://discord.gg/QwNTcpyZbF`")
		.addField("Type 1", "Convert from `Celsius` to `Fahrenheit`")
		.addField("Type 2", "Convert from `Celsius` to `Kelvin`")
		.addField("Type 3", "Convert from `Fahrenheit` to `Celsius`")
		.addField("Type 4", "Convert from `Kelvin` to `Celsius`")
		.setFooter("Session terminate if no response is recieved")
    message.channel.send({ embed }).then(() => {
      message.channel.awaitMessages(m => m.author.id === message.author.id, {
          max: 1,
          errors: ["time"],
          time: 30000
      }).then((response) => {
          response = response.array()[0].content;
          if (response == "1") {
              message.channel.send(`**Enter the value (C->F)**`).then(() => {
                  message.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      errors: ["time"],
                      time: 30000
                  }).then((response) => {
                      response = parseInt(response.array()[0].content);
                      if (isNaN(response)) return message.channel.send(`<:error_yttrius:800784101342183504> Invalid Argument`);
                      const newtemp = 9 / 5 * response + 32;
                      message.channel.send(`${response}°C :arrow_forward: ${newtemp.toFixed(2)}°F`);
                  }).catch((e) => {
                      message.channel.send(`<:error_yttrius:800784101342183504> Session Terminated`);
                      console.log(`Error: ${e.message} in guild ${message.guild.name} command commandName`);
                  });
              });
          } else if (response == "2") {
              message.channel.send(`**Enter the value (C->K)**`).then(() => {
                  message.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      errors: ["time"],
                      time: 30000
                  }).then((response) => {
                      response = parseInt(response.array()[0].content);
                      if (isNaN(response)) return message.channel.send(`<:error_yttrius:800784101342183504> Invalid Argument`);
                      const newtemp = response + 274.15;
                      message.channel.send(`${response}°C :arrow_forward: ${newtemp.toFixed(2)}K`);
                  }).catch((e) => {
                      message.channel.send(`<:error_yttrius:800784101342183504> Session Terminated`);
                      console.log(`Error: ${e.message} in guild ${message.guild.name} command commandName`);
                  });
              });
          } else if (response == "3") {
              message.channel.send(`**Enter the value (F->C)**`).then(() => {
                  message.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      errors: ["time"],
                      time: 30000
                  }).then((response) => {
                      response = parseInt(response.array()[0].content);
                      if (isNaN(response)) return message.channel.send(`<:error_yttrius:800784101342183504> Invalid Argument`);
                      const newtemp = response - 17.77778;
                      message.channel.send(`${response}°F :arrow_forward: ${newtemp.toFixed(2)}°C`);
                  }).catch((e) => {
                      message.channel.send(`<:error_yttrius:800784101342183504> Session Terminated`);
                      console.log(`Error: ${e.message} in guild ${message.guild.name} command commandName`);
                  });
              });
          } else if (response == "4") {
              message.channel.send(`**Enter the value (K->C)**`).then(() => {
                  message.channel.awaitMessages(m => m.author.id === message.author.id, {
                      max: 1,
                      errors: ["time"],
                      time: 30000
                  }).then((response) => {
                      response = parseInt(response.array()[0].content);
                      if (isNaN(response)) return message.channel.send(`<:error_yttrius:800784101342183504> Invalid Argument`);
                      const newtemp = response - 272.15;
                      message.channel.send(`${response}K :arrow_forward: ${newtemp.toFixed(2)}°C`);
                  }).catch((e) => {
                      message.channel.send(`<:error_yttrius:800784101342183504> Session terminated`);
                      console.log(`Error: ${e.message} in guild ${message.guild.name} command commandName`);
                  });
              });
          }
      }).catch((e) => {
          message.channel.send(`<:error_yttrius:800784101342183504> Session terminated`);
          console.log(`Error: ${e.message} in guild ${message.guild.name} command commandName`);
      });
  });
  }
  }
