const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args, ops) => {

  let {body} = await superagent
  .get("http://aws.random.cat/meow");

  let dogembed = new Discord.RichEmbed()
  .setTitle(`~Random catty~`)
  .setColor(botconfig.colors.warn)
  .setImage(body.file);
  message.channel.send(dogembed);

}

module.exports.help = {
  name: "catty"
}
