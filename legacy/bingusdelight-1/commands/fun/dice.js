module.exports = {
    config: {
        name: `dice`,
        aliases: [`rolldice`]
    },
    run: async (bot, message, args) => {
        function doRandHT() {
            var rand = ['<:roll_dice:792540309309358100> You rolled a :one:','<:roll_dice:792540309309358100> You rolled a :two:', '<:roll_dice:792540309309358100> You rolled a :three:', '<:roll_dice:792540309309358100> You rolled a :four:', '<:roll_dice:792540309309358100> You rolled a :five:', '<:roll_dice:792540309309358100> You rolled a :six:'];
      
          return rand[Math.floor(Math.random()*rand.length)];
          }
      
          const embed = {
          "description": doRandHT(),
          "color": 5592405,
          };
          message.channel.send({ embed });
              //error handler and listener
    const token = process.env.token;
    bot.on("error", () => { bot.login(token) });
    }
}