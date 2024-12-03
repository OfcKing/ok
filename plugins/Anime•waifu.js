import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
try {
let res = await fetch('https://deliriussapi-oficial.vercel.app/anime/waifu')
if (!res.ok) return
let result = await res.json()
//const result = json.data;
if (!result.image) return 
await conn.sendFile(m.chat, json.image, 'thumbnail.jpg', '✧ Nombre » ${result.title}\n✐ Tamaño » ${result.size}\n✿ Publicado » ${result.upload}\n♲︎ Likes » ${result.likes}', m)
} catch {
}}
handler.help = ['waifu']
handler.tags = ['anime']
handler.command = ['waifu']
handler.register = true 
export default handler