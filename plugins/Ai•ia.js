import fetch from 'node-fetch';

const apiEndpoint = 'https://Luminai.my.id';

let handler = async (m, { text, conn }) => {
  if (!text) return m.reply('✐ Por favor, ingresa una consulta para enviar a la API.');

  let response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: text })
  });

  if (!response.ok) {
    return m.reply('✐ Error al comunicarse con ChatGpt.');
  }

   const { key } = await conn.sendMessage(m.chat, {text: `❀ ChatGPT está procesando tu petición, espera unos segundos.`}, {quoted: m})

  let result = await response.json();

  if (result.error) {
    return m.reply(`✐ Error: ${result.error}`);
  }

  await conn.sendMessage(m.chat, {text: result.answer, edit: key})
};

handler.help = ['chatgpt'];
handler.tags = ['ai'];
handler.command = ['chatgpt', 'ask'];

export default handler;