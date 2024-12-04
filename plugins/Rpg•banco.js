import db from '../lib/database.js'
let handler = async (m, {conn, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (who == conn.user.jid) return m.react('✖️')
   if (!(who in global.db.data.users)) return m.reply(`*El usuario no se encuentra en mi base de datos*`)
   let user = global.db.data.users[who]
   const texto = `${who == m.sender ? `🍄 Tienes: *${user.bank}* Chocolates en el banco.` : `🍄 Ese usuario tiene *${user.bank}* Chocolates en el Banco`}`

   await conn.reply(m.chat, texto, m, rcanal)
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = ['bank', 'banco'] 
handler.register = true 
export default handler 