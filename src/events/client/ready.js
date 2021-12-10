const { Discord, MessageEmbed } = require("discord.js");
const ready = require("../../../configs/ready.json");
const config = require("../../../configs/token.json");
const si = require("systeminformation");
const prescence = [
  `${config.count} servers`,
  `TV`,
  `something`
]

const second = [
  `${config.prefix}help`,
  `${config.prefix}invite`,
  `${config.prefix}support`,
  `${config.prefix}register`,
  `${config.prefix}botinfo`
]
module.exports = async (bot) => {
  console.log(`${bot.user.tag} is now online.`);
  console.log(
    `Platformo: ${(await si.osInfo()).platform}\nSystem: ${
      (await si.osInfo()).distro
    }`
  );
    setInterval(() => {
      // generate random number between 1 and list length.
      const randomIndex = Math.floor(
        Math.random() * (prescence.length - 1) + 1
      );
      const newActivity = prescence[randomIndex] + " | " + second[randomIndex];

      bot.user.setActivity(newActivity);
    }, 10000);
};
