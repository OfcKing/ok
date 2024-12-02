import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
let users = global.db.data.users;
let nacimientos = [];
let mentions = [];

for (let userId in users) {
let user = users[userId];
if (user.birth) {
    nacimientos.push(`@${userId.split('@')[0]}: ${user.birth}`);
mentions.push(userId + '@s.whatsapp.net');
}
}

if (nacimientos.length === 0) {
return conn.reply(m.chat, `✧ No hay fechas de nacimiento registradas en este grupo.`, m);
}

let mensaje = `✐ Fechas de nacimiento en el grupo:\n\n${nacimientos.join('\n')}`;
return conn.reply(m.chat, mensaje, m, { mentions });
};

handler.help = ['births']
handler.tags = ['rg']
handler.command = ['births']
export default handler;