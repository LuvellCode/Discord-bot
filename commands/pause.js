const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, ops) => {

  if(!message.guild.me.voiceChannel) return message.channel.send("Меня нет в голосовом канале, сверхразум");
  if(!message.member.voiceChannel) return message.channel.send("Ты даже не присоединился к голосовому каналу, смысл мне тебя слушать?");
  if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Присоединись к моему голосовому каналу");

  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.channel.send("Упс! Плейлист пуст");

  if(fetched.dispatcher.paused) return message.channel.send("Алло, этот трек уже на паузе");

  fetched.dispatcher.pause();

  message.channel.send(`На паузе. Текущий трек: ${fetched.queue[0].songTitle}`);

}

module.exports.help = {
  name: "pause"
}
