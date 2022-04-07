const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!banUser) return message.channel.send("Не могу найти пользователя");
  let banReason = args.join(" ").slice(22);
  if(!banReason) return message.channel.send("Укажи причину бана :japanese_ogre:");
  if(banUser.id === bot.user.id){
    return message.channel.send(`Не хочу себя банить, знаешь ли`);
  }
  if (message.guild.member(banUser).roles.some(role => role.name === botconfig.roles.admin)) {
    return message.channel.send(`Не могу банить администраторов`);
  }
  if (message.guild.member(banUser).roles.some(role => role.name === botconfig.roles.moder)) {
    return message.channel.send(`Не могу банить модераторов`);
  }

  let banEmbed = new Discord.RichEmbed()
  .setDescription("~Бан~")
  .setColor(botconfig.colors.error)
  .addField("Жертва", `${banUser} с ID: ${banUser.id}`)
  .addField("Модератор", `<@${message.author.id}> с ID: ${message.author.id}`)
  .addField("Канал", message.channel)
  .addField("Время выдачи", message.createdAt)
  .addField("Причина", banReason);

  let banChannel = message.guild.channels.find(`name`, botconfig.channels.ban);
  if(!banChannel) return message.channel.send(`Не смог найти канал ${botconfig.channels.ban}!`);

  message.guild.member(banUser).ban(banReason);
  banChannel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
