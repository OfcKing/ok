import fetch from 'node-fetch';

let handler = async (m, { conn, text, isRowner }) => {
  if (!text) return m.reply('✐ Por favor, proporciona un enlace a la imagen para actualizar el banner.\nEjemplo: *setbanner https://example.com/banner.jpg*');

  try {
    const response = await fetch(text);
    if (!response.ok) throw new Error('Error al descargar la imagen.');
    const buffer = await response.buffer();

    if (!isImageValid(buffer)) {
      return m.reply('✧ El archivo proporcionado no es una imagen válida.');
    }

    global.img = text;

    await conn.sendFile(m.chat, buffer, 'banner.jpg', '✐ Banner actualizado.', m);
  } catch (error) {
    console.error(error);
    m.reply('✧ Hubo un error al intentar cambiar el banner.');
  }
};

const isImageValid = (buffer) => {
  const magicBytes = buffer.slice(0, 4).toString('hex');

  if (magicBytes === 'ffd8ffe0' || magicBytes === 'ffd8ffe1' || magicBytes === 'ffd8ffe2') {
    return true;
  }

  if (magicBytes === '89504e47') {
    return true;
  }

  if (magicBytes === '47494638') {
    return true;
  }

  return false; 
};

handler.help = ['setbanner'];
handler.tags = ['tools'];
handler.command = ['setbanner'];
handler.rowner = true;

export default handler;