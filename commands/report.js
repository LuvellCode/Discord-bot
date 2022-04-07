const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
      let reportedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!reportedUser) return message.channel.send("Couldn't find user");
      let reason = args.join(" ").slice(22);
      if(!reason) return message.channel.send("Укажи причину репорта :japanese_ogre:");

      let reportEmbed = new Discord.RichEmbed()
      .setDescription("~Репортик~")
      .setColor(botconfig.colors.warn)
      .addField("Жертва", `${reportedUser} с ID: ${reportedUser.id}`)
      .addField("Выдан юзером", `${message.author} с ID: ${message.author.id}`)
      .addField("Канал", message.channel)
      .addField("Время выдачи", message.createdAt)
      .addField("Причина", reason);

      let reportsChannel = message.guild.channels.find(`name`, botconfig.channels.report);
      if(!reportsChannel) return message.channel.send(`Не смог найти канал ${botconfig.channels.report}!`)

      message.delete().catch(O_o=>{});
      reportsChannel.send(reportEmbed);
}

module.exports.help = {
  name: "report"
}
