const { MessageEmbed, MessageAttachment } = require("discord.js");
const { Database } = require("secure-db");
const fetch = require("superagent");
const resource = require("../../../configs/resource.json");
const config = require("../../../configs/token.json");
const colors = require("../../../configs/colors.json");
const moment = require("moment");
const fs = require("fs");
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
      const user = await db.get(`${message.author.id}`);
      if (user === null || user == undefined) {
        const embed = new MessageEmbed()
          // @ts-ignore
          .setColor(colors.error)
          .setTitle("Hmmm you need to register first!")
          .setDescription(
            "Because this bot uses a lot of data, it is necessary to keep a good record of our users and this means some commands will need you to be registered. Fear not, registration is completely free! Do so by using the command `" +
              config.prefix +
              "register`!"
          );
        return message.channel.send({ embeds: [embed] });
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
      async function fetchAwards(team_id) {
        const response6 = await fetch
          .get(`https://www.robotevents.com/api/v2/teams/${team_id}/awards`)
          .set("Authorization", `Bearer ${config.robot_token}`);
        const awards = response6.body.data;
        let awards_list = "";
        for (let i = 0; i < awards.length; i++) {
          awards_list += `Event: ${awards[i].event.name} \n`;
          awards_list += `Award: ${awards[i].title} \n`;
          awards_list += `Qualifications: ${
            awards[i].qualifications ? "none" : awards[i].qualifications
          } \n`;
          awards_list += "--------------------\n";
        }
        const time = Date.now();
        fs.writeFile(
          `${__dirname}/../../../cache/${time}_awards.txt`,
          awards_list,
          function (err) {
            if (err) {
              return console.log(err);
            }
          }
        );
        // attach to a message as a file not attachment
        const attachment = new MessageAttachment(
          `${__dirname}/../../../cache/${time}_awards.txt`
        );
        message.channel.send({ files: [attachment] });
      }

      async function fetchSkills(team_id) {
        // fetch each individual skill competition and append it to a txt file
        const response6 = await fetch
          .get(`https://www.robotevents.com/api/v2/teams/${team_id}/skills`)
          .set("Authorization", `Bearer ${config.robot_token}`);
        const skills = response6.body.data;
        let skill_list = "";
        for (let i = 0; i < skills.length; i++) {
          skill_list += `==Event: ${skills[i].event.name}== \n`;
          skill_list += "--Season: " + skills[i].season.name + "--\n";
          skill_list += `Type: ${skills[i].type} \n`;
          skill_list += "Rank: " + skills[i].rank + "\n";
          skill_list += "Score: " + skills[i].score + "\n";
          skill_list += "Attempts: " + skills[i].attempts + "\n";
          skill_list += "--------------------\n";
        }
        // write skill_list to a txt file into the default cache folder and then fetch it and send it as a messageattachment

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
        message.channel.send({ files: [attachment] });

        // send a message of "hello" with the attachment
        //message.channel.send("Hello", attachment);
      }

      async function fetchStats(team_id) {
        const response6 = await fetch
          .get(`https://www.robotevents.com/api/v2/teams/${team_id}/rankings`)
          .set("Authorization", `Bearer ${config.robot_token}`)
          .set("Accept", "application/json");
        let rankings = response6.body.data;
        var i = 0;
        var avg_rank = 0,
          rk_sum = 0;
        var winrate = 0;
        var oppurtunities = 0,
          wins = 0,
          loss = 0,
          ties = 0;
        for (var rank of response6.body.data) {
          rk_sum += rank.rank;
          oppurtunities += rank.wins + rank.losses + rank.ties;
          wins += rank.wins;
          loss += rank.losses;
          ties += rank.ties;
          i++;
        }
        avg_rank = rk_sum / i;
        winrate = wins / oppurtunities;

        const embed = new MessageEmbed()
          .setTitle("Team Stats for " + response6.body.data[0].team.name)
          .setDescription("Only Qualification matches are included")
          .addField("Total Comps", `${i}`, true)
          .addField("Average Rank", `${avg_rank == 0 || avg_rank == undefined ? "NONE" : Math.floor(avg_rank)}`, true)
          .addField("Winrate", `${winrate == 0 || winrate == undefined ? "0" : Math.floor(winrate * 100)}%`, true)
          .addField("Wins", `${wins == undefined ? "error" : wins}`, true)
          .addField("Losses", `${loss == undefined ? "error" : loss}`, true)
          .addField("Ties", `${ties == undefined ? "error" : ties}`, true)
          .setColor("RANDOM")

        message.channel.send({ embeds: [embed] });
      }

      async function fetchEvents(team_id) {
        const response6 = await fetch
          .get(`https://www.robotevents.com/api/v2/teams/${team_id}/events`)
          .set("Authorization", `Bearer ${config.robot_token}`);
        let events = response6.body.data;
        let events_list = "",
          x = 0,
          y = 0,
          others = ``;
        for (var i = 0; i < events.length; i++) {
          if (!events[i].name.includes("Cancel")) x++;
          y++;
          events_list += "==Event: " + events[i].name + "==\n";
          events_list += "--Season: " + events[i].season.name + "--\n";
          events_list +=
            "Location: " +
            events[i].location.venue +
            " @ " +
            events[i].location.address_1 +
            " " +
            events[i].location.country +
            "\n";
          events_list += "Start: " + events[i].start.substring(0, 10) + "\n";
          events_list += "--------------------\n";
        }
        const time = Date.now();
        others = "Total Attended Events: " + x + "\nTotal Events: " + y;
        fs.writeFile(
          `${__dirname}/../../../cache/${time}_events_teams.txt`,
          others + events_list,
          function (err) {
            if (err) {
              return console.log(err);
            }
          }
        );
        // attach to a message as a file not attachment
        const attachment = new MessageAttachment(
          `${__dirname}/../../../cache/${time}_events_teams.txt`
        );
        message.channel.send({ files: [attachment] });
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
            `\`\`\`skills, awards, stats\`\`\`\nNote if you do not provide an option it will default to fetching plain information on a team`
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
      if (response2.status == 404 || response2.status == 400) {
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
          .addField(
            "Robot Name",
            `[ ${response2.body.data[0].robot_name} ]`,
            true
          )
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
      } else if (option === "awards") {
        // fetch awards
        const team_id = response2.body.data[0].id;
        fetchAwards(team_id);
      } else if (option === "events") {
        const team_id = response2.body.data[0].id;
        fetchEvents(team_id);
      } else if (option === "stats") {
        const team_id = response2.body.data[0].id;
        fetchStats(team_id);
      }
    } catch (err) {
      console.error(err);
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

      const fs = require("fs");

      fs.writeFile(
        `${__dirname}/../../../logs/${Date.now()}_error.log`,
        err + "\n",
        function (err2) {
          if (err2) {
            return console.log(err2);
          }
        }
      );

      message.channel.send({ embeds: [embed] });
    }
  },
};
