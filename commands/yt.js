const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const search = require('yt-search');

module.exports.run = async (bot, message, args, ops) => {
  if(!args[0]) return message.channel.send("Укажи что надо найти");

  search(args.join(" "), function(err, res){
    if(err) return message.channel.send("Что-то пошло не так..");

    let videos = res.videos.slice(0,10);
    let queue_str = '';
    for(let i in videos){
      queue_str += `\`[${parseInt(i)+1}]\` ${videos[i].title}\n`;
    }
    let response = new Discord.RichEmbed()
    .setDescription("~Поиск~")
    .setColor(botconfig.colors.main)
    .setFooter("Я нашёл это, выбери желаемое по номеру", bot.user.displayAvatarURL);
    if(queue_str) response.addField("Результат поиска", queue_str);
    message.channel.send(response);

    const filter = m => m.member === message.member;
    const collector = message.channel.createMessageCollector(filter);

    collector.videos = videos;
    collector.once('collect', function(m) {
      if(!isNaN(m.content) && m.content < videos.length+1 && m.content > 0 ) {
        let commandFile = require("./play.js");
        commandFile.run(bot, message, [this.videos[parseInt(m.content)-1].url], ops);
      } else {
        return message.channel.send("Поиск отменен");
      }

    });
  });

}

module.exports.help = {
  name: "yt"
}
