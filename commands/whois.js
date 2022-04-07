const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) return message.channel.send("Укажи кого надо определить, сверхразум");

  let random_user = message.guild.members.random();
  let reply = [
    `Согласно вычислениям нейросетей Пентагона ${random_user} ${args[0]}`,
    `А хуй знает, дело мутное`,
    `Скажу сразу: ${random_user} ${args[0]}`,
    `${random_user} ${args[0]} ¯\\_(ツ)_/¯`
  ];

  let min = 0;
  let max = reply.length;
  let randomized = Math.floor(Math.random() * (max - min)) + min;

  let randEmbed = new Discord.RichEmbed()
  .setDescription(`~Кто ${args[0]}~`)
  .setColor(botconfig.colors.main)
  .addField("Результат", reply[randomized]);

  message.channel.send(randEmbed);
}

module.exports.help = {
  name: "кто"
}
