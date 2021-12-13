const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
module.exports = {
  config: {
      name: `sthought`,
      aliases: [`showerthoughts`]
  },
  run: async (bot, message, args) => {
    try {
      const {
        body
      } = await request
        .get("https://www.reddit.com/r/showerthoughts.json?sort=top&t=week")
        .query({
          limit: 800
        });
      const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
      if (!allowed.length) return message.channel.send(`Error encountered`);
      const randomnumber = Math.floor(Math.random() * allowed.length);
      const embed = new MessageEmbed()
        .setColor(14839836)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .setTimestamp()
        .setFooter("Yttrius 2020 | Reddit");
      message.channel.send(embed);
    } catch (err) {
      console.log(err)
      return message.channel.send(`Error met: \`${err.message}\`.`);
    }
  }
}