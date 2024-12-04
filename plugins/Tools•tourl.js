import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    if (!m.quoted) return m.reply(`✐ Por favor, responde a una imagen con el comando *${usedPrefix + command}* para convertirla en una URL.`);

    const mime = m.quoted.mimetype || '';
    if (!mime.includes('image')) return m.reply('✐ El archivo citado no es una imagen.');

    const media = await m.quoted.download();
    if (!media) return m.reply('✐ No se pudo descargar la imagen. Asegúrate de que estás respondiendo a una imagen.');

    let url = '';
    
    if (mime.startsWith('image')) {
      url = await uploadImage(media);
    } else {
      url = await uploadFile(media);
    }

    if (!url) return m.reply('✐ No se pudo subir la imagen.');

    m.reply(`✧ Aquí está tu URL:\n> » ${url}`);
  } catch (error) {
    console.error(error);
    m.reply('✐ Hubo un error al intentar convertir la imagen en una URL.');
  }
};

handler.help = ['tourl'];
handler.tags = ['tools'];
handler.command = ['tourl'];
handler.register = true;

export default handler;