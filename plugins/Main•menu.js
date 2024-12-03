let handler = async (m, { conn }) => {
  let menuText = `
「✧ Bot Menú ✧」

1. ✨ *#hidetag* - Menciona a todos los usuarios del grupo.
2. 💬 *#exec2* - Ejecuta comandos del sistema.
3. 🛠️ *#profile* - Muestra tu perfil de usuario.
4. 💍 *#marry @usuario* - Propón matrimonio a un usuario.
5. 💔 *#divorce* - Divórciate de tu pareja.
6. 🎧 *#spotify* - Descarga música de Spotify.
7. 🎥 *#tiktok* - Descarga videos de TikTok.
8. 💡 *#ideas* - Obtén ideas y sugerencias.
9. 🍫 *#addchocolates* - Agrega chocolates a un usuario.
10. 🌟 *#comprarpremium* - Compra membresía premium.

Para usar un comando, simplemente escribe el nombre del comando seguido de los parámetros necesarios.
¡Disfruta usando el bot!
  `.trim();

await conn.sendMessage(m.chat, { text: menuText }, { quoted: m });
};

handler.help = ['menú'];
handler.tags = ['main'];
handler.command = ['menú', 'menu'];

export default handler;