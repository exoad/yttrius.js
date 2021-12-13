module.exports = {
    config: {
        name: `yn`,
        aliases: ['yesno', 'yesorno']
    },
    run: async (bot, message, args) => {
      try{
        function doRandHT() {
            var rand = ["Yes", "No", "Never", "Of course", "Right!", "Negative"]
            return rand[Math.floor(Math.random()*rand.length)];
        }
        const embed = {
          description: doRandHT(),
          color: 16777215,
          }
          message.reply({embed}).catch(error => message.channel.send("Something went wrong!\nError code: `6`"))
              //error handler and listener
      } catch(error) {
        message.channel.send("Something went wrong!")
        console.log(error)
        bot.channels.get('806244787191414824').message.channe.send(`${error}`)
      }
    }
}