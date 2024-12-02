// - OfcKing >> https://github.com/OfcKing

import fs from 'fs';
import path from 'path';

const databaseFile = path.resolve('./src/database/casados.json');

let database = {};

function loadData(file) {
    if (fs.existsSync(file)) {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } else {
        return { users: {}, marriages: {}, adoptions: {}, subbots: {} };
    }
}

function saveData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

database = loadData(databaseFile);

function getMarriageDuration(date) {
    const now = new Date();
    const marriageDate = new Date(date);
    const duration = now - marriageDate;

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);

    return `${days} días, ${hours} horas y ${minutes} minutos`;
}

let handler = async (m, { command, usedPrefix, args }) => {
    const topMarriagesCmd = /^(topcasados)$/i.test(command);

    switch (true) {
        case topMarriagesCmd:
            let marriedCouples = Object.keys(database.marriages)
                .filter(jid => database.marriages[jid].partner) 
                .map(jid => {
                    return {
                        user: jid,
                        partner: database.marriages[jid].partner,
                        date: database.marriages[jid].date,
                        duration: getMarriageDuration(database.marriages[jid].date)
                    };
                })
                .sort((a, b) => new Date(database.marriages[a.user].date) - new Date(database.marriages[b.user].date))
                .slice(0, 10); // Mostrar el top 10 de casados

            marriedCouples.forEach((couple, index) => {
                let message = `💍 *Top 10 de Parejas Casadas* 💍\n\n✨ *${index + 1}.* @${couple.user.split('@')[0]} y @${couple.partner.split('@')[0]}\n📅 *Desde:* ${new Date(couple.date).toLocaleDateString()}\n🕒 *Duración:* ${couple.duration}\n\n`;
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