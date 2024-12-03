import fetch from 'node-fetch';

const handler = async (m, { conn, isAdmin, isOwner, usedPrefix, command }) => {
 if (!m.isGroup) return conn.reply(m.chat, `✧ Este comando solo puede usarse en grupos`, m);
 if (!isAdmin) return conn.reply(m.chat, `✧ Este comando solo puede ser usado por administradores`, m);
  
  let chat = global.db.data.chats[m.chat];
  
  if (!chat.antiBot && command !== 'enableantibot') {
   // return conn.reply(m.chat, `✧ La función antibot no está activa en este grupo. Usa *${usedPrefix}enableantibot* para activarla.`, m);
  }
  
  if (command === 'enableantibot') {
    chat.antiBot = true;
    return conn.reply(m.chat, `✧ La función antibot ha sido activada. Ahora, los bots que no sean administradores serán eliminados automáticamente.`, m);
  }
  
  if (command === 'disableantibot') {
    chat.antiBot = false;
    return conn.reply(m.chat, `✧ La función antibot ha sido desactivada.`, m);
  }
  
  let participants = await conn.groupMetadata(m.chat).catch(_ => null) || {}
  let bots = participants.filter(member => member.isBot && !member.isAdmin);
  
  if (bots.length === 0) {
    return conn.reply(m.chat, `✧ No hay bots en este grupo o todos los bots son administradores.`, m);
  }

  for (let bot of bots) {
    await conn.groupParticipantsUpdate(m.chat, [bot.jid], 'remove')
  }
  
 // conn.reply(m.chat, `✧ Los bots que no son administradores han sido eliminados del grupo.`, m);
};

handler.help = ['enableantibot', 'disableantibot', 'checkbots'];
handler.tags = ['admin'];
handler.command = ['enableantibot', 'disableantibot', 'checkbots'];
//handler.group = true
//handler.isAdmin = true

export default handler;