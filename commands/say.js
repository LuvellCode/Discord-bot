const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let sayUser = message.guild.member(message.mentions.users.first());
  if(!sayUser) {
    sayUser = message.guild.member(message.author);
  } else {
    args.splice(0,1);
  }
  console.log(sayUser);
  let text = args.join(" ");

  let response = new Discord.RichEmbed()
  .setAuthor(sayUser.user.tag, sayUser.user.displayAvatarURL)
  .setColor(botconfig.colors.main)
  .setTimestamp()
  .setDescription(text);
  message.delete().catch();
  message.channel.send(response);


}

module.exports.help = {
  name: "say"
}
