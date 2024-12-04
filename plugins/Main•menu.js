let handler = async (m, { conn }) => {
let img = 'https://qu.ax/QGAVS.jpg'
let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

  let txt = `
𝐇𝐨𝐥𝐚! 𝐒𝐨𝐲 ${botname}
ᴀǫᴜɪ ᴛɪᴇɴᴇs ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs

⏤͟͟͞͞✦ Canal: ${channel}
⏤͟͟͞͞✦ Bot: ${botname}

✧ → ᴘᴀʀᴀ ᴄʀᴇᴀʀ ᴜɴ sᴜʙ-ʙᴏᴛ ᴄᴏɴ ᴛᴜ ɴᴜᴍᴇʀᴏ ᴜᴛɪʟɪᴢᴀ *#serbot* o *#serbot code*

»  ⊹˚• *Tools* ⊹

✐ *#s • #sticker*
> ➣ Realiza un sticker.
✐ *#wm*
> ➣ Cambiar el nombre del sticker.
✐ *#tourl*
> ➣ Convierte imagen en url.

»  ⊹˚• *Sockets* ⊹

✐ *#token • #gettoken*
> ➣ Obtén el token del socket.
✐ *#socket • #bots*
> ➣ Ver todos loa sockets activos.
✐ *#serbot • #serbot code • #serbot --code*
> ➣ Convierte en un socket.

»  ⊹˚• *Rg* ⊹

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

»  ⊹˚• *Grupo* ⊹

✐ *#hidetag*
> ➣ Envia un mensaje mencionando a todos los usuarios

»  ⊹˚• *Descargas* ⊹

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

await conn.sendMessage(m.chat, { image: { url: img }, caption: txt, contextInfo: { mentionedJid: [m.sender], isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1, }, forwardingScore: 999, externalAdReply: { title: botname, body: dev, thumbnailUrl: perfil, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false,
}, }, gifPlayback: true, gifAttribution: 0 }, { quoted: m })
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'ayuda'];
handler.register = true;

export default handler;