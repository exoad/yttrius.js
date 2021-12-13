module.exports = {
    config: {
        name: `wtu`,
        aliases: [``]
    },
    run: async (bot, message, args) => {
      if(message.author.id !== "709776016314204283") return message.reply(`:negative_squared_cross_mark: Access Denied :negative_squared_cross_mark:`);
    var invites = []; // starting array
    message.client.guilds.cache.forEach(async (guild) => { // iterate loop on each guild bot is in

      // get the first channel that appears from that discord, because
      // `.createInvite()` is a method for a channel, not a guild.
      const channel = guild.channels.cache 
        .filter((channel) => channel.type === 'text')
        .first();
      if (!channel || guild.member(bot.user).hasPermission('CREATE_INSTANT_INVITE')) return;
      await channel
        .createInvite({ maxAge: 0, maxUses: 0 })
        .then(async (invite) => {
          invites.push(`${guild.name} - ${invite.url}`); // push invite link and guild name to array
        })
        .catch((error) => console.log(error));
      console.log(invites);
    })
    }
  }