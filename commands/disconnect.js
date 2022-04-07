const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, ops) => {

  if(!message.member.voiceChannel) return message.channel.send("Присоединись к голосовому каналу");
  if(!message.guild.me.voiceChannel) return message.channel.send("Я **не подключен** к голосовым каналам");
  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("Присоединись к моему голосовому каналу чтобы отключить");

  let fetched = ops.active.get(message.guild.id);
  if(fetched) {
    ops.active.set(message.guild.id, null);
    fetched.dispatcher.emit('end');
  } else {
    message.guild.me.voiceChannel.leave();
  }

  message.channel.send("Окей, я вышел");
}

module.exports.help = {
  name: "disconnect"
}
