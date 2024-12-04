import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, isRowner }) => {
  if (!m.quoted) return m.reply('✐ Por favor, responde a una imagen con el comando *setbanner* para actualizar la foto del menú.');

  const media = await m.quoted.download();
  if (!media) return m.reply('✐ No se pudo descargar la imagen. Asegúrate de que estás respondiendo a una imagen.');

  const bannerPath = path.join(__dirname, 'temp', 'menu-banner.jpg');
  fs.writeFileSync(bannerPath, media);

  global.imagen1 = bannerPath;
  m.reply('✐ El banner del menú ha sido actualizado con éxito.');
};

handler.help = ['setbanner'];
handler.tags = ['tools'];
handler.command = ['setbanner'];
handler.rowner = false;

export default handler;