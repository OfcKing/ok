import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text }) => {
  if (!m.quoted) return m.reply('✐ Responde a un sticker y el nombre que quiere que le ponga al sticker.')
  let stiker = false
  try {
   await m.react(rwait)
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return m.reply('✐ Responde a un sticker')
    let img = await m.quoted.download()
    if (!img) return m.reply('⚠ *Responde a un sticker!*')
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
  // await conn.reply(m.chat, global.wait, m)
     if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: `=͟͟͞𝐘𝐚𝐞𝐦𝐨𝐫𝐢 𝐁𝐨𝐭⏤͟͟͞͞★`, body: `✐ Sticker By • YaemoriBot`, mediaType: 2, sourceUrl: redes, thumbnail: icons}}}, { quoted: m })
  await m.react(done)
     throw '✧ *La conversión falló.*'
  }
}
handler.help = ['wm *<nombre>|<autor>*']
handler.tags = ['tools']
handler.command = ['wm'] 
handler.register = true

export default handler