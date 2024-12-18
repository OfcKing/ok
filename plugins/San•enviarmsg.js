// By: @OfcKing  

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';
import { sticker } from '../senko/lib/sticker.js';
import uploadFile from '../senko/lib/uploadFile.js';
import uploadImage from '../senko/lib/uploadImage.js';
import { webp2png } from '../senko/lib/webp2mp4.js';

const id = global.channelid
const idgp = "120363351999685409@g.us"; 

var handler = async (m, { conn, text }) => {
    if (!m.quoted && !text) return conn.reply(m.chat, `🜸 Por favor, envie un texto o cita el contenido que deseas enviar.`, m);

    let messageType = 'un texto'; 
    let isMedia = false;
    let quoted, mime, mediax, htextos;

    try {
        quoted = m.quoted ? m.quoted : m;
        mime = (quoted.msg || quoted).mimetype || '';
        isMedia = /image|video|sticker|audio/.test(mime);
        htextos = `${text ? text : ''}`;

        if (isMedia && quoted.mtype === 'imageMessage') {
            mediax = await quoted.download?.();
            await conn.sendMessage(id, { image: mediax, caption: htextos || null }, { quoted: null });
            messageType = htextos ? 'una imagen con texto' : 'una imagen';
        } else if (isMedia && quoted.mtype === 'videoMessage') {
            mediax = await quoted.download?.();
            await conn.sendMessage(id, { video: mediax, caption: htextos || null }, { quoted: null });
            messageType = htextos ? 'un video con texto' : 'un video';
        } else if (isMedia && quoted.mtype === 'audioMessage') {
            mediax = await quoted.download?.();
            await conn.sendMessage(id, { audio: mediax, mimetype: 'audio/mp4', fileName: `san.mp3` }, { quoted: null });
            messageType = 'un audio';
        } else if (isMedia && quoted.mtype === 'stickerMessage') {
            mediax = await quoted.download?.();
            await conn.sendMessage(id, { sticker: mediax }, { quoted: null });
            messageType = 'un sticker';
        } else {
            await conn.relayMessage(id, { extendedTextMessage: { text: `${htextos}` } }, {});
            messageType = 'un texto';
        }

        let senderInfo = `✨️ *Senko San - MD* ✨️\n\n👤 Usuario » @${m.sender.split('@')[0]}\n🎋 Tipo » ${messageType}\n🪴 Mensaje » ${text ? text : 'No se incluyó ningun texto.'}`;
        await conn.sendMessage(idgp, { text: senderInfo, mentions: [m.sender] });

    } catch (err) {
        console.error('Error al enviar el mensaje:', err);
        m.reply('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.\n\n' + err);
    }
};

handler.help = ['enviar'];
handler.tags = ['main'];
handler.command = ['enviar', 'enviarmsg', 'sug', 'solicitud', 'enviarcanal'];
handler.register = true;

export default handler;