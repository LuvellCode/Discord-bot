const Discord = require('discord.js');
const botconfig = require("../botconfig.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  let muteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!muteUser) return message.channel.send("Не могу найти пользователя");
  let mutetime = args[1];
  if(!mutetime) return message.channel.send("Укажи время мута :japanese_ogre:");
  args.splice(0, 2);
  let muteReason = args.join(" ");
  if(!muteReason) return message.channel.send("Укажи причину мута :japanese_ogre:");

  if(muteUser.id === bot.user.id){
    return message.channel.send(`Не хочу себя мутить, знаешь ли`);
  }
  if (message.guild.member(muteUser).roles.some(role => role.name === botconfig.roles.admin)) {
    return message.channel.send(`Не могу мутить администраторов`);
  }
  if (message.guild.member(muteUser).roles.some(role => role.name === botconfig.roles.moder)) {
    return message.channel.send(`Не могу мутить модераторов`);
  }

  let muterole = message.guild.roles.find(role => role.name === botconfig.roles.muted);
  //start of create role
  if(!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: botconfig.roles.muted,
        color: "#835680",
        permissions: []
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  message.guild.channels.forEach(async (channel, id) => {
    await channel.overwritePermissions(muterole, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
      SPEAK: false
    });
  });
  //end of create role
  let cleanTime = ms(ms(mutetime), {long: true});
  let muteEmbed = new Discord.RichEmbed()
  .setDescription("~Мут~")
  .setColor(botconfig.colors.warn)
  .addField("Жертва", `${muteUser} с ID: ${muteUser.id}`)
  .addField("Модератор", `<@${message.author.id}> с ID: ${message.author.id}`)
  .addField("Канал", message.channel)
  .addField("Время", message.createdAt)
  .addField("Время действия мута", cleanTime)
  .addField("Причина", muteReason);

  let muteChannel = message.guild.channels.find(role => role.name === botconfig.channels.mute);
  if(!muteChannel) return message.channel.send(`Не смог найти канал ${botconfig.channels.mute}!`);

  await (muteUser.addRole(muterole.id));
  muteChannel.send(muteEmbed);
  message.channel.send(`<@${muteUser.id}> был замучен на ${cleanTime}`);

  setTimeout(function () {
    muteUser.removeRole(muterole.id);
    message.channel.send(`<@${muteUser.id}> был размучен.`);
  }, ms(mutetime));
//end of module
}

module.exports.help = {
  name: "tempmute"
}
