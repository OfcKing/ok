import fg from 'api-dylux';
import axios from 'axios';
import cheerio from 'cheerio';
import { tiktok } from '@xct007/frieren-scraper';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { tiktokdl } from '@bochilteam/scraper';

const handler = async (m, { conn, text, args }) => {
  if (!text) return conn.reply(m.chat, '✐ Ingresa un enlace de TikTok.', m);
  if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) return conn.reply(m.chat, '✐ Enlace no válido.', m);

    const dataFn = await conn.getFile(`${CFROSAPI}/api/tiktokv2?url=${args[0]}`);
    const successMessage = `✐ Aquí tienes.`;
    await conn.sendMessage(m.chat, { video: dataFn.data, caption: successMessage }, { quoted: m });

  } catch (e) {
    try {
      const dataF = await tiktok.v1(args[0]);
      const successMessage = `✐ Aquí tienes.`;
      await conn.sendMessage(m.chat, { video: { url: dataF.play }, caption: successMessage }, { quoted: m });
    } catch (e1) {
      try {
        const tTiktok = await tiktokdlF(args[0]);
        const successMessage = `✐ Aquí tienes.`;
        await conn.sendMessage(m.chat, { video: { url: tTiktok.video }, caption: successMessage }, { quoted: m });
      } catch (e2) {
        try {
          const p = await fg.tiktok(args[0]);
          const successMessage = `✐ Aquí tienes.`;
          await conn.sendMessage(m.chat, { video: { url: p.nowm }, caption: successMessage }, { quoted: m });
        } catch (e3) {
          try {
            const { video } = await tiktokdl(args[0]);
            const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd;
            const successMessage = `✐ Aquí tienes.`;
            await conn.sendMessage(m.chat, { video: { url: url }, caption: successMessage }, { quoted: m });
          } catch {
            return conn.reply(m.chat, '✐ Ocurrió un error.', m);
          }
        }
      }
    }
  }
};

handler.tags = ['descargas'];
handler.help = ['tiktok'];
handler.command = ['tiktok', 'ttk', 'tt'];
handler.register = true;
export default handler;

async function tiktokdlF(url) {
  if (!/tiktok/.test(url)) return conn.reply(m.chat, '✐ Te faltó el enlace del video de TikTok.', m);
  const gettoken = await axios.get('https://tikdown.org/id');
  const $ = cheerio.load(gettoken.data);
  const token = $('#download-form > input[type=hidden]:nth-child(2)').attr('value');
  const param = { url, _token: token };
  const { data } = await axios.post('https://tikdown.org/getAjax?', new URLSearchParams(param), {
    headers: { 'content-type': 'application/x-www-form-urlencoded