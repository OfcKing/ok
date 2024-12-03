import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
  let userId = m.sender;
  let user = global.db.data.users[userId];
  let mentionedJid = [userId];

  let name = conn.getName(userId);
  let cumpleanos = user.birth || 'No especificado';
  let genero = user.genre || 'No especificado';
  let pareja = user.marry || 'No especificado';
  let exp = user.exp || 0;
  let nivel = user.level || 0;
  let chocolates = user.chocolates || 0;

  let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg');

  let profileText = `
ᥫ᭡ *Perfil* @${userId.split('@')[0]}

✧ *Cumpleaños* » ${cumpleanos}
✧ *Género* » ${genero}
ᰔᩚ *Casado con* » ${pareja}

☆ *Experiencia* » ${exp}
✐ *Nivel* » ${nivel}
⛁ *Chocolates totales* » ${chocolates}
  `.trim();

  await conn.sendMessage(m.chat, { 
    text: profileText,
    contextInfo: {
      externalAdReply: {
        title: '✧ Perfil de Usuario ✧',
        body: packname,
        thumbnailUrl: perfil,
        sourceUrl: redes,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};

handler.help = ['profile'];
handler.tags = ['main'];
handler.command = ['profile', 'perfil'];
handler.register = true;

export default handler;