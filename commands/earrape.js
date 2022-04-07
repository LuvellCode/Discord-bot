const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, ops) => {

  if(!message.guild.me.voiceChannel) return message.channel.send("Меня нет в голосовом канале, сверхразум");
  if(!message.member.voiceChannel) return message.channel.send("Ты даже не присоединился к голосовому каналу, смысл мне тебя слушать?");
  if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Присоединись к моему голосовому каналу");

  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.channel.send("Упс! Плейлист пуст");

  let die = 3000;//громкость пиздеца
  let time = 3; // 3 seconds, НЕ ЗАБЫТЬ МЕНЯТЬ "СЕКУНД"
  if(fetched.dispatcher.volume === die){
    message.channel.send("Теперь можешь `отдыхать`, бро. Звук нормализован");
    return fetched.dispatcher.setVolume(1);
  }

  message.channel.send(`Предупреждаю! Ваши уши вымрут через \`${time} секунды\``);

  setTimeout(function(){
    fetched.dispatcher.setVolume(die);

    message.channel.send(`Можете умирать, смертные. Громкость установлена на \`${die}\``);
  },time*1000);
}

module.exports.help = {
  name: "earrape"
}
