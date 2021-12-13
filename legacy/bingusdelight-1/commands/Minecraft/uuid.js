const mojang = require('mojang-api');
const {discord, MessageEmbed} = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
module.exports = {
  config: {
      name: `uuid`,
      category: '',
      description: '',
      aliases: [``]
  },
  run: async (bot, message, args) => {
    try {
      var cmd = args[0];
      const { id } = await fetch('https://api.mojang.com/users/profiles/minecraft/'+cmd).then(response => response.json());
      const embed = new MessageEmbed()
      .setTitle('NickName to UUID')
      .setDescription('Converts a username to the UUID format')
      .addField('Username:', cmd)
      .addField('UUID:', id)
      .setThumbnail(`https://visage.surgeplay.com/head/${id}`)
      message.channel.send({ embed });

} catch (err) {
  console.log(err);
        message.channel.send("**Something went wrong!**\nCheck the following:\n> 1. The username you entered contained invalid Characters!\n> ```Invalid Characters: !?@#$%^&*(){};',./<>?:\"{}|=-+```\n> 2. Too short too long!\n> ```Usernames are set to be between 3-16 characters long!```\n> 3. It doesn't exist!\n> ```This username isn't registered or has been removed by Mojang!```\n> 4. It is not verified\n> ```It does exist, but verification from Mojang is either pending or suspended```\n> 5. API Error\n> ```Sometimes things happen```\n*Sorry for the inconvenience*");
}
  }
}
