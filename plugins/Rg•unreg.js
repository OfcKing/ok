import { createHash } from 'crypto';

let handler = async function (m, { conn, args }) {
  let user = global.db.data.users[m.sender];

  if (!user.registered) return m.reply('🌻 Tu no estás registrado.');

  user.registered = false;

  m.reply('✨️ Registro eliminado exitosamente.');
};

handler.help = ['unreg'];
handler.tags = ['rg'];
handler.command = ['unreg', 'unregister', 'deregister'];

export default handler;