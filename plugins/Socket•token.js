import fs from 'fs'

async function handler(m, {usedPrefix}) {

const user = m.sender.split('@')[0]
if (fs.existsSync(`./${jadi}/` + user + '/creds.json')) {
let token = Buffer.from(fs.readFileSync(`./${jadi}/` + user + '/creds.json'), 'utf-8').toString('base64')    

await conn.reply(m.chat, `✐ Aquí tienes el token del sub-bot:`, m)
await conn.reply(m.chat, token, m, fake)
} else {
await conn.reply(m.chat, `✧ No tienes token de sub-bot, crea uno usando: !serbot`, m)
}

}
handler.help = ['token']
handler.command = ['token']
handler.tags = ['socket']
handler.private = true

export default handler 