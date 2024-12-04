import fs from 'fs';  
import path from 'path';  

let handler = async (m, { conn, isRowner }) => {
  try {
    if (!isSubBot()) {
      return m.reply('Este comando solo es funcional en subbots.');
    }

    const media = await m.quoted.download();

    if (!isImageValid(media)) {
      return m.reply('El archivo enviado no es una imagen válida.');
    }

    global.imagen1 = media;
    global.imagen2 = media;  
    global.imagen3 = media;

    m.reply('El banner fue actualizado');

  } catch (error) {
    console.error(error);
    m.reply('Hubo un error al intentar cambiar el banner.');
  }
};

const isSubBot = () => {
  return global.botName && global.botName.includes('SubBot');
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
handler.tags = ['socket'];    
handler.command = ['setban', 'setbanner'];  
handler.rowner = true;

export default handler;