import fetch from 'node-fetch';

const handler = async (m, { conn, text, args }) => {
  if (!text) return conn.reply(m.chat, '✐ Ingresa la URL del video de TikTok.', m);
  if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) return conn.reply(m.chat, '✐ Enlace no válido.', m);

  try {
    const tiktokAPI = `https://apis-starlights-team.koyeb.app/starlight/tiktok2?url=${text}`;
    const res = await fetch(tiktokAPI);
    const json = await res.json();

    if (!json || !json.url) throw new Error('API starlights no pudo obtener el video.');

    await conn.sendMessage(m.chat, { video: { url: json.video }, caption: `✐ Aqui tu video.` }, { quoted: m });
  } catch (e) {
    try {

      const dataFn = await conn.getFile(`https://apis-starlights-team.koyeb.app/starlight/tiktok2?url=${args[0]}`);
      const successMessage = `✧ TikTok sin marca de agua descargado con éxito.`;
      await conn.sendMessage(m.chat, { video: dataFn.data, caption: successMessage }, { quoted: m });
    } catch (e2) {
      conn.reply(m.chat, '✐ Ocurrió un error al descargar el video.', m);
      console.log(e2);
    }
  }
};

handler.help = ['tiktok', 'tt'];
handler.tags = ['descargas'];
handler.command = ['tiktok', 'tt'];
handler.chocolates = 1;
handler.register = true;

export default handler;