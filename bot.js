const botconfig = require("./botconfig.json");
const tokenfile = require('./tokenfile.json');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

//active music
const active = new Map();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("за VimeMC", {type:"WATCHING"});
})

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server`);

  let welcomeChannel = member.guild.channels.find(`name`, botconfig.channels.welcome);
  if(!welcomeChannel) return message.channel.send(`Не смог найти канал ${botconfig.channels.welcome}!`);

  let response = new Discord.RichEmbed()
  .setAuthor(`Участник присоединился | ${member.user.tag}`, member.user.displayAvatarURL)
  .setDescription(`<@${member.user.id}> присоединился к серверу.\nАккаунт создан \`${member.user.createdAt}\``)
  .setColor(botconfig.colors.warn)
  .setTimestamp()
	.setFooter(`${member.guild.memberCount} участников | ID: ${member.user.id}`);
  welcomeChannel.send(response);
});

bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} left the server`);

  let welcomeChannel = member.guild.channels.find(`name`, botconfig.channels.welcome);
  if(!welcomeChannel) return message.channel.send(`Не смог найти канал ${botconfig.channels.welcome}!`);

  let response = new Discord.RichEmbed()
  .setAuthor(`Участник вышел | ${member.user.tag}`, member.user.displayAvatarURL)
  .setDescription(`<@${member.user.id}> покинул сервер`)
  .setColor(botconfig.colors.error)
  .setTimestamp()
  welcomeChannel.send(response);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let ops = {
    active: active
  }

  let commandFile = bot.commands.get(cmd.slice(prefix.length));
  if(commandFile) commandFile.run(bot, message, args, ops);

});

bot.login(tokenfile.token);
