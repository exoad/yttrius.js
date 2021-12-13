const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const superagent = require('superagent');
module.exports = {
  config: {
    name: `calc`,
    description: '',
    category: '',
    aliases: [``]
  },
  run: async (bot, message, args) => {
    try {
      let userChoice = args[0];
      if(!userChoice || userChoice == undefined) {
        const embed = new MessageEmbed()
        .setTitle("How to use Calc Command")
        .setDescription("How to use the `calc` command\nIf you have further issues, you can join my discord server: `https://discord.gg/QwNTcpyZbF`")
        .addField("Alias", "`simplify, factor, derive, integrate, find0, cosine, sine, tan, arccos, arcsin, arctan, abs, log`")
        .addField("Example Usages", "`calc factor x^2+4x`")
        .addField("Notice", "This command is for applied and advanced math, and shall not be confused with the other math commands")
        .setFooter("Advanced Math | Remember no spaces or the calculation may be incorrect")

        message.channel.send({ embed })
      } else if(userChoice == "simplify") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`"); 
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/simplify/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Simplification")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "factor") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/factor/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Factorization")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "derive") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/derive/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Derive")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "integrate") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/integrate/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Integration")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "find0") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/zeroes/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Find zeroes")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "cosine") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/cos/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Cosine")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "sine") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/sin/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Sine")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "tan") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/tan/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Tangent")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "arccos") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/arccos/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Inverse Cosine")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "arcsin") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/arcsin/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Inverse Sine")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "arctan") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/arctan/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Inverse Tangent")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "abs") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/abs/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Absolute Value")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else if(userChoice == "log") {
        let userEquation = args[1];
        if(!userEquation) return message.channel.send("**Invalid Parameters**\nThis parameter requires type `expression`");
        
        const { body } = await superagent.get('https://newton.now.sh/api/v2/log/'+userEquation);
        const embed = new MessageEmbed()
        .setTitle("Logarithm")
        .addField("Entered", body.expression)
        .addField("Calculation", body.result)

        message.channel.send({ embed })
      } else {
        const embed = new MessageEmbed()
        .setTitle("How to use Calc Command")
        .setDescription("How to use the `calc` command\nIf you have further issues, you can join my discord server: `https://discord.gg/QwNTcpyZbF`")
        .addField("Alias", "`simplify, factor, derive, integrate, find0, cosine, sine, tan, arccos, arcsin, arctan, abs, log`")
        .addField("Example Usages", "`calc factor x^2+4x`")
        .addField("Notice", "This command is for applied and advanced math, and shall not be confused with the other math commands")
        .setFooter("Advanced Math")

        message.channel.send({ embed })
      }
    } catch (err) {
      console.log(err)
      return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
  }
}
