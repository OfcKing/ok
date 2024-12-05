let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
    if (!text) return m.reply('✧ Debes enviar una invitacion para que *Yaemori* se una al grupo.');

    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply('✐ Enlace de invitación no válido.');

    if (isOwner) {
        await conn.groupAcceptInvite(code)
            .then(res => m.reply(`✓ Me he unido exitosamente al grupo.`))
            .catch(err => m.reply(`✗ Error al unirme al grupo.`));
    } else {
        // Si es un usuario común, enviar el enlace al propietario
        let message = `✐ Invitación a un grupo:\n${text}\n\nPor: @${m.sender.split('@')[0]}`;
        await conn.sendMessage('5218713339906' + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`✐ El link del grupo ha sido enviado, gracias por tu invitacion *ฅ^•ﻌ•^ฅ*`);
    }
};

handler.help = ['invite'];
handler.tags = ['owner', 'tools'];
handler.command = ['invite'];

export default handler;