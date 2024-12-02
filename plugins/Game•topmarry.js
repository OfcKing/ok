// - OfcKing >> https://github.com/OfcKing

import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('./src/database/casados.json');

function loadMarriages() {
if (fs.existsSync(marriagesFile)) {
const data = fs.readFileSync(marriagesFile, 'utf8');
return JSON.parse(data);
} else {
return {};
}}

let marriages = loadMarriages();

let handler = async (m, { conn, command, usedPrefix, args }) => {
const topMarryCmd = /^(topmarry)$/i.test(command);

switch (true) {
case topMarryCmd:
let marriedCouples = Object.keys(marriages)
.filter(jid => marriages[jid].partner) 
.map(jid => {
return {
user: jid
};
})

if (marriedCouples.length === 0) {
await conn.reply(m.chat, '✎ No hay parejas casadas.', m);
return;
}

let message = '💍 *Lista de Parejas Casadas* 💍\n\n';
marriedCouples.forEach((couple, index) => {
message += `✨ *${index + 1}.* @${couple.user.split('@')[0]} y @${couple.partner.split('@')[0]}\n\n`;
});

await conn.reply(m.chat, message, m, { mentions: marriedCouples.flatMap(couple => [couple.user, couple.partner]) });
break;
}}

handler.tags = ['fun']
handler.help = ['topmarry']
handler.command = ['topmarry']
handler.group = true
export default handler