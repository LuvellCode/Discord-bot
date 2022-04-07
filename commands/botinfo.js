const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("~Информация о боте~")
  .setColor(botconfig.colors.mainCOLORS_Main)
  .setThumbnail(bicon)
  .addField("Имя", bot.user.username, true)
  .addField("Создатель", `<@${botconfig.owner_id}>`, true)
  .addField("Создан", bot.user.createdAt);

  message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo"
}
