let handler = async (m, { conn, text }) => {
  // Verificar si el usuario es un administrador o tiene permisos especiales
  let isAdmin = m.isGroup ? (m.sender === m.participant || m.participants.find(p => p.jid === m.sender).isAdmin) : true;
  if (!isAdmin) return conn.reply(m.chat, '✐ No tienes permiso para usar este comando.', m);

  // Verificar que se haya ingresado la cantidad de chocolates
  if (!text) return conn.reply(m.chat, '✐ Ingresa la cantidad de chocolates a agregar. Ejemplo: #addchocolates 50', m);

  let [mention, amount] = text.split(' ');
  amount = parseInt(amount);
  if (isNaN(amount)) return conn.reply(m.chat, '✐ La cantidad de chocolates debe ser un número.', m);

  let userId = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  let user = global.db.data.users[userId];

  // Agregar chocolates al usuario
  user.chocolates += amount;

  conn.reply(m.chat, `✐ Se han agregado ${amount} chocolates a @${userId.split('@')[0]}. Ahora tiene ${user.chocolates} chocolates.`, m, { mentions: [userId] });
};

handler.help = ['addchocolates'];
handler.tags = ['rpg'];
handler.command = ['addchocolates'];
handler.admin = true; 
handler.group = true; 

export default handler;