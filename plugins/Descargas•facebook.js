import { igdl } from 'ruhend-scraper';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❏ Ingresa la URL del video de Facebook.`, m);

  try {
    const videoData = await igdl(text);
    if (!videoData || !videoData.url) return conn.reply(m.chat, `✧ No se pudo descargar el video. Verifica que la URL sea correcta.`, m);

    await conn.sendMessage(m.chat, { video: { url: videoData.url }, caption: `✐ Aquí tienes tu video descargado de Facebook.` }, { quoted: m });

  } catch (e) {
    conn.reply(m.chat, `✧ Ocurrió un error al descargar el video.`, m);
    console.log(e);
  }
};

handler.help = ['facebook', 'fb'];
handler.tags = ['descargas'];
handler.command = ['facebook', 'fb'];
handler.chocolates = 1;
handler.register = true;

export default handler;