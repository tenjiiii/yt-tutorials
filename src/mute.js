const { MessageEmbed } = require("discord.js");

const { MessageActionRow } = require("discord.js");

const { MessageButton } = require("discord.js");

module.exports = {

 name: "mute",

 description: "Mute anyone who break rules",

 category: "moderation",

 usage: "mute <@mention> <reason>",

 run: async (client, message, args) => {

if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('❌ **You do not have permissions to use this command.**')

const user = message.mentions.members.first();

 if(!user) {

 return message.channel.send("Please mention the member to who you want to mute")

 }

 

 if(user.id === message.author.id) {

 return message.channel.send("I won't mute you");

 }

 

 

 let reason = args.slice(1).join(" ")

 

 

 if(!reason) {

 return message.channel.send("Please Give the reason to mute the member")

 }

 

 let muterole = message.guild.roles.cache.find(x => x.name === "Muted")

 

 if(!muterole) {

 return message.channel.send("This server do not have role with name `Muted`")

 }

user.roles.add(muterole)

let sureEmbed = new MessageEmbed()

.setTitle("Mute")

.setDescription(`You muted **${message.mentions.users.first()}**For\`${reason}`)

.setColor("RED")

let unmuteEmbed = new MessageEmbed() //Feel free to edit embeds

.setTitle("Success!")

.setDescription(`Unmuted **${message.mentions.users.first()}`)

.setColor("RED")

.setFooter("Pog")

const button = new MessageActionRow().addComponents(

                new MessageButton()

                .setCustomId(`Unmute`)

                .setStyle(`DANGER`)

                .setLabel(`Unmute`)

                .setEmoji(`⚠️`)

            )

message.channel.send({ embeds: [sureEmbed], components: [button] })

 const collector = message.channel.createMessageComponentCollector({ filter: i => i.user.id === message.author.id, time: 5000 })

          

        collector.on('collect', async i => {

        if (i.customId === 'Unmute') {

            await i.update({

                embeds:[unmuteEmbed]

            })

            await user.roles.remove(muterole)

        }})

 }}

 

 //Made by Tenji
