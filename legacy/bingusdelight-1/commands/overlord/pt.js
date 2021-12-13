const fs = require("fs");

module.exports = {
    config: {
        name: `pt`,
        aliases: [``]
    },
    run: async (bot, message, args) => {
      if(message.author.id !== "709776016314204283") return message.reply(`:negative_squared_cross_mark: Access Denied :negative_squared_cross_mark:`);
        const client = message.client;
        let code;
        try {
          code = fs.readFileSync(`commands/${args[1]}/${args[0]}.js`).toString();
        } catch (error) {
          return message.channel.send(
            `Something went wrong`
          );
        }
    
        try {
          if (args[0]) {
            const options = {
              method: "POST",
              body: code,
              headers: {
                "Content-Type": "application/json",
              },
            };
            message.channel.send(
              `:white_check_mark: Code: ${
                args[0]
              } command:\n\`\`\`js\n${code.substr(0, 1900)}\`\`\``
            );
          }
        } catch (e) {
          return message.channel.send(
            "Internal Error Met"
          );
        }
    },
};