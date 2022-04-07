const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, ops) => {

  if(!message.guild.me.voiceChannel) return message.channel.send("Меня нет в голосовом канале, сверхразум");

  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.channel.send("Упс! Плейлист пуст");

  let queue = fetched.queue;
  let nowPlaying = queue[0];
  console.log(`${nowPlaying.songTitle} -- ${nowPlaying.url}`)

  let response = new Discord.RichEmbed()
  .setDescription("Сейчас играет")
  .setColor(botconfig.colors.main)
  .addField("Трек", `[${nowPlaying.songTitle}](${nowPlaying.url})`)
  .addField("Автор", `[${nowPlaying.author.name}](${nowPlaying.author.channel_url})`, true)
  .addField("Добавлено", `${nowPlaying.requester}`, true)
  .setImage(`${nowPlaying.author.avatar}`);

  message.channel.send(response);
}

module.exports.help = {
  name: "np"
}
