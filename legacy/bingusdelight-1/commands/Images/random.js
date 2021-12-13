//https://random-data-api.com/api/
const { MessageAttachment, MessageEmbed } = require('discord.js');
const superagent = require('superagent');
const config = require("../../config.json");
module.exports = {
    config: {
        name: "random"
    },
    run: async (bot, message, args) => {
        try {
            let toChoice = args[0];
            if(!toChoice || toChoice == undefined) {
                const embed = new MessageEmbed()
                .setTitle("How to use this Command")
                .setDescription("Here you will find info on this command: `random`")
                .addField("Basic Arguments", "`address, appliance, app, bank, blood, credit, code, coffee, company, computer, crypto, color, device, food, name, id, vehicle, nation, number, lorem, phone`")
                .addField("Sample Usage", "**Input:** `"+config.prefix+"random device`")
                .addField("Note", "Not all information are true")
                .setFooter("You can join my Support Server: https://discord.gg/vgerN5vytF")
                
                message.channel.send({ embed })
            } else if(toChoice == "address") {
                const { body } = await superagent.get('https://random-data-api.com/api/address/random_address');
                const embed = new MessageEmbed()
                .setTitle("Random Address")
                .addField("City", body.city, true)
                .addField("Stree Name", body.street_name, true)
                .addField("Street Address", body.street_address, true)
                .addField("Street Suffix", body.street_suffix, true)
                .addField("Secondary", body.secondary_address, true)
                .addField("Building Number", body.building_number, true)
                .addField("Mail Box", body.mail_box, true)
                .addField("Community", body.community, true)
                .addField("ZIP", body.zip_code, true)
                .addField("ZIP Code", body.zip_code, true)
                .addField("Post Code", body.postcode, true)
                .addField("Time Zone", body.time_zone, true)
                .addField("City Suffix & Prefix", `${body.city_suffix} / ${body.city_prefix}` , true)
                .addField("State", body.state, true)
                .addField("Country", body.country, true)
                .addField("Country Code", body.country_code)
                .addField("Latitude & Longitude", `${body.latitide}'${body.longitude}`, true)
                .addField("Full Address", body.full_address)
                .setColor("RANDOM")
                .setFooter("Not all information are true")
                
                message.channel.send({ embed })
            } else if (toChoice == "appliance") {
                const { body } = await superagent.get('https://random-data-api.com/api/appliance/random_appliance');
                const embed = new MessageEmbed()
                .setTitle("Random Appliance")
                .addField("Brand", `${body.brand}`, true)
                .addField("Item", `${body.equipment}`, true)
                .setColor("RANDOM")
                .setFooter("Not all information are true")
                
                message.channel.send({ embed })
            } else if(toChoice == "app") {
                const { body } = await superagent.get('https://random-data-api.com/api/app/random_app');
                const embed = new MessageEmbed()
                .setTitle("Random APP")
                .addField("Name", `${body.app_name}`, true)
                .addField("Version", `${body.app_version}`, true)
                .addField("Creator", `${body.app_author}`, true)
                .addField("Semantic Ver.", `${body.app_semantic_version}`, true)
                .addField("Major", `${body.app_major_version}`, true)
                .addField("Minor", `${body.app_minor_version}`, true)
                .addField("Patch", `${body.app_patch_version}`, true)
                .setColor("RANDOM")
                .setFooter("Not all information are true")

                message.channel.send({ embed });
            } else if(toChoice == "bank") {
                const { body } = await superagent.get('https://random-data-api.com/api/bank/random_bank');
                const embed = new MessageEmbed()
                .setTitle("Random Bank")
                .addField("Account", body.account_number, true)
                .addField("IBAN", body.iban, true)
                .addField("Bank", body.bank_name, true)
                .addField("Routing", body.routing_number, true)
                .addField("BIC (Swift)", body.swift_bic, true)
                .setColor("RANDOM")
                .setFooter("Not all information are true")

                message.channel.send({ embed });
            } else if(toChoice == "blood") {
                const { body } = await superagent.get('https://random-data-api.com/api/blood/random_blood');
                const embed = new MessageEmbed()
                .setTitle("Random Blood Type")
                .addField("Type", body.type, true)
                .addField("RH Factor", body.rh_factor, true)
                .addField("Group", body.group, true)
                .setColor("RANDOM")
                
                message.channel.send({ embed })
            } else if(toChoice == "credit") {
                const { body } = await superagent.get('https://random-data-api.com/api/business_credit_card/random_card');
                const embed = new MessageEmbed()
                .setTitle("Random Credit Card")
                .addField("Number", body.credit_card_number, true)
                .addField("Expiration", body.credit_card_expiry_date, true)
                .addField("Type", body.credit_card_type, true)
                .setColor("RANDOM")
                .setFooter("Not all information are true")

                message.channel.send({ embed });
            } else if(toChoice == "code") {
                const { body } = await superagent.get('https://random-data-api.com/api/code/random_code');
                const embed = new MessageEmbed()
                .setTitle("Random Code")
                .addField('NPI', body.npi, true)
                .addField("ISBN", body.isbn, true)
                .addField("EAN", body.ean, true)
                .addField("RUT", body.rut, true)
                .addField("NRIC", body.nric, true)
                .addField("IMEI", body.imei, true)
                .addField("ASIN", body.asin, true)
                .addField("SIN", body.sin, true)
                .setColor("RANDOM")
                .setFooter("Not all information are true")
                
                message.channel.send({ embed })
            } else if(toChoice == "coffee") {
                const { body } = await superagent.get('https://random-data-api.com/api/coffee/random_coffee');
                const embed = new MessageEmbed()
                .setTitle("Random Coffee")
                .addField("Blend", body.blend_name, true)
                .addField("Origin", body.origin, true)
                .addField("Variety Name", body.variety, true)
                .addField("Feel", body.notes, true)
                .addField("Intensifier", body.intensifier, true)
                .setColor("RANDOM")
                
                message.channel.send({ embed })
            } else if(toChoice == "company") {
                const { body } = await superagent.get('https://random-data-api.com/api/company/random_company');
                const embed = new MessageEmbed()
                .setTitle("Random Company")
                .addField("Name", body.business_name, true)
                .addField("Suffix", body.suffix, true)
                .addField("Industry Focus", body.industry, true)
                .addField("Catch Phrase", body.catch_phrase, true)
                .addField("Buzz Word", body.buzzword, true)
                .addField("Company Statement", body.bs_company_statement, true)
                .addField("Emplyee ID Number", body.employee_identification_number, true)
                .addField("DUNS", body.duns_number, true)
                .setThumbnail(`${body.logo}`)
                .addField("Type", body.type, true)
                .addField("Phone", body.phone_number, true)
                .addField("Address + Latitude Longitude", `${body.full_address}\n**Latitude** ${body.latitude}\n**Longitude** ${body.longitude}`)
                .setColor("RANDOM")
                .setFooter("Not all information are true")

                message.channel.send({ embed });
            } else if(toChoice == "crypto") {
                const { body } = await superagent.get('https://random-data-api.com/api/crypto/random_crypto');
                const embed = new MessageEmbed()
                .setTitle("Random Crypto")
                .addField('MD5', body.md5, true)
                .addField("SHA1", body.sha1, true)
                .addField("SHA256", body.sha256, true)
                .setFooter("Not all information are true")
                .setColor("RANDOM")
          
                message.channel.send({ embed })
            } else if(toChoice == "computer") {
                const { body } = await superagent.get('https://random-data-api.com/api/computer/random_computer');
                const embed = new MessageEmbed()
                .setTitle("Random Computer/PC")
                .addField("Platform", body.platform, true)
                .addField("Type", body.type, true)
                .addField("OS", bod.os, true)
                .addField("Stack", body.stack, true)
                .setColor("RANDOM")
                .setFooter("Not all information are true")

                message.channel.send({ embed });
            } else if(toChoice == "color") {
                const { body } = await superagent.get('https://random-data-api.com/api/color/random_color');
                const embed = new MessageEmbed()
                .setTitle("Random Color")
                .addField("HEX", body.hex_value, true)
                .addField("Proper Name", body.color_name, true)
                
                message.channel.send({ embed });
            } else if(toChoice == "device") {
                const { body } = await superagent.get('https://random-data-api.com/api/device/random_device');
                const embed = new MessageEmbed()
                .setTitle("Random Device")
                .addField("Manufacturer", body.manufacturer, true)
                .addField("Model", body.model, true)
                .addField("Platform", body.platform, true)
                .addField("Build", body.build_number, true)
                .addField("Serial Number", body.serial_number, true)
                .addField("Version", body.version, true)
                .setColor("RANDOM")
                .setFooter("Not all information are true")

                message.channel.send({ embed });
            } else if(toChoice == "food") {
                const { body } = await superagent.get('https://random-data-api.com/api/food/random_food');
                const embed = new MessageEmbed()
                .setTitle("Random Food")
                .addField("Name", body.dish, true)
                .addField("Description", body.description, true)
                .addField("Ingredients & Measurement", `${body.ingredient}\n${body.measurement}`, true)
                .setColor("RANDOM")

                message.channel.send({ embed })
            } else if(toChoice == "name") {
                const { body } = await superagent.get('https://random-data-api.com/api/name/random_name');
                const embed = new MessageEmbed()
                .setTitle("Random Name")
                .addField("Name", body.name, true)
                .setColor("RANDOM")

                message.channel.send({ embed })
            } else if(toChoice == "id") {
                const { body } = await superagent.get('https://random-data-api.com/api/id_number/random_id_number');
                const embed = new MessageEmbed()
                .setTitle("Random ID")
                .addField("Valid SSN", body.valid_us_ssn, true)
                .addField("Invalid", body.invalid_us_ssn, true)
                .setFooter("Not all information are true")
                .setColor("RANDOM")

                message.channel.send({ embed })
            } else if(toChoice == "vehicle") {
                const { body } = await superagent.get('https://random-data-api.com/api/vehicle/random_vehicle');
                const embed = new MessageEmbed()
                .setTitle("Random Vehicle")
                .addField("Make", body.make_and_model, true)
                .addField("Color", body.color, true)
                .addField("Transmission", body.transmission, true)
                .addField("Drive", body.drive_type, true)
                .addField("Fuel Usage Type", body.fuel_type, true)
                .addField("Car Type", body.car_type, true)
                .addField("Car Options", body.car_options, true)
                .addField("Specifications", body.specs, true)
                .addField("Door(s) Count", body.doors, true)
                .addField("Mileage", body.mileage, true)
                .addField("Kilometrage", body.kilometrage, true)
                .addField("License", body.license_plate, true)
                .addField("VIN", body.vin, true)
                .setColor("RANDOM")
                .setFooter("Not all information are true")

                message.channel.send({ embed })
            } else if(toChoice == "nation") {
                const { body } = await superagent.get('https://random-data-api.com/api/nation/random_nation');
                const embed = new MessageEmbed()
                .setTitle("Random Nation")
                .addField("Nationality", body.nationality, true)
                .addField("Language", body.language, true)
                .addField("Capital", body.capital, true)
                .addField("National Sport", body.national_sport, true)
                .addField("Flag", body.flag, true)
                .setColor("RANDOM")
                .setFooter("Not all Information are true")

                message.channel.send({ embed })
            } else if(toChoice == "number") {
                const { body } = await superagent.get('https://random-data-api.com/api/number/random_number');
                const embed = new MessageEmbed()
                .setTitle("Random Numbers")
                .addField("Number", body.number)
                .addField("Leading Zero", body.leading_zero_number)
                .addField("Decimal", body.decimal)
                .addField("Normal", body.normal)
                .addField("Hexa", body.hexadecimal)
                .addField("Positive", body.positive)
                .addField("Negative", body.negative)
                .addField("Non Zero", body.non_zero_number)
                .addField("Digit", body.digit)
                
                message.channel.send({ embed })
            } else if(toChoice == "phone") {
                const { body } = await superagent.get('https://random-data-api.com/api/phone_number/random_phone_number');
                const embed = new MessageEmbed()
                .setTitle("Random Phone Number")
                .addField("Number", body.phone_number)
                .addField("Cell", body.cell_phone)
                .addField("Cell (e614)", body.cell_phone_in_e164)
                .setFooter("Not all Information are true")

                message.channel.send({ embed })
            } else if(toChoice == "lorem") {
                const { body } = await superagent.get('https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum');
                const embed = new MessageEmbed()
                .setTitle("Random Lorem Ipsum")
                .addField("Specificed", body.word)
                .addField("Words", body.words)
                .addField("Characters", body.characters)
                .addField("Short", body.short_sentence)
                .addField("Long", body.long_sentence)
                .addField("Paragraph Form", body.paragraphs)
                .addField("Question Specificed", body.question)
                .addField("Questions", body.questions)
                .setColor("RANDOM")
                .setFooter("Not all Information are true")

                message.channel.send({ embed })
            } else {
							  const embed = new MessageEmbed()
                .setTitle("How to use this Command")
                .setDescription("Here you will find info on this command: `random`")
                .addField("Basic Arguments", "`address, appliance, app, bank, blood, credit, code, coffee, company, computer, crypto, color, device, food, name, id, vehicle, nation, number, lorem, phone`")
                .addField("Sample Usage", "**Input:** `"+config.prefix+"random device`")
                .addField("Note", "Not all information are true")
                .setFooter("You can join my Support Server: https://discord.gg/vgerN5vytF")
                
                message.channel.send({ embed })
						}

        } catch(err)
        {
            message.channel.send("Something went wrong...");
            console.info(err.message);
        }
    }
}