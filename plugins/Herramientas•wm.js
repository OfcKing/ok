import { addExif } from '../lib/sticker.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) {
    return m.reply(`✐ Por favor, responde a un sticker con el comando *${usedPrefix + command}* seguido del nuevo nombre.\nEjemplo: *${usedPrefix + command} Nuevo Nombre*`);
  }

  const mime = m.quoted.mimetype || '';
  if (!/webp|image/.test(mime)) {
    return m.reply('✐ Por favor, responde a un sticker válido.');
  }

  const sticker = await m.quoted.download();
  if (!sticker) {
    return m.reply('✐ No se pudo descargar el sticker.');
  }

  const texto = text.trim() || 'MiPaquete';
  const exif = await addExif(sticker, texto);

  conn.sendFile(m.chat, exif, 'wm.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: `=͟͟͞𝐘𝐚𝐞𝐦𝐨𝐫𝐢 𝐁𝐨𝐭⏤͟͟͞͞★`, body: `✐ Sticker By • YaemoriBot`, mediaType: 2, sourceUrl: redes, thumbnail: icons}}}, { quoted: m })
};

handler.help = ['wm'];
handler.tags = ['tools'];
handler.command = ['wm'];
handler.register = true;

export default handler;