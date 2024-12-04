import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  m.reply('✐ Actualizando el bot...');

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `✐ Error: No se pudo realizar la actualización.\nRazón: ${err.message}`, m);
      return;
    }

    if (stderr && !stdout.includes('Already up to date.')) {
      conn.reply(m.chat, `✐ Error: Se produjo un problema durante la actualización.\nDetalles: ${stderr}`, m);
      return;
    }

    conn.reply(m.chat, `✐ Update: ${stdout}`, m);
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.rowner = true;

export default handler;