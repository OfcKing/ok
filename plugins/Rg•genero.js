import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

if (!text) return conn.reply(m.chat, `✎ Selecciona el genero.\n1 » Masuculino "Hombre"\n2 » Femenino "Mujer"\n3 » Anónimo "Omitir"\n> Ejemplo: ${usedPrefix + command} 3`, m, fake)

function asignarGenero(text) {
if (text == 0 || text > 3) return conn.reply(m.chat, `✧ *${text}* no es válido.`, m);
let genero;
switch (text) {
case "1":
genero = "Hombre";
break;
case "2":
genero = "Mujer";
break;
case "3":
genero = "Anónimo";
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
return conn.sendMessage(m.chat, { text: `✎ Genero actualizado, genero:\n> » ${user.genero}`
}, { quoted: m });
}};

handler.help = ['genero']
handler.tags = ['rg']
handler.command = ['genero', 'género', 'gender'];
export default handler;