import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
let MessageType = (await import('@whiskeysockets/baileys')).default
let handler = async (m, { conn}) => {
try {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
else who = m.chat
if (!who) return m.reply(`🚩 Etiqueta o menciona a alguien`)
if(m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if(!m.mentionedJid.length) m.mentionedJid.push(m.sender)
let res = await fetch('https://nekos.life/api/v2/img/feed')
let json = await res.json()
let name = conn.getName(m.sender)
let name2 = conn.getName(who)
if (m.isGroup){
let { url } = json
let stiker = await sticker(null, url, `${name} está alimentando a ${name2}`)
conn.sendFile(m.chat, stiker, null, { asSticker: true })}
} catch (e) { }}
handler.help = ['alimentar']
handler.tags = ['fun']
handler.command = ['alimentar', 'food']
handler.group = true
export default handler