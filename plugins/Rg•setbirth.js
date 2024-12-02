import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

if (!text) return conn.reply(m.chat, `《✧》Debes ingresar una fecha valida para tu cumpleaños.\n\n> ✐ Ejemplo » *${usedPrefix + command} 01/01/2000* (mes/dia/año)\n> ✐ Ejemplo 2 » *${usedPrefix + command} 01/01* (mes/dia)`, m);

function validarFechaNacimiento(text) {
const opcionesFecha = [
/^\d{1,2}\/\d{1,2}\/\d{4}$/, // dd/mm/yyyy or m/d/yyyy
/^\d{1,2}\/\d{1,2}$/, // dd/mm or m/d
];

let esValida = opcionesFecha.some(regex => regex.test(text));
if (!esValida) return conn.reply(m.chat, `✧ Debes ingresar una fecha de nacimiento válida.\n> Ejemplo » *${usedPrefix + command} 01/12/2024*`, m);

if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(text)) {
const [dia, mes, año] = text.split('/');
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${año}`;
}
return text;
}

let birth = validarFechaNacimiento(text);
if (!birth) return;

let user = global.db.data.users[m.sender];
user.birth = birth;

if (user.birth) {
return conn.reply(m.chat, `✐ Se ha establecido tu fecha de nacimiento como: *${user.birth}*!`, m)
}};

handler.help = ['setbirth']
handler.tags = ['rg']
handler.command = ['setbirth']
export default handler;