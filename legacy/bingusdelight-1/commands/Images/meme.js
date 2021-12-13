const https = require("https");
const { MessageEmbed } = require("discord.js");
const url = "https://www.reddit.com/r/memes/hot/.json?limit=100";
const talkedRecently = new Set();
module.exports = {
    config: {
        name: `meme`,
        aliases: [`funni`, `r/memes`]
    },
    run: async (bot, message, args) => {
    try {
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("This command is on cooldown for 5 seconds!");
    } else {
        https.get(url, (result) => {
            var body = "";
            result.on("data", (chunk) => {
              body += chunk;
            });
      
            result
              .on("end", () => {
                var response = JSON.parse(body);
                var index =
                  response.data.children[Math.floor(Math.random() * 99) + 1].data;
      
                if (index.post_hint !== "image") {
                  var text = index.selftext;
                  const textembed = new MessageEmbed()
                    .setTitle(subRedditName)
                    .setColor(0xf0a856)
                    .setDescription(`[${title}]\n\n${text}`)
                    .setURL(`https://reddit.com/${subRedditName}`)
                    .setFooter(`meme 2021`)
      
                  message.channel.send(textembed)
                }
      
                var image = index.preview.images[0].source.url.replace("&amp;", "&");
                var title = index.title;
                var link = "https://reddit.com" + index.permalink;
                var subRedditName = index.subreddit_name_prefixed;
      
                if (index.post_hint !== "image") {
                  const textembed = new MessageEmbed()
                    .setTitle(subRedditName)
                    .setColor(0xf0a856)
                    .setDescription(`[${title}]\n\n${text}`)
                    .setURL(`https://reddit.com/${subRedditName}`)
                    .setFooter(`meme 2021`)
      
                  message.channel.send(textembed)
                }
                const imageembed = new MessageEmbed()
                  .setTitle(subRedditName)
                  .setImage(image)
                  .setColor(0xf0a856)
                  .setDescription(`${title}`)
                  .setURL(`https://reddit.com/${subRedditName}`)
                  .setFooter(`meme 2021`)
                message.channel.send(imageembed)
              })
              .on("error", console.error);
          });

        talkedRecently.add(message.author.id);
        setTimeout(() => {

          talkedRecently.delete(message.author.id);
            }, 500);
        }
            //error handler and listener
    } catch (err){
      message.channel.send("**Something went wrong!**\nThis issue will be recorded to the dev log!\n*Sorry for the inconvenience*")
       bot.channels.cache.get('806244020971634698').send(`${err.stack}`)
       console.log(err)

    }
    }
}