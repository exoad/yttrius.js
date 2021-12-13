const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const commaNumber = require('comma-number');
const sort = require('fast-sort');
var usercountry = "";
const titleize = require('titleize');
var userstate = "";
module.exports = {
  config: {
      name: `covid19`,
      category: '',
      description: '',
      aliases: [`covid`, `covidsearch`, `covidstats`]
  },
  run: async (bot, message, args) => {
    try {
      let rety = message.content.split(" ").slice(1);
      
      if (args.length < 1) {
        return message.channel.send("")
      }
      if(rety == "stats" || rety == "all")
      {
      fetch('https://disease.sh/v2/all')
      .then(result => result.json())
      .then(statsResult);

      function statsResult(result) {
        var casesEmbed = new MessageEmbed()
            .setTitle("Covid-19 cases for \"all'")
            .setColor("#ed300e")
            .setThumbnail("https://cdn.statcdn.com/Statistic/1110000/1112595-blank-754.png")
            .addFields(
                { name: ":globe_with_meridians: Total Cases:", value: commaNumber(result.cases) + " (+" + Math.round(1000*result.todayCases/result.cases)/10 + "%)", inline: true },
                { name: ":headstone: Total Deaths:", value: commaNumber(result.deaths) + " (+" + Math.round(1000*result.todayDeaths/result.deaths)/10 + "%)", inline: true },
                { name: ":head_bandage: Total Recovered:", value: commaNumber(result.recovered), inline: true },
                { name: ":test_tube: Total Tested:", value: commaNumber(result.tests), inline: true },
            )
            .setFooter("" + new Date(result.updated).toLocaleString() + "")
        message.channel.send(casesEmbed);
            }
      } 
      if(rety == "list" || rety == "leaderboard")
      {
        fetch('https://disease.sh/v2/countries')
        .then(result => result.json())
        .then(listResult);

        function listResult(result) {
          var countrieslist = [];
          var listdata = result;
  
          sort(listdata).desc(u => u.cases);
  
          for (i = 0; i < listdata.length; i++) {
              countrieslist.push(listdata[i].country);
          }
          
          for (var i = 0; i < countrieslist.length; i++){
              countrieslist[i] = "`" + countrieslist[i] + "`";
          }
          
          var topcountries = countrieslist.splice(0, 51);
          topcountries = topcountries.toString();
  
          var countrylist = new MessageEmbed()
              .setTitle("List for \"Country_list\"")
              .setColor("#ed300e")
              .setThumbnail("https://cdn.statcdn.com/Statistic/1110000/1112595-blank-754.png")
              .addFields(
                  { name: ":bangbang: Countries with most cases(most -> least):", value: `${topcountries}\n`, inline: true },
              )
          message.channel.send(countrylist);
      }
    }
    if(rety == "country")
    {
      let uservar = message.content.split(" ").slice(2);;
      fetch(`https://disease.sh/v2/countries`)
      .then(result => result.json())
      .then(countryResult);
      uservar = message.content.split(" ").slice(2);

      function countryResult(result){
        var cases = [];
        var countries = [];
        var deaths = [];
        var recovered = [];
        var flag = [];
        var casestoday = [];
        var deathstoday = [];
        var tested = [];
        var entity = "country ";

        var statsindex = 0;
        
        var saidcountry = uservar.slice(prefix.length + entity.length);

        saidcountry = titleize(saidcountry);

        if (saidcountry == "Usa" || saidcountry == "United states" || saidcountry == "United states of america" || saidcountry == "US" || saidcountry == "Us" || saidcountry == "America") {
            saidcountry = "USA";
        }

        for (i = 0; i < result.length; i++) {
            cases.push(result[i].cases);
        }
        for (i = 0; i < result.length; i++) {
            deaths.push(result[i].deaths);
        }
        for (i = 0; i < result.length; i++) {
            recovered.push(result[i].recovered);
        }
        for (i = 0; i < result.length; i++) {
            countries.push(result[i].country);
        }
        for (i = 0; i < result.length; i++) {
            flag.push(result[i].countryInfo.flag);
        }
        for (i = 0; i < result.length; i++) {
            casestoday.push(result[i].todayCases);
        }
        for (i = 0; i < result.length; i++) {
            deathstoday.push(result[i].todayDeaths);
        }
        for (i = 0; i < result.length; i++) {
            tested.push(result[i].tests);
        }
        
        if (countries.includes(saidcountry)) {
            statsindex = countries.indexOf(saidcountry);
            if (flag[statsindex] == "https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/unknow.png") {
                var flagfail = new MessageEmbed()
                    .setTitle(saidcountry + "\'s Dashboard")
                    .addFields(
                        { name: "Cases", value: commaNumber(cases[statsindex]) + " (+" + Math.round(1000*casestoday[statsindex]/cases[statsindex])/10 + "%)", inline: true },
                        { name: "Deaths", value: commaNumber(deaths[statsindex]) + " (+" + Math.round(1000*deathstoday[statsindex]/deaths[statsindex])/10 + "%)", inline: true },
                        { name: "Recovered", value: commaNumber(recovered[statsindex]), inline: true },
                        { name: "Tested", value: commaNumber(tested[statsindex]), inline: true }
                    )
                message.channel.send(flagfail);
            } else {
                var inputCountry = new MessageEmbed()
                    .setTitle(saidcountry + "\'s Dashboard")
                    .setThumbnail(flag[statsindex])
                    .addFields(
                        { name: "Cases", value: commaNumber(cases[statsindex]) + " (+" + Math.round(1000*casestoday[statsindex]/cases[statsindex])/10 + "%)", inline: true },
                        { name: "Deaths", value: commaNumber(deaths[statsindex]) + " (+" + Math.round(1000*deathstoday[statsindex]/deaths[statsindex])/10 + "%)", inline: true },
                        { name: "Recovered", value: commaNumber(recovered[statsindex]), inline: true },
                        { name: "Tested", value: commaNumber(tested[statsindex]), inline: true }
                    )
                message.channel.send(inputCountry);
            }
        } else {
            message.channel.send(`Error Encountered: \`No Such country\``);
    }
  }
    }
  if(rety == "help" || rety == "idk" || rety == "HELP" || rety == "plshelp")
  {
    message.channel.send("**Having trouble using this command?**\n> Usage: `>>covid {stats/list/country}` `{user_country}`\n> 1. If you are using `>>covid stats` or `>>covid list` you do not need to provide argument `{user_country}`\n> 2. If you are using `>>covid country `you must provide argument `{user_country}`\n> 3. If you have further problems with this command you should join my discord: `https://discord.gg/wTAcPZxwqq%60`\n> \n> __*User-friendliness, and we are sorry if that is not met. We will do our best to fix it*__")
  }
  } catch (err) {
      console.log(err)
      return message.channel.send("**Having trouble using this command?**\n> Usage: `>>covid {stats/list/country}` `{user_country}`\n> 1. If you are using `>>covid stats` or `>>covid list` you do not need to provide argument `{user_country}`\n> 2. If you are using `>>covid country `you must provide argument `{user_country}`\n> 3. If you have further problems with this command you should join my discord: `https://discord.gg/wTAcPZxwqq%60`\n> \n> __*User-friendliness, and we are sorry if that is not met. We will do our best to fix it*__");
  }
  }
}