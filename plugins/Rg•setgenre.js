import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

if (!text) return conn.reply(m.chat, `✧ Debes ingresar un genero válido.\n> Ejemplo » *${usedPrefix + command} hombre*`, m);

let user = global.db.data.users[m.sender];

if (user.genre) {
return conn.reply(m.chat, `✧ Ya tienes un genero establecido: *${user.genre}*. Si deseas cambiarlo, por favor borra tu género actual primero con el comando *${usedPrefix}delgenero*`, m);
}

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
}};

handler.help = ['setgenero']
handler.tags = ['rg']
handler.command = ['setgenero', 'setgenre']
export default handler;