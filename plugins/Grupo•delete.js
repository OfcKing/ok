const handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `🚩 Responde al mensaje que deseas eliminar.`, m, rcanal);

try {
let delet = m.message.extendedTextMessage.contextInfo.participant;
let bang = m.message.extendedTextMessage.contextInfo.stanzaId;

await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }}, { quoted: false });
} catch {
await conn.sendMessage(m.chat, { delete: m.quoted.vM.key }, { quoted: false });
}};

handler.help = ['delete'];
handler.tags = ['grupo'];
handler.command = ['delete', 'del'];
handler.group = false;
handler.admin = true;
handler.botAdmin = true;

export default handler;