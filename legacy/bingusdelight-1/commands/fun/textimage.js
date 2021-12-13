//https://some-random-api.ml/canvas/triggered?avatar=
const Discord = module.require("discord.js");
module.exports = {
  config: {
    name: `triggered`,
    aliases: [`trigger`]
  },
  run: async (bot, message, args) => {
    try {
    let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 }) : message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });

    message.channel.send({ files: [{ attachment: `https://some-random-api.ml/canvas/triggered?avatar=${avatar}`, name: "triggered.gif" }] })
    } catch(error){
      message.channel.send("Internal Error Met!")
    }
  }
}