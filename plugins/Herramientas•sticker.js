import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

const handler = async (m, { conn, text }) => {
  if (!m.quoted) return conn.reply(m.chat, '✐ Responde a una imagen o video.', m);

  let mime = m.quoted.mimetype || '';
  if (!/image|video/.test(mime)) return conn.reply(m.chat, '✐ Por favor, responde a una imagen o video.', m);

  let media = await m.quoted.download();
  if (!media) return conn.reply(m.chat, '✐ No se pudo descargar el archivo.', m);

  try {
    if (/image/.test(mime)) {
      let img = await uploadImage(media);
      let name = m.pushName || 'Anónimo';
      let texto = `✐ YaemoriBot-MD\nAuthor:\nFecha:\nDia:\nCreador:`;
      let texto2 = `${vs}\n${name}\n${fecha}\n${dia}\nOfcKing`;
      let stiker = await sticker(false, img, `${texto}`, `${texto2}`);
      await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m });
    } else if (/video/.test(mime)) {
      let vid = await uploadFile(media);
      let stiker = await sticker(vid, false, `${texto}`, `${texto2}`);
        conn.sendFile(m.chat, stiker, 'wm.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: `=͟͟͞𝐘𝐚𝐞𝐦𝐨𝐫𝐢 𝐁𝐨𝐭⏤͟͟͞͞★`, body: `✐ Sticker By • YaemoriBot`, mediaType: 2, sourceUrl: redes, thumbnail: icons}}}, { quoted: m })
    }
  } catch (e) {
    conn.reply(m.chat, '✐ Ocurrió un error al crear el sticker.', m);
    console.log(e);
  }
};

handler.help = ['s', 'sticker'];
handler.tags = ['tools'];
handler.command = ['s', 'sticker'];
handler.register = true;

export default handler;