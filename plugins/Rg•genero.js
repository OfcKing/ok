import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

if (!text) return conn.reply(m.chat, `✧ Debes ingresar un genero valido.\n> Ejemplo » *${usedPrefix + command} hombre*`, m);

function asignarGenero(text) {
if (text == 0 || text > 3) return conn.reply(m.chat, `✧ Debes ingresar un genero valido.\n> Ejemplo » *${usedPrefix + command} hombre*`, m);
let genero;
switch (text) {
case "hombre":
genero = "Hombre";
break;
case "mujer":
genero = "Mujer";
break;
default:
return conn.reply(m.chat, `✦ Recuerda elegir el genero.\n> Ejemplo: ${usedPrefix + command} 3`, m);
}
return genero;
    }
let genero = asignarGenero(text);
if (!genero) return;

let user = global.db.data.users[m.sender];
user.genero = genero;

if (user.genero) {
return conn.reply(m.chat, `✐ Se ha establecido tu genero como: *${user.genero}*!`, m)
}};

handler.help = ['setgenre']
handler.tags = ['rg']
handler.command = ['setgenero', 'setgenre']
export default handler;