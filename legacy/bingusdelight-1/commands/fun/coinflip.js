module.exports = {
    config: {
        name: `coinflip`,
        aliases: [`flip`]
    },
    run: async (bot, message, args) => {
        function doRandHT() {
            var rand = ['<:coin_head:792538478827012127> You got **Heads**','<:coin_tail:792538135916707840> You got **tails**'];
      
          return rand[Math.floor(Math.random()*rand.length)];
          }
      
          const embed = {
          "description": doRandHT(),
          "color": 7584788,
          };
          message.channel.send({ embed });
              //error handler and listener
    const token = process.env.token;
    bot.on("error", () => { bot.login(token) });
    }
}