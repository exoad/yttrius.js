const { MessageEmbed, MessageAttachment } = require("discord.js");
const { Database } = require("secure-db");
const fetch = require("superagent");
const resource = require("../../../configs/resource.json");
const config = require("../../../configs/token.json");
const colors = require("../../../configs/colors.json");
module.exports = {
  config: {
    name: `team_search`,
    category: "",
    description: "",
    aliases: [``],
  },
  run: async (bot, message, args) => {
    try {
      const db = new Database("account");
      const user = await db.get(`${message.author.id}.team`);
      if (user === null || user == undefined) {
        const embed = new MessageEmbed()
          // @ts-ignore
          .setColor(colors.error)
          .setTitle("Hmmm you need to register first!")
          .setDescription("Because this bot uses a lot of data, it is necessary to keep a good record of our users and this means some commands will need you to be registered. Fear not, registration is completely free! Do so by using the command `"+config.prefix+"register`!");
        return message.channel.send({ embeds : [embed] });
      }
      async function error() {
        const embed2 = new MessageEmbed()
          // @ts-ignore
          .setColor(colors.error)
          .setTitle("Team Not Found")
          .setDescription(
            `The team you searched for was not found. Please try again.`
          );

        message.channel.send({ embeds: [embed2] });
      }
      async function fetchSkills(team_id) {
        // fetch each individual skill competition and append it to a txt file
        const response6 = await fetch
          .get(`https://www.robotevents.com/api/v2/teams/${team_id}/skills`)
          .set("Authorization", `Bearer ${config.robot_token}`);
        const skills = response6.body.data;
        let skill_list = "";
        for (let i = 0; i < skills.length; i++) {
          skill_list += `Event: ${skills[i].event.name} \n`;
          skill_list += "Rank: " + skills[i].rank + "\n";
          skill_list += "Score: " + skills[i].score + "\n";
          skill_list += "Attempts: " + skills[i].attempts + "\n";
          skill_list += "--------------------\n";
        }
        // write skill_list to a txt file into the default cache folder and then fetch it and send it as a messageattachment
        const fs = require("fs");
        // unix timestamp
        const time = Date.now();
        fs.writeFile(
          `${__dirname}/../../../cache/${time}_skills.txt`,
          skill_list,
          function (err) {
            if (err) {
              return console.log(err);
            }
          }
        );
        // attach to a message as a file not attachment
        const attachment = new MessageAttachment(
          `${__dirname}/../../../cache/${time}_skills.txt`
        );
        message.channel.send({files : [attachment]});

        // send a message of "hello" with the attachment
        //message.channel.send("Hello", attachment);
      }
      let team = args[0];
      let option = args[1];
      if (!team || team == undefined) {
        const embed = new MessageEmbed()
          // @ts-ignore
          .setColor(colors.error)
          .setTitle("Whoops, looks like you are missing some arguments!")
          .setDescription(
            "This command requires some parameters to work! Look below for more information"
          )
          .setThumbnail(resource.aw_snap)
          .addField(
            "Usage",
            `\`${config.prefix}team_search <team name> <option>\``
          )
          .addField(
            "Options",
            `\`\`\`skills, awards\`\`\`\nNote if you do not provide an option it will default to fetching plain information on a team`
          )
          .addField(
            "Example Usage",
            "`" + config.prefix + "team_search 1569A skills`"
          );
        return message.channel.send({ embeds: [embed] });
      }
      const response2 = await fetch
        .get(
          `https://www.robotevents.com/api/v2/teams?number%5B%5D=${team}&program%5B%5D=1&myTeams=false`
        )
        .set("Authorization", `Bearer ${config.robot_token}`)
        .set("accept", "application/json");
      if (response2.status !== 200) {
        error();
      }
      if (!option || option == undefined) {
        const embed = new MessageEmbed()
          // @ts-ignore
          .setColor(colors.success)
          .setTitle(`Results for team: ${team}`)
          .setDescription(
            "Here are the results I found for this team.\n*Notice any anomalies? Contact my develop!*"
          )

          .addField("Team ID", `${response2.body.data[0].id}`, true)
          .addField("Team Name", `${response2.body.data[0].team_name}`, true)
          .addField("Robot Name", `${response2.body.data[0].robot_name}`, true)
          .addField(
            "Organization",
            `${response2.body.data[0].organization}`,
            true
          )
          .addField(
            "Location",
            `${response2.body.data[0].location.city}, ${response2.body.data[0].location.region}, ${response2.body.data[0].location.country}`,
            true
          )
          .addField("Program", response2.body.data[0].program.name, true)
          .setFooter("Check the command for more options!");
        message.channel.send({ embeds: [embed] });
      } else if (option === "skills") {
        // fetch skills
        const team_id = response2.body.data[0].id;
        fetchSkills(team_id);
      }
    } catch (err) {
      const embed = new MessageEmbed()
        .setTitle("Whoops, looks like something went wrong!")
        .setThumbnail(resource.aw_snap)
        .setDescription(
          "Use `" +
            config.prefix +
            "help` for a list of avaliable commands or use `" +
            config.prefix +
            "support` to join the support server!"
        )
        .setFooter("Still facing issues? Join the support server!");
      // send this embed then delete it after 4 seconds
      message.channel.send({ embeds: [embed] }).then((msg) => {
        msg.delete({ timeout: 4000 });
      });
    }
  },
};
