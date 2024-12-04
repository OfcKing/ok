let handler = async (m, { conn, command, usedPrefix, text, isRowner }) => {
  if (!text) return m.reply(`✐ Por favor, proporciona un nombre para el bot.\nEjemplo: ${usedPrefix + command} Yaemori`);

  global.botname = text.trim();
  
  m.reply(`✐ El nombre del bot ha sido cambiado a: ${global.botname}`);
};

handler.help = ['setname'];
handler.tags = ['tools'];
handler.command = ['setname'];
handler.rowner = false;

export default handler;