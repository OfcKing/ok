import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '✐ Ingresa el nombre de la canción o artista de Spotify.', m);

  const spotifySearchAPI = `https://deliriussapi-oficial.vercel.app/search/spotify?q=${text}`;

  try {
    const searchRes = await fetch(spotifySearchAPI);
    const searchJson = await searchRes.json();

    if (!searchJson || searchJson.length === 0) return conn.reply(m.chat, '✐ No se encontraron resultados. Verifica el nombre o el enlace.', m);

    const firstResult = searchJson[0];
    const spotifyDownloadAPI = `https://deliriussapi-oficial.vercel.app/download/spotifydlv3?url=${firstResult.url}`;

    const downloadRes = await fetch(spotifyDownloadAPI);
    const downloadJson = await downloadRes.json();

    if (!downloadJson || !downloadJson.url) return conn.reply(m.chat, '✐ No se pudo descargar la canción. Verifica que la URL sea correcta.', m);

    let mm = `✐ Título » ${downloadJson.title}\n✐ Artista » ${downloadJson.artist}\n❀ Álbum » ${downloadJson.album}\n♲︎ Duración » ${downloadJson.duration}`
    let img = downloadJson.image
    await conn.sendMessage(m.chat, {text: mm, contextInfo: {forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.wm, "containsAutoReply": true, "mediaType": 1, "thumbnail": img, "thumbnailUrl": img, "mediaUrl": downloadJson.url, "sourceUrl": downloadJson.url}}}, {quoted: fkontak});
    conn.sendMessage(m.chat, { audio: { url: downloadJson.url }, fileName: `${ttl}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })

  } catch (e) {
    conn.reply(m.chat, '✐ Ocurrió un error al descargar la canción.', m);
    console.log(e);
  }
};

handler.help = ['spotify', 'sp'];
handler.tags = ['descargas'];
handler.command = ['spotify', 'sp'];
handler.chocolates = 1;
handler.register = true;

export default handler;