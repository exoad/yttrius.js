const talkedRecently = new Set();
const { MessageEmbed } = require('discord.js');
const Database = require("@replit/database");
module.exports = {
    config: {
        name: `rep`,
    },
    
    run: async (bot, message, args) => {
			let userD = message.mentions.users.first();
      const db = new Database();
			/**
       * Constants to check for inaccuracies
       */

      if(!args[0]) return message.channel.send("Whoops, did you forget how to use this command? No worries, the usage is `>>rep {list/add} {user}`");

      /**
       * Constant end
       * End value: 3
       */
  	if (talkedRecently.has(message.author.id) && args[0] == "add" || args[0] == "a") {
            message.reply("Hmmm, come back later. This command is on cooldown for sometime (12 hours)").then(m => {
							m.delete({ timeout: 5000 })
						});
    } else if(args[0] == "add" || args[0] == "a") {
			if(!userD) return message.channel.send("Please mention a valid user!\nReturned: `NaN`");
			if(userD.bot) return message.channel.send("Hmmm, looks like you can't rep a bot!");
			if(userD == message.author) return message.channel.send("Hmm, looks like you can't rep yourself!")
			db.get(userD.id).then(value => {
          let newVal = value + 1;
					var grammarCha = "rep";
          db.set(userD.id, newVal).then(() => {
						if(newVal > 1) {
							grammarCha = "reps";
						}
            message.channel.send(`>>> **${message.author.username}** has just given a rep to **${userD.username}**!!\nThey now have ${newVal} ${grammarCha}!`);
          })
        })

        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 43200000);
    } else if(args[0] == "list" || args[0] == "l") {
			var usero;
			if(!userD) { usero = message.author.id; userD = message.author;}
        db.get(usero).then(value => {
          if(value == null) {
            db.set(usero, 0).then(() => {
              db.get(usero).then(m => {
                const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Rep Count for: ${userD.username}`)
                .addField("Total Reps", m, true)
								.addField("Increment", "+1", true)

                message.channel.send({ embed })
              })
            })
          } else {
                const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Rep Count for: ${userD.username}`)
                .setDescription("Reps: "+value)
								.addField("Total Reps", value, true)
								.addField("Increment", "+1", true)
								

                message.channel.send({ embed })
          }
        })
      } else if (args[0] == "del" && message.author.id == "709776016314204283") {
        let userTo = args[1];
        if(!userTo || userTo == undefined) return message.channel.send("Invalid token => "+userTo);
        db.delete(userTo).then(() => {
          message.channel.send("Elimination complete");
        })
			} else if(args[0] == "la" && message.author.id == "709776016314204283"){
				let userTo = args[1];
				if(!userTo || userTo == undefined) return message.channel.send("Invalid token => "+userTo);
			db.list().then(keys => {
				message.channel.send("Keys" +keys);
			});
			} else {
				const embed = new MessageEmbed()
				.setTitle("Message Contained Invalid Parameters")
				.setDescription("Taken Parameters at `args[0]` returned undefined => `list/add`")

				message.channel.send({ embed })
		}
 	}
}