const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("~Информация о сервере~")
  .setColor(botconfig.colors.main)
  .setThumbnail(sicon)
  .addField("Имя", message.guild.name)
  .addField("Создан", message.guild.createdAt)
  .addField("Ты присоединился", message.member.joinedAt)
  .addField("Всего пользователей", message.guild.memberCount);

  message.channel.send(serverembed);
}

module.exports.help = {
  name: "serverinfo"
}
