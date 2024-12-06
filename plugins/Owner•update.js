import { exec } from 'child_process';

let handler = async (m, { conn }) => {
 // m.reply('✐ Actualizando el bot...');
    await m.react(rwait);

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `✖️ Error: No se pudo realizar la actualización.\nRazón: ${err.message}`, m);
      await m.react(rwait);
      return;
    }

    if (stderr) {
      console.warn('Advertencia durante la actualización:', stderr);
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, '✨️ El bot ya está actualizado.', m);
      await m.react(done);
    } else {
      conn.reply(m.chat, `🚀 Actualización realizada con éxito.\n\n${stdout}`, m);
      await m.react(done);
    }
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.rowner = true;

export default handler;