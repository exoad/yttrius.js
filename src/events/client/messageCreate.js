const { prefix } = require("../../../configs/token.json");

module.exports = async (bot, message) => {
  if (
    message.author.bot ||
    message.channel.type === "dm" ||
    !message.content.startsWith(prefix)
  )
    return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  let commandfile =
    bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
  if (commandfile) commandfile.run(bot, message, args);
};
