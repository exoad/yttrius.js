const { MessageEmbed } = require("discord.js");
const config = require("../../../../configs/token.json");
const chnl = require("../../../../configs/chnl.json");
const resource = require("../../../../configs/resource.json");
const superagent = require("superagent");
const moment = require("moment");
module.exports = {
  config: {
    name: `iss`,
    category: "",
    description: "",
    aliases: [`internationalspacestation`, `spacestation`],
  },
  run: async (bot, message, args) => {
    try {
      const { body } = await superagent.get(
        "https://api.wheretheiss.at/v1/satellites/25544"
      );
      const embed = new MessageEmbed()
        .setTitle("International Space Station")
        .setDescription("Here you will find info regarding the ISS")
        .addField("Latitude", body.latitude)
        .addField("Longitude", body.longitude)
        .addField("Altitude", body.altitude)
        .addField("Velocity", body.velocity)
        .addField("Solar Latitude", body.solar_lat)
        .addField("Solar Longitude", body.solar_lon)
        .setFooter("All units regarding distance is using Kilometers")
        .setThumbnail(resource.iss);

      message.channel.send({ embeds: [embed] });
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

      message.channel.send({ embeds: [embed] }).then((m) => {
        m.delete({ timeout: 5000 });
      });
    }
  },
};
