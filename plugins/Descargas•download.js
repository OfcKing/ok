import axios from 'axios';
import yts from 'yt-search';

async function downloadMusic(url) {
  try {
    const apiEndpoint = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiEndpoint);

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const downloadUrl = response.data.result.url;
    const musicResponse = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

    return {
      buffer: musicResponse.data,
      type: musicResponse.headers['content-type']
    };
  } catch (error) {
    console.error('Error al descargar la música:', error);
    throw error;
  }
}

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('✐ Por favor, ingresa una consulta para descargar música.\nEjemplo: #musica Bohemian Rhapsody');

  try {
    const searchResult = await yts(text);
    const video = searchResult.videos[0];

    if (!video) {
      return m.reply('✐ No se encontró ningún video con esa consulta.');
    }

    const music = await downloadMusic(video.url);
    const fileName = `${video.title.replace(/\s+/g, '_')}.mp3`;

    await conn.sendMessage(m.chat, { audio: music.buffer, mimetype: 'audio/mpeg', fileName }, { quoted: m });
  } catch (error) {
    m.reply('✐ Error al descargar la música. Por favor, intenta de nuevo.');
  }
};

handler.help = ['download'];
handler.tags = ['descargas'];
handler.command = ['download'];
handler.register = true;

export default handler;