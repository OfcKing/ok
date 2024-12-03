import axios from 'axios';

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❏ Ingresa un término de búsqueda.`, m);
  
  const api = `https://deliriussapi-oficial.vercel.app/search/gimage?query=${text}`;

  try {
    const res = await axios.get(api);
    const json = res.data;

    if (!json || !json.items || !json.items.length) return conn.reply(m.chat, `✧ No se encontraron resultados para "${text}".`, m);

    const result = json.items[Math.floor(Math.random() * json.items.length)];
    
    let message = `❀ Titulo » ${text}`;
    await conn.sendMessage(m.chat, { image: { url: result.preview }, caption: message }, { quoted: m });

  } catch (e) {
    conn.reply(m.chat, `✧ Ocurrió un error al buscar la imagen.`, m);
    console.log(e);
  }
};

handler.help = ['imagen'];
handler.tags = ['descargas'];
handler.command = ['imagen'];
handler.register =true;

export default handler;