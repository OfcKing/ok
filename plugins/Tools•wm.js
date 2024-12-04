import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) return m.reply(`✐ Por favor, responde a un sticker con el comando *${usedPrefix + command}* seguido del nuevo nombre.`);

  const sticker = await m.quoted.download();
  if (!sticker) return m.reply('✐ No se pudo descargar el sticker.');

  if (!text) return m.reply(`✐ Por favor, proporciona un nuevo nombre para el sticker.\nEjemplo: *${usedPrefix + command} Nuevo Nombre*`);

  const newName = text.trim();
  
  const outputPath = path.join(__dirname, 'temp', `${newName}.webp`);
  fs.writeFileSync(outputPath, sticker);
  
  await conn.sendMessage(m.chat, { sticker: { url: outputPath } }, { quoted: m });

  fs.unlinkSync(outputPath);
};

handler.help = ['wm'];
handler.tags = ['tools'];
handler.command = ['wm'];
handler.register = true;

export default handler;