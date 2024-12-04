import { addExif } from '../lib/sticker.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) return m.reply(`✐ Por favor, responde a un sticker con el comando *${usedPrefix + command}* seguido del nuevo nombre y autor.\nEjemplo: *${usedPrefix + command} Nuevo Nombre|Autor*`);

  const sticker = await m.quoted.download();
  if (!sticker) return m.reply('✐ No se pudo descargar el sticker.');

  if (!text.includes('|')) return m.reply(`✐ Por favor, proporciona el nombre y autor del sticker separados por un |.\nEjemplo: *${usedPrefix + command} Nuevo Nombre|Autor*`);

  const [packname, author] = text.split('|');
  const exif = await addExif(sticker, packname.trim(), author.trim());

  await conn.sendMessage(m.chat, { sticker: exif }, { quoted: m });
};

handler.help = ['wm'];
handler.tags = ['sticker'];
handler.command = ['wm'];
handler.register = true;

export default handler;