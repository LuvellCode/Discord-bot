const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send("У меня нет прав на это!");
  let newNickname = args.join(" ");
  message.guild.fetchMembers();
  let guild_members = message.guild.members;

  guild_members.forEach((member, key) => {
    message.guild.member(member).setNickname(newNickname)
    .catch(O_o=>{});
  });
  message.react("✅");
}

module.exports.help = {
  name: "nickall"
}
