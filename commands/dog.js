const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args, ops) => {

  let {body} = await superagent
  .get("https://random.dog/woof.json");

  let dogembed = new Discord.RichEmbed()
  .setTitle(`~Random doggo~`)
  .setColor(botconfig.colors.warn)
  .setImage(body.url);
  message.channel.send(dogembed);

}

module.exports.help = {
  name: "doggo"
}
