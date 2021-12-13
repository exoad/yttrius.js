const fs = require('fs')
module.exports = {
    config: {
        name: `ir`,
        aliases: [``]
    },
    run: async (bot, message, args) => {
      try {
        if(message.author.id !== "709776016314204283") return message.reply(`:negative_squared_cross_mark: Access Denied :negative_squared_cross_mark:`);
        code = fs.readFileSync(`commands/${args[1]}/${args[0]}.${args[2]}`).toString();
        message.channel.send("Here is your file: ", {files:[`./commands/${args[1]}/${args[0]}.${args[2]}`]})
      } catch(error) {
        message.channel.send("I didn't find anything");
        console.log(error.stack)
      }
    }
}
