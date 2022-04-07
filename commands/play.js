const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, ops) => {

  if(!message.member.voiceChannel) return message.channel.send("Ты даже не присоединился к голосовому каналу, смысл мне тебя слушать?");
  if(!args[0]) return message.channel.send("Пришли мне название либо ссылку на видео YT");

  let validate = await ytdl.validateURL(args[0]);
  if(!validate) {
      let commandFile = require(`./yt.js`);
      return commandFile.run(bot, message, args, ops);
  }
  let info = await ytdl.getInfo(args[0]);
  console.log(info);

  let data = ops.active.get(message.guild.id) || {};
  if(!data.connection) data.connection = await message.member.voiceChannel.join();
  if(!data.queue) data.queue = [];
  data.guildID = message.guild.id;

  if(args[0].startsWith("/watch?v=")){
    args[0] = `https://youtube.com${args[0]}`;
  }

  data.queue.push({
    songTitle: info.title,
    author: info.author,
    requester: message.author,
    url: args[0],
    announceChannel: message.channel.id
  });

  if(!data.dispatcher) {
    let commandFile = require(`./np.js`);
    play(bot, ops, data)
    .then(function(){
      commandFile.run(bot, message, args, ops);
    });
  }
  else{
      let response = new Discord.RichEmbed()
      .setDescription("Добавлено в очередь")
      .setColor(botconfig.colors.main)
      .addField("Трек", `[${info.title}](${args[0]})`)
      .addField("Автор", `[${info.author.name}](${info.author.channel_url})`, true)
      .addField("Добавлено", `${message.author}`, true)
      .setImage(`${info.author.avatar}`);
      message.channel.send(response);//message.channel.send(`Added to Queue: ${info.title} | Requested by: ${message.author}`);
    }

  ops.active.set(message.guild.id, data);
}

async function play(bot, ops, data){
  data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: "audioonly"}))
  data.dispatcher.guildID = data.guildID;
  data.dispatcher.once('end', function(){
    finish(bot, ops, this);
  });
}

function finish(bot, ops, dispatcher){
  let fetched = ops.active.get(dispatcher.guildID);
  if(!fetched) {
    ops.active.delete(dispatcher.guildID);
    return bot.guilds.get(dispatcher.guildID).me.voiceChannel.leave();
  }

  fetched.queue.shift();

  if(fetched.queue.length > 0){
    ops.active.set(dispatcher.guildID, fetched);
    play(bot, ops, fetched);
  } else {
    ops.active.delete(dispatcher.guildID);
    bot.guilds.get(dispatcher.guildID).me.voiceChannel.leave();
  }
}

module.exports.help = {
  name: "play"
}
