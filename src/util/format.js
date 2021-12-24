const { MessageEmbed } = require("discord.js");

export function makeEmbed(content, message, lang) {
  let embed = new MessageEmbed()
    .setTitle("Formatted Code")
    .setDescription("```" + lang + "\n" + content + "```")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setFooter("Code Formatted is done by a real human ;)");
  message.channel.send({ embeds: [embed] });
}
