import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
let users = global.db.data.users;
let nacimientos = [];

for (let userId in users) {
let user = users[userId];
if (user.fechaNacimiento) {
nacimientos.push(`@${userId.split('@')[0]}: ${user.fechaNacimiento}`);
}
}

if (nacimientos.length === 0) {
return conn.reply(m.chat, `✧ No hay fechas de nacimiento registradas en este grupo.`, m);
}

let mensaje = `✐ Fechas de nacimiento en el grupo:\n\n${nacimientos.join('\n')}`;
return conn.reply(m.chat, mensaje, m, {
    mentions: nacimientos.map(n => n.split(':')[0] + '@s.whatsapp.net')
});
};

handler.help = ['births']
handler.tags = ['rg']
handler.command = ['births']
export default handler;