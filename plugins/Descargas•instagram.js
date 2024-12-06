import { igdl } from 'ruhend-scraper';

const handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🚩 Ingresa un enlace de Instagram.', m);
  }

  try {
    await m.react(rwait);
    const res = await igdl(args[0]);
    const data = res.data;

    for (let media of data) {
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', '✨️ Video de Instagram.', m);
    await m.react(done);
    }
  } catch (e) {
    return conn.reply(m.chat, '✖️ Ocurrió un error.', m);
  }
};

handler.command = ['instagram', 'ig'];
handler.tags = ['descargas'];
handler.help = ['instagram', 'ig'];
handler.chocolates = 1;
handler.register = true;

export default handler;