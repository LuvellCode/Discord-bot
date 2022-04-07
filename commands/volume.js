const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, ops) => {

  if(!message.guild.me.voiceChannel) return message.channel.send("Меня нет в голосовом канале, сверхразум");
  if(!message.member.voiceChannel) return message.channel.send("Ты даже не присоединился к голосовому каналу, смысл мне тебя слушать?");
  if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Присоединись к моему голосовому каналу");

  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.channel.send("Упс! Плейлист пуст");

  let min = 0;
  let max = 200;

  if(isNaN(args[0]) || args[0] > max || args[0] < min) return message.channel.send(`Введи значение между \`${min}-${max}\``);

  fetched.dispatcher.setVolume(args[0]/100);

  message.channel.send(`Громкость изменена на \`${args[0]}\``);

}

module.exports.help = {
  name: "volume"
}
