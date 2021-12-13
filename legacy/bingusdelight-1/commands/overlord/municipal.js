module.exports = {
    config: {
        name: `devhelp`,
        aliases: [`dev`]
    },
    run: async (bot, message, args) => {
        if(message.author.id !== "709776016314204283") return message.reply(`:white_squared_cross_mark: Access Denied :white_squared_cross_mark:`);
        const embed = {
            "title": "Developer Commands",
            "description": "MainStream developer commands will be found here! You will need special perks to run these commands!",
            "author": {
              "name": "Access Approved!",
              "icon_url": "https://media.discordapp.net/attachments/792552260479090698/794294221954875402/unknown.png"
            },
            "color": 10027247,
            "image": "https://media.discordapp.net/attachments/792552260479090698/794294221954875402/unknown.png",
            "fields": [
              {
                "name":"Developer Tools",
                "value":"`rtu, ptu, stop, ir, leave, wtu, retract`"
              }
            ]
          }
         message.channel.send({ embed })
        }
}