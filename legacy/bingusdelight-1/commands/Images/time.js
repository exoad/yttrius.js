const fetch = require('node-fetch');
const querystring = require('querystring');
const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
module.exports = {
  config: {
    name: `time`,
    category: '',
    description: '',
    aliases: [`whattimeisit`, `timeat`, `timein`]
  },
  run: async (bot, message, args) => {
    try {
      const usertime = message.content.split(' ');
      if (!usertime[1]) return message.channel.send('Please specify a location!\n> **Example:** `'+config.prefix+'time europe london`\n> **Usage:** `'+config.prefix+'time {timezone} {region}`')

      if(!usertime[2] || usertime[2] == undefined)
      {
              const { abbreviation } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}`).then(response => response.json());
      const { datetime } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}`).then(response => response.json());
      const { day_of_week } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}`).then(response => response.json());
      const { day_of_year } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}`).then(response => response.json());
      const { dst } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}`).then(response => response.json());
      const { utc_offset } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}`).then(response => response.json());
      const { week_number } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}`).then(response => response.json());
      const { timezone } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}`).then(response => response.json());
      const { unixtime } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}`).then(response => response.json());

      //setting up the final message
      const embed = new MessageEmbed()
        .setTitle('Time Information for '+usertime[1], true)
        .setColor("RANDOM")
        .setDescription('Currently displaying info for location: '+usertime[1]+`\nRequested by ${message.author.tag}`, true)
        .addField(":capital_abcd: Location Abbreviation:", `${abbreviation}`, true)
        .addField(":calendar_spiral: Current Date: ", `${datetime}`, true)
        .addField(`:1234: Day Of the Week:`, `${day_of_week}`, true)
        .addField(":1234: Day of year", `${day_of_year}`, true)
        .addField(":sunny: Day Light Saving:", `${dst}`, true)
        .addField(":globe_with_meridians: UTC-Offset:", `${utc_offset}`, true)
        .addField(":1234: Week Number:", `${week_number}`, true)
        .addField(":map: Timezone:", `${timezone}`, true)
        .addField(":clock1230: Unix Time:", `${unixtime}`, true)
      message.channel.send({ embed })
      } else {
      const { abbreviation } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}/${usertime[2]}`).then(response => response.json());
      const { datetime } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}/${usertime[2]}`).then(response => response.json());
      const { day_of_week } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}/${usertime[2]}`).then(response => response.json());
      const { day_of_year } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}/${usertime[2]}`).then(response => response.json());
      const { dst } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}/${usertime[2]}`).then(response => response.json());
      const { utc_offset } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}/${usertime[2]}`).then(response => response.json());
      const { week_number } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}/${usertime[2]}`).then(response => response.json());
      const { timezone } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}/${usertime[2]}`).then(response => response.json());
      const { unixtime } = await fetch(`http://worldtimeapi.org/api/timezone/${usertime[1]}/${usertime[2]}`).then(response => response.json());

      //setting up the final message
      const embed = new MessageEmbed()
        .setTitle('Time Information for '+usertime[1], true)
        .setColor("RANDOM")
        .setDescription('Currently displaying info for location: '+usertime[1]+`\nRequested by ${message.author.tag}`, true)
        .addField(":capital_abcd: Location Abbreviation:", `${abbreviation}`, true)
        .addField(":calendar_spiral: Current Date: ", `${datetime}`, true)
        .addField(`:1234: Day Of the Week:`, `${day_of_week}`, true)
        .addField(":1234: Day of year", `${day_of_year}`, true)
        .addField(":sunny: Day Light Saving:", `${dst}`, true)
        .addField(":globe_with_meridians: UTC-Offset:", `${utc_offset}`, true)
        .addField(":1234: Week Number:", `${week_number}`, true)
        .addField(":map: Timezone:", `${timezone}`, true)
        .addField(":clock1230: Unix Time:", `${unixtime}`, true)
      message.channel.send({ embed })
      }
    } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred\nPlease try again later.`);
    }
  }
}