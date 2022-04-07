const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args, ops) => {

  if(!message.guild.me.voiceChannel) return message.channel.send("Меня нет в голосовом канале, сверхразум");

  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.channel.send("Упс! Плейлист пуст");

  let queue = fetched.queue;
  let nowPlaying = queue[0];

  let queue_str = '';
  if(!args[0]) args[0] = 1;

  if(queue.length > 10){
    //queue 1/2/3/4/5...
    for (let i = args[0]*10-10; i<args[0]*10; i++) {
      queue_str += `${i}. [${queue[i].songTitle}](${queue[i].url})\n`;
    }

  } else{
    for (let i = 1; i<queue.length; i++) {
      queue_str += `${i}. [${queue[i].songTitle}](${queue[i].url})\n`;
    }
  }

  let response = new Discord.RichEmbed()
  .setDescription("Текущий плейлист")
  .setColor(botconfig.colors.main)
  .addField("Сейчас играет", `[${nowPlaying.songTitle}](${nowPlaying.url})`)
  .setTimestamp()
  .setFooter(bot.user.username, bot.user.displayAvatarURL);
  if(queue_str) response.addField("Плейлист", queue_str);

  message.channel.send(response);
}

module.exports.help = {
  name: "queue"
}
