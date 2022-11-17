var list = require('badwords-list');
const ms = require("parse-ms");
const { get } = require('../cc_list_test/sqlite.js') 
const Discord = require("discord.js");
const antiLink = require("anti-link-discord")
const AntiSpam = require("discord-anti-spam");
var profanity = require("profanity-hindi");
module.exports = async (client, message) => {
  this.client = client;
  const db = require("quick.db");
if(message.channel.type === 'dm') {
return;
}
    if(message.author.bot){
			return;
		}

     var prefix = db.fetch(`guildprefix_${message.guild.id}`);
   if(!prefix)
   {
     var prefix = client.config.prefix;
   
}
if(await db.has(`swear-${message.guild.id}`) === true){ 
    var words = list.array;
      var isDirty = profanity.isMessageDirty(message.content);
    if(isDirty == true){
      message.delete();
        message.channel.send(`${message.author} Do not use bad words.`) .then(m => m.delete({ timeout : 3000 }))
        return;
    }
    var customwords = ["bc", "mc", "bhosda", "lond", "loda", "louda", "lund", "randi", "mkc", "mkb", "tmkc", "bsdk", "bhosdike"];
  
    for (let i = 0; i < words.length; i++) {
        if(message.content.includes(customwords[i])){
      message.delete();
          message.channel.send(`${message.author} Do not use bad words.`)
          .then(m => m.delete({ timeout : 3000 }))
          return;
    }
        if(message.content.includes(words[i])) {
            message.delete();
            message.channel.send(`${message.author} Do not use bad words.`)
                .then(m => m.delete({ timeout : 3000 }))
        }
    }
  
}

let chatbot = db.fetch(`chatbotc_${message.guild.id}`);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
 let name = message.content.toLowerCase();
if(db.has(`${name}_${message.guild.id}`))
{
  let gettingreply = db.fetch(`${name}_${message.guild.id}`);
  
  
     message.channel.send(gettingreply)
  
}
 
     if (db.has(`${message.guild.id}_${message.author.id}` + '.afk')) {
       message.member.setNickname('').catch(error => message.channel.send("Couldn't update your nickname."));
       message.reply("Oh you're back ! i removed your afk");
        db.delete(`${message.guild.id}_${message.author.id}` + '.afk')
        db.delete(`${message.guild.id}_${message.author.id}` + '.messageafk')
      }
        message.mentions.users.forEach(user => {
           if(user.id == client.user.id){
             message.channel.send(`Did someone tagged me? My prefix for this server is ${prefix}`)
           }
        if (db.has(`${message.guild.id}_${user.id}` + '.afk')) 
        {
             let messageafk2 =  db.fetch(`${message.guild.id}_${user.id}` + '.messageafk');
            message.reply(`the user ${user.tag}  is afk ! Reason: ${messageafk2} `);
        }
    })   


if(message.channel.id == chatbot)
{
  
     return client.util.handleTalk(message);
}

     const hehe = db.fetch(`antilink_${message.guild.id}`);
      if(message.member && message.member.hasPermission('MANAGE_MESSAGES'))
       {
       }
       else {
     if(hehe == "on")
     {
   
  if (message.content.includes("http://")) {
   message.channel.send("Only https certified links allowed!!!")
    message.delete();
  }
 
    if (message.content.includes("discord.gg/")) {
       message.channel.send("No  Server invites allowed!!!")
       message.delete();
  }
  if (message.content.includes("Discord.gg/")) {
       message.channel.send("No  Server invites allowed!!!")
       message.delete();
  
     }
       }
       }

      
   
  
   
  const cmd = args.shift().toLowerCase();
    

    let command = client.commands.get(cmd)
    
      if(!command)
       {
           
       let user = message.author;
       let timeout = "2000";
        var weekly =  db.fetch(`messagee_${message.guild.id}_${user.id}`);
   if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
   } else {
 db.add(`messages_${message.guild.id}_${user.id}`, 1); 
 let messagefetch = db.fetch(`messages_${message.guild.id}_${user.id}`); 
   let messages;
  if (messagefetch == 25) messages = 25; //Level 1
  else if (messagefetch == 65) messages = 65; // Level 2
  else if (messagefetch == 115) messages = 115; // Level 3
  else if (messagefetch == 200) messages = 200; // Level 4
  else if (messagefetch == 300) messages = 300; // Level 5
   db.set(`messagee_${message.guild.id}_${user.id}`, Date.now());
  if (!isNaN(messages)) {
    db.add(`level_${message.guild.id}_${message.author.id}`, 1)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)
  
  }
   }     
 if(message.content.includes("dumb"))
 {
     var weekly =  db.fetch(`bov_${message.member.id}`);
   if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
   } else {

 
   db.add(`broov_${message.member.id}`, 1);
     db.set(`bov_${message.member.id}`, Date.now());
   }
 }
 
       }
       let data = await get(message, message.guild) 
       if (message.content.indexOf(prefix) !== 0) return;
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    
    if(command) command.execute(client, message, args, data); 
    
}
