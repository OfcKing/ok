import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa la URL del video de TikTok.', m);

  const tiktokAPI = `https://apis-starlights-team.koyeb.app/starlight/tiktok2?url=${text}`;

  try {
    const res = await fetch(tiktokAPI);
    const json = await res.json();

    if (!json || !json.video) return conn.reply(m.chat, '⚠️ No se pudo descargar el video. Verifica que la URL sea correcta.', m);

    await conn.sendMessage(m.chat, { video: { url: json.video }, caption: '✨️ Aquí tienes tu video descargado de TikTok.' }, { quoted: m });

  } catch (e) {
    conn.reply(m.chat, '✖️ Ocurrió un error al descargar el video.', m);
    console.log(e);
  }
};

handler.help = ['tiktok', 'tt'];
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
handler.chocolates = 1;
handler.register = true;

export default handler;