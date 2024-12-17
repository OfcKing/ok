import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'User-Agent': 'GoogleBot',
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}}

global.asistencia = 'https://wa.me/message/O4QPPHZOFDOJI1'
var canal = 'https://whatsapp.com/channel/0029VaQD7LAJP216tu9liI2A'
var canal2 = 'https://whatsapp.com/channel/0029VayCRH2Jf05m1wzaBi1Y'
var youtube = 'https://www.youtube.com/@OfcDiego'
var tt = 'https://tiktok.com/@dev_diego'
var gmail = 'thesenkobot@gmail.com'
var dash = 'https://dash.skyultraplus.com'
var panel = 'https://panel.skyultraplus.com'

global.redes = [canal, canal2, youtube, tt, gmail, dash, panel].getRandom()
    
    //fechas
global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString('es', {month: 'long'})
global.año = d.toLocaleDateString('es', {year: 'numeric'})
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

//ids channel
global.channelid = '120363370415738881@newsletter'
global.idchannels = ["120363370415738881@newsletter", "120363263466636910@newsletter"]
global.nombrechannels = [".•♫•♬• 𝐒𝐞𝐧𝐤𝐨 𝐍𝐨𝐭𝐢𝐟𝐲 •♬•♫•.", "© All Rightd Reserved • SenkoBot"]
global.channels = await getRandomChannel()
global.namechannel = 'Senko San - Channel ✨️'

//tags
global.nombre = m.pushName || 'Anónimo'
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channels.id, newsletterName: channels.name, serverMessageId: -1 }
}}, { quoted: m }

global.icono = [ 
'https://qu.ax/EEJPp.jpg',
'https://qu.ax/ufDEw.jpg',
'https://qu.ax/ZiCHQ.jpg'
].getRandom()

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channels.id, serverMessageId: 100, newsletterName: channels.name, }, externalAdReply: { showAdAttribution: true, title: namebot, body: dev, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, }, }}

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
  }

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * idchannels.length)
let id = idchannels[randomIndex]
let name = nombrechannels[randomIndex]
return { id, name }
}