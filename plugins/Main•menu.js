let handler = async (m, { conn }) => {
  const img = ['https://qu.ax/zzWdD.jpg', 'https://qu.ax/LkHoh.jpg', 'https://qu.ax/JceST.jpg']

  let txt = `
✧ *Menú de Comandos* ✧

✐ *#s • #sticker*
  └─ Descripción: Realiza un sticker.

✐ *#token • #gettoken*
  └─ Descripción: Obtén el token del socket.

✐ *#socket • #bots*
  └─ Descripción: Ver todos loa sockets activos.

✐ *#serbot • #serbot --code*
  └─ Descripción: Convierte en un socket.

✐ *#comprarpremium*
  └─ Descripción: Usar el bot sin limíte

✐ *#reg • #verificar • #register*
  └─ Descripción: Registra tu nombre y edad en el bot.

✐ *#unreg*
  └─ Descripción: Elimina tu registro del bot.

✐ *#setgenre • #setgenero*
  └─ Descripción: Establece tu género en el perfil del bot.

✐ *#delgenre • #delgenero*
  └─ Descripción: Elimina tu género del perfil del bot.

✐ *#setbirth • #setnacimiento*
  └─ Descripción: Establece tu fecha de nacimiento en el perfil del bot.

✐ *#delbirth • #delnacimiento*
  └─ Descripción: Elimina tu fecha de nacimiento del perfil del bot.

✐ *#setdescription • #setdesc*
  └─ Descripción: Establece una descripción en tu perfil del bot.

✐ *#deldescription • #deldesc*
  └─ Descripción: Elimina la descripción de tu perfil del bot.

✐ *#profile*
  └─ Descripción: Muestra tu perfil de usuario.

✐ *#marry*
  └─ Descripción: Propón matrimonio a otro usuario.

✐ *#hidetag*
  └─ Descripción: Menciona a todos los usuarios del grupo sin notificaciones.

✐ *#tiktok • #tt*
  └─ Descripción: Descarga videos de TikTok.

✐ *#pinterest*
  └─ Descripción: Busca y descarga imágenes de Pinterest.

✐ *#play •#play2*
  └─ Descripción: Descarga música/video de YouTube.

✐ *#fb • #facebook*
  └─ Descripción: Descarga videos de Facebook.

✐ *#ig • #instagram*
  └─ Descripción: Descarga contenido de Instagram.

✐ *#imagen*
  └─ Descripción: Busca y descarga imágenes desde Internet.
  `.trim();

  await conn.sendMessage(m.chat, {text: txt, contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterName: channelRD.name, newsletterJid: channelRD.id, }, externalAdReply: { title: packname, body: dev, thumbnailUrl: img.getRandom(), sourceUrl: redes, mediaType: 1, renderLargerThumbnail: true }}}, {quoted: fkontak})
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'ayuda'];
handler.register = true;

export default handler;