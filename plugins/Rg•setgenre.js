import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

if (!text) return conn.reply(m.chat, `✧ Debes ingresar un genero valido.\n> Ejemplo » *${usedPrefix + command} hombre*`, m);

function asignarGenre(text) {
if (text == 0 || text > 3) return conn.reply(m.chat, `✧ Debes ingresar un genero valido.\n> Ejemplo » *${usedPrefix + command} hombre*`, m);
let genre;
switch (text) {
case "hombre":
genre = "Hombre";
break;
case "mujer":
genre = "Mujer";
break;
default:
return conn.reply(m.chat, `✦ Recuerda elegir el genero.\n> Ejemplo: ${usedPrefix + command} hombre`, m);
}
return genre;
    }
let genre = asignarGenre(text);
if (!genre) return;

let user = global.db.data.users[m.sender];
user.genre = genre;

if (user.genero) {
return conn.reply(m.chat, `✐ Se ha establecido tu genero como: *${user.genre}*!`, m)
}};

handler.help = ['setgenre']
handler.tags = ['rg']
handler.command = ['setgenero', 'setgenre']
export default handler;
