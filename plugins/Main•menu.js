let tags = {
  'main': '𝙸𝙽𝙵𝙾',
  'buscador': '𝙱𝚄́𝚂𝚀𝚄𝙴𝙳𝙰𝚂',
 // 'fun': '𝙹𝚄𝙴𝙶𝙾𝚂',
 // 'serbot': '𝙹𝙰𝙳𝙸𝙱𝙾𝚃𝚂',
 // 'rpg': '𝚁𝙿𝙶',
  'rg': '𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙾',
 // 'xp': '𝙴𝚇𝙿',
 // 'sticker': '𝚂𝚃𝙸𝙲𝙺𝙴𝚁𝚂',
 // 'anime': '𝙰𝙽𝙸𝙼𝙴𝚂',
 // 'fix': '𝙵𝙸𝚇𝙶𝙼𝚂𝙴𝚂𝙿𝙴𝙴𝙰',
  'grupo': '𝙶𝚁𝚄𝙿𝙾𝚂',
  'nable': '𝙴𝙽𝙰𝙱𝙻𝙴 - 𝙳𝙸𝚂𝙰𝙱𝙻𝙴', 
  'descargas': '𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚂',
  'tools': '𝙷𝙴𝚁𝚁𝙰𝙼𝙸𝙴𝙽𝚃𝙰𝚂',
 // 'info': '𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝙲𝙸𝙾́𝙽',
 // 'nsfw': '𝙽𝚂𝙵𝚆', 
  'owner': '𝙿𝚁𝙾𝙿𝙸𝙴𝚃𝙰𝚁𝙸𝙾', 
 // 'audio': '𝙰𝚄𝙳𝙸𝙾𝚂', 
 // 'ai': '𝙸𝙰 - 𝙰𝙸',
 // 'transformador': '𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝙳𝙾𝚁𝙴𝚂',
};

let handler = async (m, { conn }) => {
  let menuText = '「✧ Bot Menú ✧」\n\n';
  
  for (let tag in tags) {
    menuText += `*${tags[tag]}*\n`;
    let commands = Object.keys(global.db.data.sticker).filter(cmd => global.db.data.sticker[cmd].tags && global.db.data.sticker[cmd].tags.includes(tag));
    commands.forEach(cmd => {
      menuText += `- ${usedPrefix}${cmd}\n`;
    });
    menuText += '\n';
  }

  await conn.sendMessage(m.chat, { text: menuText }, { quoted: m });
};

handler.help = ['menú'];
handler.tags = ['main'];
handler.command = ['menú', 'menu'];

export default handler;