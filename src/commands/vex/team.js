const { MessageEmbed } = require("discord.js");
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
      if (!option || option == undefined) {
        const response2 = await fetch
          .get(
            `https://www.robotevents.com/api/v2/teams?number%5B%5D=${team}&program%5B%5D=1&myTeams=false`
          )
          .set("Authorization", `Bearer ${config.robot_token}`)
          .set("accept", "application/json");
        if (response2.status !== 200) {
          const embed2 = new MessageEmbed()
            // @ts-ignore
            .setColor(colors.error)
            .setTitle("Team Not Found")
            .setDescription(
              `The team you searched for was not found. Please try again.`
            );

          return message.channel.send({ embeds: [embed2] });
        }
        const embed = new MessageEmbed()
          // @ts-ignore
          .setColor(colors.success)
          .setTitle(`Results for team: ${team}`)
          .setDescription(
            "Here are the results I found for this team.\n*Notice any anomalies? Contact my develop!*"
          )
          .addField("Team ID", response2.body.data[0].id, true)
          .addField("Team Name", response2.body.data[0].team_name, true)
          .addField("Robot Name", response2.body.data[0].robot_name, true)
          .addField("Organization", response2.body.data[0].organization, true)
          .addField(
            "Location",
            `${response2.body.data[0].location.city}, ${response2.body.data[0].location.state}, ${response2.body.data[0].location.country}`,
            true
          )
          .addField("Program", response2.body.data[0].program.name, true)
          .setFooter("Check the command for more options!");
        message.channel.send({ embeds: [embed] });
      } else if (option == "skills") {
        message.channel.send("To be implemented");
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
