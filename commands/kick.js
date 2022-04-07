const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kickUser) return message.channel.send("Не могу найти пользователя");
  let kickReason = args.join(" ").slice(22);
  if(!kickReason) return message.channel.send("Укажи причину кика :japanese_ogre:");
  if(kickUser.id === bot.user.id){
    return message.channel.send(`Не хочу себя банить, знаешь ли`);
  }
  if (message.guild.member(kickUser).roles.some(role => role.name === botconfig.roles.admin)) {
    return message.channel.send(`Не могу кикать администраторов`);
  }
  if (message.guild.member(kickUser).roles.some(role => role.name === botconfig.roles.moder)) {
    return message.channel.send(`Не могу кикать модераторов`);
  }

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("~Кик~")
  .setColor(botconfig.colors.warn)
  .addField("Жертва", `${kickUser} с ID: ${kickUser.id}`)
  .addField("Модератор", `<@${message.author.id}> с ID: ${message.author.id}`)
  .addField("Канал", message.channel)
  .addField("Время выдачи", message.createdAt)
  .addField("Причина", kickReason);

  let kickChannel = message.guild.channels.find(`name`, botconfig.channels.kick);
  if(!kickChannel) return message.channel.send(`Не смог найти канал ${botconfig.channels.kick}!`);

  message.guild.member(kickUser).kick(kickReason);
  kickChannel.send(kickEmbed);
}

module.exports.help = {
  name: "kick"
}
