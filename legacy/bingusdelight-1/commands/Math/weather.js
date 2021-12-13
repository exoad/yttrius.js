const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');
module.exports = {
  config: {
      name: `weather`,
      category: '',
      description: '',
      aliases: [``]
  },
  run: async (bot, message, args) => {
    try {
      let args = message.content.split(/[ ]+/);
      weather.find({ search: args.slice(1).join(' '), degreeType: 'C' }, function (err, result) { 
          if (err) console.log('Weather CMD error: ' + err);
          if (result === undefined || result.length === 0) {
              message.channel.send('Error! | Invalid location!');
              return;
          }
  
          var current = result[0].current;
          var location = result[0].location;
  
          let embed = new MessageEmbed()
          .setAuthor(`${current.observationpoint}`, 'https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Weather-512.png')
          .setColor('#f07b37')
          .addField(':clock1: Timezone: ', `UTC${location.timezone}:00`, true)
          .addField(':high_brightness: Weather: ', `${current.skytext}`, true)
          .addField(':thermometer: Temperature Type: ', location.degreetype, true)
          .addField(':thermometer: Temperature: ', `${current.temperature} Degrees`, true)
          .addField(':thermometer: Temperature Feels like: ', `${current.feelslike} Degrees`, true)
          .addField('<:yttrius_tempwind:804770586035224636> Wind Speed: ', current.winddisplay, true)
          .addField(':droplet: Humidity Levels: ', `${current.humidity}%`, true)
          .setFooter('YttriusWeather');
          message.channel.send({ embed });  
      })
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred\nPlease try again later.`);
  }
  }
}