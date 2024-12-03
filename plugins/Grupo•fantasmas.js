let handler = async (m, { conn, usedPrefix, command, text, participants }) => {
  let inactiveUsers = participants.filter(member => !member.isAdmin && !member.isSuperAdmin && member.lastActive && Date.now() - member.lastActive > 7 * 24 * 60 * 60 * 1000); // 7 días de inactividad
  let inactiveList = inactiveUsers.map(member => `@${member.id.split('@')[0]}`).join('\n');

  if (command === 'fantasmas') {
    if (inactiveList.length === 0) {
      return conn.reply(m.chat, '✐ No hay usuarios inactivos.', m);
    }
    conn.reply(m.chat, `✐ Usuarios inactivos:\n${inactiveList}`, m, { mentions: inactiveUsers.map(u => u.id) });
  }

  if (command === 'kickfantasmas') {
    if (inactiveList.length === 0) {
      return conn.reply(m.chat, '✐ No hay usuarios inactivos para eliminar.', m);
    }

    for (let member of inactiveUsers) {
      await conn.groupParticipantsUpdate(m.chat, [member.id], 'remove');
    }
    conn.reply(m.chat, `✐ Usuarios inactivos eliminados:\n${inactiveList}`, m, { mentions: inactiveUsers.map(u => u.id) });
  }
};

handler.help = ['kickfantasmas', 'fantasmas'];
handler.tags = ['grupo'];
handler.command = ['kickfantasmas', 'fantasmas'];

handler.admin = true; 
handler.botAdmin = true;
handler.group = true; 

export default handler;