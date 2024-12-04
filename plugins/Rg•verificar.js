import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, args }) => {

  let user = global.db.data.users[m.sender];
  let delirius = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international')}`)
  let paisdata = delirius.data.result
  let mundo = paisdata ? `${paisdata.name} ${paisdata.emoji}` : 'Desconocido'
  let bio = 0, fechaBio
  let sinDefinir = '😿 Es privada'
  let biografia = await conn.fetchStatus(m.sender).catch(() => null)
  if (!biografia || !biografia[0] || biografia[0].status === null) {
   bio = sinDefinir
   fechaBio = "Fecha no disponible"
} else {
bio = biografia[0].status || sinDefinir
fechaBio = biografia[0].setAt ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", }) : "Fecha no disponible"
}
  let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://qu.ax/QGAVS.jpg')

  if (user.registered) return m.reply('✐ Ya estás registrado.');

  if (args.length < 2) return m.reply('✐ Por favor, proporciona tu nombre y edad.\nEjemplo: #reg Juan 25');

  let [name, age] = args;
  age = parseInt(age);
  if (isNaN(age)) return m.reply('✐ La edad debe ser un número válido.');

  user.name = name;
  user.age = age;
  user.descripcion = bio
  user.regTime = +new Date();
  user.registered = true;
  user.money += 100
  user.chocolates += 40
  user.exp += 300
  user.joincount += 20

  let mini = `🗃️ 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗔 𝗗 𝗢 🗃️\n`
  mini += `💭 *Nombre* » ${name}\n`
  mini += `🍁 *Edad* » ${age} años\n\n`
  mini += `🎁 𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:\n`
  mini += `🍫 *Chocolates* » 40\n`
  mini += `✨️ *Exp* » 300\n`
  mini += `💰 *Joincount* » 20\n`
  mini += `🪙 *Money* » 100`
await m.react('🗂')
//await m.reply(mini)
   await conn.sendMessage(m.chat, {
   text: mini,
   contextInfo: {
   externalAdReply: {
   title: '✧ Usuario Verificado ✧',
   body: packname,
   thumbnailUrl: pp, 
   sourceUrl: redes,
   mediaType: 1,
   showAdAttribution: true,
   renderLargerThumbnail: true
   }}}, { quoted: fkontak })

let chtxt = `
👤 *Usuario* » ${m.pushName || 'Anónimo'}
🌎 *Pais* » ${mundo}
🗃 *Verificación* » ${user.name}
🌺 *Edad* » ${user.age} años
👀 *Descripción* » ${user.descripcion} 
⏳ *Modificación de descripción* » ${fechaBio}
📆 *Fecha* » ${moment.tz('America/Bogota').format('DD/MM/YY')}
☁️ *Número de registro* »
⤷ ${sn}
`.trim()
await conn.sendMessage(global.channelid, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔 】",
body: '🥳 ¡Un usuario nuevo en mi base de datos!',
thumbnailUrl: perfil,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
};

handler.help = ['reg'];
handler.tags = ['rg'];
handler.command = ['reg', 'register'];

export default handler;