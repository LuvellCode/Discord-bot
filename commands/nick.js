const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!target) return message.channel.send("Couldn't find user");
  if (message.guild.member(target).roles.some(role => role.name === botconfig.roles.admin)) {
    return message.channel.send(`Не могу менять ник администратору`);
  }
  if (message.guild.member(target).roles.some(role => role.name === botconfig.roles.moder)) {
    return message.channel.send(`Не могу менять ник модератору`);
  }

  let newNickname = args.join(" ").slice(22);
  if(newNickname.trim() === "clear") newNickname = target.user.username;

  target.setNickname(newNickname);
  message.react("✅");
}

module.exports.help = {
  name: "nick"
}
