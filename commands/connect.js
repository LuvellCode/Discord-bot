const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  if(!message.member.voiceChannel) return message.channel.send("Присоединись к голосовому каналу и только потом зови меня");

  message.member.voiceChannel.join();
  message.channel.send("Окей, я присоединился, что дальше?");

}

module.exports.help = {
  name: "connect"
}
