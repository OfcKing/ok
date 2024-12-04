let handler = async (m, { conn }) => {
  const imageUrl = 'https://qu.ax/QGAVS.jpg'; // Reemplaza con la URL de la imagen que desees utilizar

  let menuText = `
✧ *Menú de Comandos* ✧

✐ *#s*
  └─ Descripción: Realiza una búsqueda en el bot.

✐ *#token*
  └─ Descripción: Obtén el token del bot.

✐ *#socket*
  └─ Descripción: Verifica el estado del socket del bot.

✐ *#serbot*
  └─ Descripción: Convierte el usuario en un bot temporal.

✐ *#comprarpremium*
  └─ Descripción: Compra una membresía premium para el bot.

✐ *#reg*
  └─ Descripción: Registra tu nombre y edad en el bot.

✐ *#unreg*
  └─ Descripción: Elimina tu registro del bot.

✐ *#setgenre*
  └─ Descripción: Establece tu género en el perfil del bot.

✐ *#delgenre*
  └─ Descripción: Elimina tu género del perfil del bot.

✐ *#setbirth*
  └─ Descripción: Establece tu fecha de nacimiento en el perfil del bot.

✐ *#delbirth*
  └─ Descripción: Elimina tu fecha de nacimiento del perfil del bot.

✐ *#setdescription*
  └─ Descripción: Establece una descripción en tu perfil del bot.

✐ *#deldescription*
  └─ Descripción: Elimina la descripción de tu perfil del bot.

✐ *#profile*
  └─ Descripción: Muestra tu perfil de usuario.

✐ *#marry*
  └─ Descripción: Propón matrimonio a otro usuario.

✐ *#hidetag*
  └─ Descripción: Menciona a todos los usuarios del grupo sin notificaciones.

✐ *#tiktok*
  └─ Descripción: Descarga videos de TikTok.

✐ *#pinterest*
  └─ Descripción: Busca y descarga imágenes de Pinterest.

✐ *#play*
  └─ Descripción: Descarga música desde YouTube.

✐ *#fb*
  └─ Descripción: Descarga videos de Facebook.

✐ *#ig*
  └─ Descripción: Descarga contenido de Instagram.

✐ *#imagen*
  └─ Descripción: Busca y descarga imágenes desde Internet.
  `.trim();

  await conn.sendMessage(m.chat, { 
    image: { url: imageUrl },
    caption: menuText 
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help', 'ayuda'];
handler.register = true;

export default handler;