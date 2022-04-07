const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let invite = new Discord.RichEmbed()
  .setColor(botconfig.colors.main)
  .addField("Ссылка-приглашение", "`https://discord.gg/8jGGVFy`");
  message.channel.send(invite);
}

module.exports.help = {
  name: "invite"
}
