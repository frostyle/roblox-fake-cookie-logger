const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['CHANNEL'], intents: [
Discord.Intents.FLAGS.DIRECT_MESSAGES, 
Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
]})
const axios = require('axios')
const random = require('randomstring');


const token = 'Your Bot Token Here';

const prefix = '!';


// Anti Crash
process.on('multipleResolves', (type, reason, promise) => {
  console.log(`» [ERRO]\n\n` + type, promise, reason);
});
process.on('unhandRejection', (reason, promise) => {
  console.log(`» [ERRO]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`» [ERRO]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`» [ERRO] \n\n` + error, origin);
});


client.on('message', async message => {

if (message.author.bot) return;

if (message.content.indexOf(prefix) !== 0) return;

const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const comando = args.shift().toLowerCase();


if (comando == 'makec'){
if (message.guild.channels.cache.find(c => c.topic == message.member.user.id)) {
  let cErr = new Discord.MessageEmbed()
  .setAuthor('MyInfo',`${client.user.displayAvatarURL()}`)
.setColor('RED')
.setDescription("You already have a private channel and cannot create another one")
.setTimestamp()
  return message.reply('',cErr)
}
let everyoneRole = message.guild.roles.cache.find(r => r.name === '@everyone'); 
message.guild.channels.create(`${message.member.user.username}`,{
parent: '1017168256559235072',
topic: message.member.user.id,
type: 'text', 
permissionOverwrites: [ { 
id: everyoneRole.id, 
deny: ['VIEW_CHANNEL'],
}, 
{ 
id: message.member.user.id,
allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
},                  
   ], 
})
  .then(c => {
let cCrea = new Discord.MessageEmbed()
    .setAuthor('MyInfo',`${client.user.displayAvatarURL()}`)
.setColor('GREEN')
.setDescription(`Your channel has been created successfully! <#${c.id}>`)
.setTimestamp()
  return message.reply('',cCrea)
    
  })
}
  
if (comando == 'help'){   
const comm = new Discord.MessageEmbed()
    .setTitle('MyInfo')
  .setColor('#ffffff')
    .addField('!cord','Search in our database using discord ids')
.addField('!user','Search in our database using roblox usernames')
.addField('!makec','Create a private channel for you to use the commands')
.addField('!help','Show all commands')
.setFooter('MyInfo - #1 Lookup Bot')
    message.channel.send(comm)
  }
if(comando == 'user'){
if (!args[0]){
  let erro = new Discord.MessageEmbed()
.setColor('RED')
.setAuthor('MyInfo',`${client.user.displayAvatarURL()}`)
.setDescription(`User not found`)
.setTimestamp()
    return message.reply('',erro)
}
axios.get(`https://api.roblox.com/users/get-by-username?username=${args[0]}`)
.then(async res => {
  let data = res.data
  let userid = data.Id
if (data.errorMessage === 'User not found'){
  let erro = new Discord.MessageEmbed()
.setColor('RED')
.setAuthor('MyInfo',`${client.user.displayAvatarURL()}`)
.setDescription(`User ${args[0]} not found`)
.setTimestamp()
    return message.reply('',erro)
}
axios.get(`https://users.roblox.com/v1/users/${userid}`)
.then(async res => {
  var data = res.data
  const date = new Date(data.created);
const unixTimestamp = Math.floor(date.getTime() / 1000);

  const cookie = random.generate({
    length: 589,
    capitalization: 'uppercase'
  });
    
  const Info = new Discord.MessageEmbed()
  .setColor('#ffffff')
  .setTitle('User Detected!')
  .setURL(`https://www.roblox.com/users/${data.id}/profile`)
  .addField('Username & Display:',data.name +' | '+ data.displayName,true)
.addField('Created:',`<t:${unixTimestamp}:f>`,true)
.addField('Password:', 'This is for premium users only.',true)
.addField('Pin:','This is for premium users only.')
  .addField('Cookies:',`_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${cookie}`)
.setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${data.id}&width=420&height=420&format=png`)
.setFooter('MyInfo', client.user.displayAvatarURL())
message.channel.send(Info)
})
}).catch(function (error) {
let erro = new Discord.MessageEmbed()
.setColor('RED')
.setAuthor('MyInfo',`${client.user.displayAvatarURL()}`)
.setDescription(`User ${args[0]} does not exist!`)
.setTimestamp()
    return message.reply('',erro)
  })
}


if (comando == 'cord') {
if (!message.mentions.users.size) {

axios.get(`https://v3.blox.link/developer/discord/${args[0]}`,{
  'headers': {
    'api-key': '3d66464f-665c-48d5-8412-9e7e3017afcafb48bf84-0b96-492a-8266-01ba525c1ec301c63625-4c09-4e90-8702-7268b921358d',
  }
}).then(async res => {
var data = res.data
var userid = data.user.robloxId
axios.get(`https://users.roblox.com/v1/users/${userid}`)
.then(async res => {
var data = res.data
const cookie = random.generate({
  length: 589,
  capitalization: 'uppercase'
});
const date = new Date(data.created);
const unixTimestamp = Math.floor(date.getTime() / 1000);
  client.users.fetch(`${args[0]}`).then((user) => {
const Info = new Discord.MessageEmbed()
  .setColor('#ffffff')
  .setTitle('User Detected!')
  .setURL(`https://www.roblox.com/users/${data.id}/profile`)
    
.addField('Username & Display:',data.name +' | '+ data.displayName)

.addField('Created:',`<t:${unixTimestamp}:f>`)
.addField('Password:', 'This is for premium users only.')
.addField('Pin:','This is for premium users only.')
.addField('Discord:',`${user.username}#`+ user.discriminator)
  .addField('Cookies:' , `_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${cookie}`)
.setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${data.id}&width=420&height=420&format=png`)
.setFooter('MyInfo', client.user.displayAvatarURL())
message.channel.send(Info)
})
 })
}).catch(function (error) {
let erro = new Discord.MessageEmbed()
.setColor('RED')
.setAuthor('MyInfo',`${client.user.displayAvatarURL()}`)
.setDescription(`User <@${args[0]}> not found in bloxlink database!`)
.setTimestamp()
    return message.reply('',erro)
  })
}else{
axios.get(`https://v3.blox.link/developer/discord/${message.mentions.users.first().id}`,{
  'headers': {
    'api-key': '3d66464f-665c-48d5-8412-9e7e3017afcafb48bf84-0b96-492a-8266-01ba525c1ec301c63625-4c09-4e90-8702-7268b921358d',
  }
}).then(async res => {
  var data = res.data
  var userid = data.user.robloxId
axios.get(`https://users.roblox.com/v1/users/${userid}`)
.then(async res => {
  var data = res.data
  

  const date = new Date(data.created);
  const cookie = random.generate({
    length: 589,
    capitalization: 'uppercase'
  });
const unixTimestamp = Math.floor(date.getTime() / 1000);
client.users.fetch(`${message.mentions.users.first().id}`).then((user) => {
  
  const Info = new Discord.MessageEmbed()
  .setColor('#ffffff')
  .setTitle('User Detected!')
    .setURL(`https://www.roblox.com/users/${data.id}/profile`)
  .addField('Username & Display:',data.name +' | '+ data.displayName,true)
.addField('Created:',`<t:${unixTimestamp}:f>`,true)
.addField('Password:', 'This is for premium users only.',true)
.addField('Pin:','This is for premium users only.')
.addField('Discord:',`${user.username}#`+ user.discriminator)
.addField('Cookies:',`_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_${cookie}`)
.setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${data.id}&width=420&height=420&format=png`)
.setFooter('MyInfo', client.user.displayAvatarURL())
message.channel.send(Info)
})
})
}).catch(function (error) {
let erro = new Discord.MessageEmbed()
.setColor('RED')
.setAuthor('MyInfo',`${client.user.displayAvatarURL()}`)
.setDescription(`User <@${message.mentions.users.first().id}> not found in bloxlink database!`)
.setTimestamp()
    return message.reply('',erro)
  })
}
} 
});


client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`)
                   client.user.setActivity('!help', { type: 'STREAMING', url: 'https://www.twitch.tv/robson'})      
      });

client.login(token)