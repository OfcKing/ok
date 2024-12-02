// - OfcKing >> https://github.com/OfcKing

import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('./src/database/casados.json');

function loadMarriages() {
    if (fs.existsSync(marriagesFile)) {
        const data = fs.readFileSync(marriagesFile, 'utf8');
        return JSON.parse(data);
    } else {
        return {};
    }
}

let marriages = loadMarriages();

function getMarriageDuration(date) {
    const now = new Date();
    const marriageDate = new Date(date);
    const duration = now - marriageDate;

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);

    return `${days} días, ${hours} horas y ${minutes} minutos`;
}

let handler = async (m, { conn, command, usedPrefix, args }) => {
    const topMarryCmd = /^(topmarry)$/i.test(command);

    switch (true) {
        case topMarryCmd:
            let marriedCouples = Object.keys(marriages)
                .filter(jid => marriages[jid].partner) 
                .map(jid => {
                    return {
                        user: jid,
                        partner: marriages[jid].partner,
                        date: marriages[jid].date,
                        duration: getMarriageDuration(marriages[jid].date)
                    };
                })
                .sort((a, b) => new Date(marriages[a.user].date) - new Date(marriages[b.user].date))
                .slice(0, 10); // Mostrar el top 10 de casados

            let message = '💍 *Top 10 de Parejas Casadas* 💍\n\n';
            marriedCouples.forEach((couple, index) => {
                message += `✨ *${index + 1}.* @${couple.user.split('@')[0]} y @${couple.partner.split('@')[0]}\n📅 *Desde:* ${new Date(couple.date).toLocaleDateString()}\n🕒 *Duración:* ${couple.duration}\n\n`;
            });

            await conn.reply(m.chat, message, m, { mentions: marriedCouples.flatMap(couple => [couple.user, couple.partner]) });
            break;
    }
}

handler.tags = ['fun']
handler.help = ['topmarry']
handler.command = ['topmarry']
handler.group = true
export default handler