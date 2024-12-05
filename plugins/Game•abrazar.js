import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
else who = m.chat
if (!who) return conn.reply(m.chat, '🚩 Menciona al usuario con *@user*', m, rcanal);
if (usedPrefix == 'a' || usedPrefix == 'A') return;
let url = ["https://telegra.ph/file/4d80ab3a945a8446f0b15.mp4", "https://telegra.ph/file/ef3a13555dfa425fcf8fd.mp4", "https://telegra.ph/file/582e5049e4070dd99a995.mp4", "https://telegra.ph/file/ab57cf916c5169f63faee.mp4", "https://telegra.ph/file/fce96960010f6d7fc1670.mp4", "https://telegra.ph/file/33332f613e1ed024be870.mp4"].getRandom();
try {
const locale = 'es-ES';
let name = conn.getName(m.sender);
let name2 = conn.getName(who);
const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
const document = doc[Math.floor(Math.random() * doc.length)];
let stiker = await sticker(null, url, `${name} está alimentando a ${name2}`)
if (m.isGroup) {
conn.sendFile(m.chat, stiker, null, { asSticker: true });
} else {
conn.sendFile(m.chat, stiker, null, { asSticker: true });
}
} catch {
conn.reply(m.chat, '🍟 *¡Ocurrio un error!*', m, fake);
}};

handler.help = ['hug *<@user>*']
handler.tags = ['fun'];
handler.command = ['abrazar', 'hug', 'abrazo'];
handler.register = true;
export default handler;