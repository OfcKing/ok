import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `🚩 Ingresa un término de búsqueda.`, m);
  
  const pinterestAPI = `https://deliriussapi-oficial.vercel.app/search/pinterestv2?text=${text}`;

  try {
    await m.react(rwait);
    const res = await fetch(pinterestAPI);
    const json = await res.json();

    if (!json || !json.data || !json.data.length) return conn.reply(m.chat, `⚠️ No se encontraron resultados para "${text}".`, m);

    const result = json.data[Math.floor(Math.random() * json.data.length)];
    
    let message = `❀ Creador » ${result.username}\n✧ Titulo » ${result.title}\n✐ Likes » ${result.likes}\n♲︎ Publicado » ${result.created_at}`;
    await conn.sendMessage(m.chat, { image: { url: result.image }, caption: message }, { quoted: m });
    await m.react(done);

  } catch (e) {
    conn.reply(m.chat, `✖️ Ocurrió un error al buscar la imagen.`, m);
    await m.react(error);
    console.log(e);
  }
};

handler.help = ['pinterest'];
handler.tags = ['descargas'];
handler.command = ['pinterest'];
handler.register = true;

export default handler;