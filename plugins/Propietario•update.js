import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  m.reply('✐ Actualizando el bot...');

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      return conn.reply(m.chat, `✐ Error: No se pudo realizar la actualización.\nRazón: ${err.message}`, m);
    }
    if (stderr) {
      return conn.reply(m.chat, `✐ Error: Se produjo un problema durante la actualización.\nDetalles: ${stderr}`, m);
    }
    conn.reply(m.chat, `✐ Update: ${stdout}`, m);
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.rowner = true;  

export default handler;