﻿const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const jimp = require('jimp');
const Canvas = require('canvas');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`Darven | -help`,"https://www.twitch.tv/dark7overr")
  client.user.setStatus("dnd")
});
var prefix = "-"

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => { 
    var user = message.mentions.users.first() || message.author; 
    if (message.content.startsWith("-avatar")) { 
    message.channel.send(`This avatar For ${user} link : ${user.avatarURL}`);
     } 
    });

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {

  if (message.author.bot) return;
 if (!message.channel.guild) return;
 if (message.content.startsWith(prefix + 'status')) {
     if (!message.channel.guild) return;
     let embed = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setThumbnail(message.author.avatarURL)
         .setFooter(message.author.username, message.author.avatarURL)

     .setDescription(`**The status of server members 🔰**
 
**:green_heart: Online**  **[ ${message.guild.members.filter(m=>m.presence.status == 'online').size} ]**
**:yellow_heart: Idle**       **[ ${message.guild.members.filter(m=>m.presence.status == 'idle').size} ]**  
**:heart: DND**     **[ ${message.guild.members.filter(m=>m.presence.status == 'dnd').size} ]**
**:black_heart: Offline** **[ ${message.guild.members.filter(m=>m.presence.status == 'offline').size} ]** `)

     message.channel.send()

     message.channel.sendEmbed(embed)
 }
});

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
  var name1 = message.mentions.users.first();
  var reason = message.content.split(' ').slice(2).join(' ');
  if(message.content.startsWith(prefix + 'report')) {
      if(message.author.bot) return;
      if(!message.guild.channels.find('name', 'chat')) return message.channel.send('**Please make ROM as (rum name) to send the reports to it ⚠️**').then(msg => msg.delete(5000));
  if(!name1) return message.reply('**The name of the person to whom you are referring ⚠️**').then(msg => msg.delete(3000))
      message.delete();
  if(!reason) return message.reply('**Type the reason 🚫**').then(msg => msg.delete(3000))
      message.delete();
  var abod = new Discord.RichEmbed()
  .setTitle(`:page_with_curl: **[REPORT]** By: ${message.author.tag}`)
  .addField('**Report For:**', `${name1}`, true)
  .addField('**In Channel:**', `${message.channel.name}`, true)
  .addField('**Reason:**', `${reason}`, true)
  .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
  .setTimestamp()
      message.guild.channels.find('name', 'chat').sendEmbed(abod)
  message.reply('**Thank you for your notification 💖**').then(msg => msg.delete(3000));
  }
});

/////////////////////////////////////////////////////////////////////////////

client.on('message', async msg =>{
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;
  
  let args = msg.content.split(' ');

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length)

  if(command === `ping`) {
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Pong!!")
  .setDescription(`${client.ping} ms,`)
  .setFooter(`Requested by | ${msg.author.tag}`);
  msg.delete().catch(O_o=>{})
  msg.channel.send(embed);
  }
});

/////////////////////////////////////////////////////////////////////////////

client.on('ready', function(){
    require("./antispam.js")(client, function(message){
       message.delete().then(yumz => {
       message.channel.send(`stop spamming kid <@${message.author.id}>`).then(spammer => {
       spammer.delete(2000)
     });
     });
    });
  });

/////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", function(member) {
    let role = member.guild.roles.find("name", "☯.⌠Darven⌡.☯");
    member.addRole(role).catch(console.error);
});

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
    if(message.content === prefix + "mutechannel") {
     
                        if(!message.channel.guild) return;

if(!message.member.hasPermission('ADMINSTRATOR')) return message.reply(' **You dont have permissions to use that command ⚠️**');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.reply("**Chat was closed ✅**")
           });
             }
//FIRE BOT
 if(message.content === prefix + "unmutechannel") {
                     if(!message.channel.guild) return;

if(!message.member.hasPermission('ADMINSTRATOR')) return message.reply('**You dont have permissions to use that command ⚠️**');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true

           }).then(() => {
               message.reply("**Chat opened ✅**")
           });
 }

});

/////////////////////////////////////////////////////////////////////////////

client.on('guildMemberAdd', Ammar=> {
    var embed = new Discord.RichEmbed()
    .setAuthor(Ammar.user.username, Ammar.user.avatarURL)
    .setThumbnail(Ammar.user.avatarURL)
    .setImage('') //هنا حط الصوره الي تبيها
    .setTitle('A New member!')
    .setDescription('Welcome to the server')
    .addField('``ID of the member``:',"" +  Ammar.user.id, true)
    .addField('``TAG Member``', Ammar.user.discriminator, true)
    .addField('``Created in``', Ammar.user.createdAt, true)
    .addField(' 👤  You are a number',`**[ ${Ammar.guild.memberCount} ]**`,true)
    .setColor('RANDOM')
    .setFooter(Ammar.guild.name, Ammar.guild.iconURL, true)
    var channel =Ammar.guild.channels.find('name', 'darven-chat')
    if (!channel) return;
    channel.send({embed : embed});
    });

const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.name === "darven-chat"); // اسم الروم
    logChannel.send(`Invited by: < @${inviter.tag} >`);
  });
});

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
   if(message.content.startsWith("-invites")) {
    message.guild.fetchInvites().then(invs => {
      let user = message.mentions.users.first() || message.author
      let personalInvites = invs.filter(i => i.inviter.id === user.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
message.channel.send(`${user} has **${inviteCount}** invites.`);
});
  }
});

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
    if (message.content === prefix + "date") {
        var currentTime = new Date(),
            Year = currentTime.getFullYear(),
            Month = currentTime.getMonth() + 1,
            Day = currentTime.getDate();
        message.channel.sendMessage( "Date : " + Day + "-" + Month + "-" +Year)
    }
});

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
   let embed = new Discord.RichEmbed()

    let args = message.content.split(' ').slice(1).join(' ');
     if(!message.channel.guild) return;
if(message.content.split(' ')[0] == '-bc') {
         message.react("✔️")
          let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.author.avatarURL)   
                                      .addField('Sent by :', "<@" + message.author.id + ">")
                 message.channel.sendEmbed(embed);
        message.guild.members.forEach(m => {
            var bc = new Discord.RichEmbed()
.addField('**● Sender  :**', `*** → ${message.author.username}#${message.author.discriminator}***`)
            .addField('***● Server  :***', `*** → ${message.guild.name}***`)               
    .setColor('RANDOM')
                 .addField('ّ', args)
            m.send(``,{embed: bc});
        });
    }
})

/////////////////////////////////////////////////////////////////////////////

client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help") {
         message.channel.send('**Special orders sent✔️ :mailbox_with_mail:**');
  const embed = new Discord.RichEmbed()
         
    
         

      .setColor("RANDOM")
.setDescription(`
 
╔[❖════════════❖]╗
  General Commands
╚[❖════════════❖]╝
 ❖ .avatar ➾ to get the image
 ❖ .support ➾ Website link support
 ❖ .status ➾ status the players on the server [Online , Idle , Dnd , Invsible]
 ❖ .report ➾ report the Spaming or the Swearing or Share links ....
 ❖ .ping ➾ to see your ping or some one
 ❖ .invites ➾ to see your invites
 ❖ .date ➾ to see the time


╔[❖════════════❖]╗
  Music Commands
╚[❖════════════❖]╝
❖ !play ⇏ To play a song with a clip or bass
❖ !skip ⇏ To play the song
❖ !pause ⇏ Pause the song
❖ !resume ⇏ For the Molecule of Egyption after being temporarily incapacitated
❖ !stop ⇏ To extract the pot from the room
❖ !np ⇏ To find out the song that is running
❖ !queue ⇏ To learn the operating system

invite link : https://discord.gg/ybASRd9
`);
  message.author.send({embed});
    }
});

/////////////////////////////////////////////////////////////////////////////

client.login(process.env.BOT_TOKEN);
