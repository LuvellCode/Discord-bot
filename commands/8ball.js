const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) return message.channel.send("Укажи вопрос, сверхразум");

  let replies = ["Да", "Нет", "ХЗ", "Спроси позже"];
  let result = Math.floor((Math.random()*replies.length));
  let question = args.join(" ");

  let response = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL)
  .setColor(botconfig.colors.warn)
  .addField("Вопрос", question)
  .addField("Ответ", replies[result]);
  message.channel.send(response);
}

module.exports.help = {
  name: "8ball"
}
