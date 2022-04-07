const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  if (message.guild.member(message.member).roles.some(role => role.name === botconfig.roles.admin) || message.guild.member(message.member).roles.some(role => role.name === botconfig.roles.moder)) {
    if(!args[0]) return message.channel.send("Уфф");
    message.channel.bulkDelete(parseInt(args[0])+1).then(() => {
      let response = new Discord.RichEmbed()
        .setColor(botconfig.colors.warn)
        .setDescription(`Очистил ${parseInt(args[0])+1} сообщений для тебя <3`);
        message.channel.send(response).then(msg => msg.delete(5000));
      });
  } else {
    message.channel.send("У тебя нет прав");
  }

}

module.exports.help = {
  name: "clear"
}
