const { MessageEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const fetch = require('node-fetch');
module.exports = {
  config: {
      name: `youtube`,
      category: '',
      description: '',
      aliases: [`ytsearch`, `youtubesearch`, `yt`]
  },
  run: async (bot, message, args) => {
    try {
      const search = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          args.slice(0).join(" ")
        )}&order=relevance&type=video&key=${process.env.GOOGLE_KEY}`
      ).then((response) => response.json());
      if(args.slice(0).join(" ") == "nigger" || args.slice(0).join(" ") == "shit" || args.slice(0).join(" ") == "nickghur" ||args.slice(0).join(" ") == "shithead" || args.slice(0).join(" ") == "fuck" || args.slice(0).join(" ") == "nickgur" || args.slice(0).join(" ") == "fucker" || args.slice(0).join(" ") == "shitter" || args.slice(0).join(" ") == "porn" || args.slice(0).join(" ") == "nsfw" || args.slice(0).join(" ") == "NSFW" || args.slice(0).join(" ") == "hentai" || args.slice(0).join(" ") == "HENTAI" || args.slice(0).join(" ") == "furry porn" || args.slice(0).join(" ") == "nick ghur" || args.slice(0).join(" ") == "sex" || args.slice(0).join(" ") == "pornography" || args.slice(0).join(" ") == "porno" || args.slice(0).join(" ") == "milf" || args.slice(0).join(" ") == "rape" || args.slice(0).join(" ") == "dipshit" || args.slice(0).join(" ") == "cum") return message.channel.send("No.")
      if (search.error) {
        if (search.error.message) {
          const Embed = new MessageEmbed()
            .setTitle(`Error Code: ${search.error.code}!`)
            .setDescription(`\`${search.error.message}\``)
            .setColor("RANDOM");
          console.log(`${search.error.code}:\n${search.error.message}`);
          bot.channels.cache.get('806244020971634698').send(`${search.error}`)
          return message.channel.send(Embed);
        }
      }

      const Embed = new MessageEmbed()
        .setTitle(`Search Results:`)
        .setTimestamp()
        .setDescription('**Requested by:** ' +message.author.tag)
        .setColor("RANDOM")
        .setThumbnail('https://www.pngkey.com/png/full/3-32240_logo-youtube-png-transparent-background-youtube-icon.png')
        .addFields(
          {
            name: "Author",
            value:  search.items.map((v) => v.snippet.channelTitle),
            inline: true,
          },
          {
            name: "Title",
            value: search.items.map((v) => v.snippet.title),
            inline: true,
          }
        )
        .setFooter("Type the column to further that search");
      message.channel.send(Embed).then((optionsMessage) => {
        const messageAuthor = message.author;
        function AwaitResponse() {
          if (timeUp) {
            return;
          } else {
            message.client.once("message", (message) => {
              if (message.author != messageAuthor) return AwaitResponse();

              const matches = message.content.match(/(\d+)/);
              if (matches) {
                if (matches[0] <= search.items.length) {
                  message.channel
                    .send(
                      `\`https://www.youtube.com/watch?v=${
                        search.items[matches[0] - 1].videoId
                      }\``
                    )
                } else return AwaitResponse();
              } else return AwaitResponse();
            });
          }
        }
        AwaitResponse();
      });

    let timeUp = false;
    setTimeout(function () {
      timeUp = true;
    }, 60000);
  } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred!\nThis error has been marked in the devlogs and will be reviewed soon\n*Sorry for the inconvenience.`);
      bot.channels.cache.get('806245388095979560').send(`${err.stack}`)
  }
  }
}

