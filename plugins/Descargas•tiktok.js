import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '✐ Ingresa la URL del video de TikTok.', m);

  const tiktokAPI = `https://deliriussapi-oficial.vercel.app/download/tiktok?url=${text}`;

  try {
    const res = await fetch(tiktokAPI);
    const json = await res.json();

   if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) return conn.reply(m.chat, '✐ Enlace no válido.', m);

    await conn.sendMessage(m.chat, { video: { url: json.org }, caption: `✐ Likes » ${json.like}\n✧ Comentarios » ${json.comment}\n♲︎ Author » ${json.username}` }, { quoted: m });

  } catch (e) {
    conn.reply(m.chat, '✐ Ocurrió un error al descargar el video.', m);
    console.log(e);
  }
};

handler.help = ['tiktok', 'tt'];
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
handler.chocolates = 1;
handler.register = true;

export default handler;