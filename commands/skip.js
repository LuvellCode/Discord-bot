const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, ops) => {

  if(!message.guild.me.voiceChannel) return message.channel.send("Меня нет в голосовом канале, сверхразум");
  if(!message.member.voiceChannel) return message.channel.send("Ты даже не присоединился к голосовому каналу, смысл мне тебя слушать?");
  if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Присоединись к моему голосовому каналу");

  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.channel.send("Упс! Плейлист пуст");

  if (message.member.roles.some(role => role.name === botconfig.roles.admin) || message.member.roles.some(role => role.name === botconfig.roles.moder)) {
    message.channel.send("Пропущено модератором");
    return fetched.dispatcher.end();
  }

  let userCount = message.member.voiceChannel.members.size;
  let required = Math.ceil(userCount/2);

  if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
  if(fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Вы уже проголосовали за пропуск трека! (${fetched.queue[0].voteSkips.length}/${required})`);

  fetched.queue[0].voteSkips.push(message.member.id);
  ops.active.set(message.guild.id, fetched);

  if(fetched.queue[0].voteSkips.length >= required) {
    message.channel.send("Пропущено голосованием");
    return fetched.dispatcher.end();
  }

  message.channel.send(`Успешно проголосовали за пропуск трека! (${fetched.queue[0].voteSkips.length}/${required})`);

}

module.exports.help = {
  name: "skip"
}
