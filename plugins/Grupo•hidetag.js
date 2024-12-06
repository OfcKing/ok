let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Por favor, ingresa un mensaje para enviar a todos los usuarios.', m);

  let participants = m.isGroup ? (await conn.groupMetadata(m.chat)).participants : [];
  let mentionedJid = participants.map(p => p.id);

  await conn.sendMessage(m.chat, { text: text, mentions: mentionedJid }, { quoted: null });
};

handler.help = ['hidetag'];
handler.tags = ['grupo'];
handler.command = ['hidetag'];
handler.group = true;
handler.admin = true;

export default handler;