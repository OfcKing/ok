let handler = async (m, { conn }) => {
  const img = ['https://qu.ax/zzWdD.jpg', 'https://qu.ax/LkHoh.jpg', 'https://qu.ax/JceST.jpg']

  let txt = `
✧ *Menú de Comandos* ✧

✐ *#s • #sticker*
> ➣ Realiza un sticker.

✐ *#token • #gettoken*
> ➣ Obtén el token del socket.

✐ *#socket • #bots*
> ➣ Ver todos loa sockets activos.

✐ *#serbot • #serbot --code*
> ➣ Convierte en un socket.

✐ *#comprarpremium*
> ➣ Usar el bot sin limíte

✐ *#reg • #verificar • #register*
> ➣ Registra tu nombre y edad en el bot.

✐ *#unreg*
> ➣ Elimina tu registro del bot.

✐ *#setgenre • #setgenero*
> ➣ Establece tu género en el perfil del bot.

✐ *#delgenre • #delgenero*
> ➣ Elimina tu género del perfil del bot.

✐ *#setbirth • #setnacimiento*
> ➣ Establece tu fecha de nacimiento en el perfil del bot.

✐ *#delbirth • #delnacimiento*
> ➣ Elimina tu fecha de nacimiento del perfil del bot.

✐ *#setdescription • #setdesc*
> ➣ Establece una descripción en tu perfil del bot.

✐ *#deldescription • #deldesc*
> ➣ Elimina la descripción de tu perfil del bot.

✐ *#profile*
> ➣ Muestra tu perfil de usuario.

✐ *#marry*
> ➣ Propón matrimonio a otro usuario.

✐ *#hidetag*
> ➣ Envia un mensaje mencionando a todos los usuarios

✐ *#tourl*
> ➣ Convierte imagen en url.

✐ *#tiktok • #tt*
> ➣ Descarga videos de TikTok.

✐ *#pinterest*
> ➣ Busca y descarga imágenes de Pinterest.

✐ *#play •#play2*
> ➣ Descarga música/video de YouTube.

✐ *#fb • #facebook*
> ➣ Descarga videos de Facebook.

✐ *#ig • #instagram*
> ➣ Descarga contenido de Instagram.

✐ *#imagen*
> ➣ Busca y descarga imágenes desde Internet.
  `.trim();

  await conn.sendMessage(m.chat, {text: txt, contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterName: channelRD.name, newsletterJid: channelRD.id, }, externalAdReply: { title: packname, body: dev, thumbnailUrl: img.getRandom(), sourceUrl: redes, mediaType: 1, renderLargerThumbnail: true }}}, {quoted: fkontak})
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'ayuda'];
handler.register = true;

export default handler;