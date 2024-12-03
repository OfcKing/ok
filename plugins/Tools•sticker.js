const { Sticker, createSticker, extractMetadata } = require('wa-sticker-formatter');

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) return conn.reply(m.chat, '✐ Responde a un sticker, imagen o video.', m);

  let mime = m.quoted.mimetype || '';
  if (!/webp|image|video/.test(mime)) return conn.reply(m.chat, '✐ Por favor, responde a un sticker, imagen o video.', m);

  let media = await m.quoted.download();
  if (!media) return conn.reply(m.chat, '✐ No se pudo descargar el archivo.', m);

  if (/webp/.test(mime)) {
    // Convertir sticker a imagen
    const sticker = new Sticker(media, { pack: 'Bot', author: 'Sticker' });
    const img = await sticker.toImage();

    await conn.sendMessage(m.chat, { image: img, caption: '✐ Aquí está tu imagen.' }, { quoted: m });
  } else if (/image/.test(mime)) {
    // Convertir imagen a sticker
    const sticker = await createSticker(media, { pack: 'Bot', author: 'Sticker' });

    await conn.sendMessage(m.chat, { sticker: sticker }, { quoted: m });
  } else if (/video/.test(mime)) {
    // Convertir video a sticker
    const sticker = await createSticker(media, { pack: 'Bot', author: 'Sticker' });

    await conn.sendMessage(m.chat, { sticker: sticker }, { quoted: m });
  }
};

handler.help = ['s', 'sticker'];
handler.tags = ['tools'];
handler.command = ['s', 'sticker'];

export default handler;