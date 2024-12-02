import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

let user = global.db.data.users[m.sender];

if (user.genre) {
return conn.reply(m.chat, `✧ Ya tienes un genero establecido, si quieres borrar el genero actual usa:\n> » ${usedPrefix}delgenre`, m);
}

if (!text) return conn.reply(m.chat, `✧ Debes ingresar un genero válido.\n> Ejemplo » *${usedPrefix + command} hombre*`, m);

function asignarGenre(text) {
let genre;
switch (text.toLowerCase()) {
case "hombre":
genre = "Hombre";
break;
case "mujer":
genre = "Mujer";
break;
default:
return conn.reply(m.chat, `✦ Recuerda elegir un género válido.\n> Ejemplo: ${usedPrefix + command} hombre`, m);
}
return genre;
}

let genre = asignarGenre(text);
if (!genre) return;

user.genre = genre;

if (user.genre) {
return conn.reply(m.chat, `✐ Se ha establecido tu genero como: *${user.genre}*!`, m);
👤 *Usuario* » ${m.pushName || 'Anónimo'}
♻️ *Género* » ${user.genre}
📆 *Fecha* » ${moment.tz('America/Bogota').format('DD/MM/YY')}
`.trim()
await conn.sendMessage(global.channelid, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
body: '🙌 ¡Set Genre!',
thumbnailUrl: icons,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
}};

handler.help = ['setgenre']
handler.tags = ['rg']
handler.command = ['setgenero', 'setgenre']
export default handler;