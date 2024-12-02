import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/casados.json');

let proposals = {}; 

function loadMarriages() {
    if (fs.existsSync(marriagesFile)) {
        const data = fs.readFileSync(marriagesFile, 'utf8');
        return JSON.parse(data);
    } else {
        return {};
    }
}

function saveMarriages(marriages) {
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
}

let marriages = loadMarriages(); 

let handler = async (m, { conn, command, usedPrefix, args }) => {
    const proposeCmd = /^(proponermatrimonio)$/i.test(command);
    const acceptCmd = /^(aceptarmatrimonio)$/i.test(command);
    const rejectCmd = /^(rechazarmatrimonio)$/i.test(command);
    const divorceCmd = /^(divorciarse)$/i.test(command);

    async function reportError(e) {
        await m.reply(`🌻 Ocurrió un error.`);
        console.log(e);
    }

    switch (true) {
        case proposeCmd:
            if (!m.mentionedJid || m.mentionedJid.length === 0) {
                await m.reply('Por favor, menciona a la persona a la que deseas proponer matrimonio.');
                return;
            }

            let proposer = m.sender;
            let proposee = m.mentionedJid[0];

            if (marriages[proposer]) {
                await m.reply(`Ya estás casado con ${conn.getName(marriages[proposer])}. No puedes proponer matrimonio a otra persona.`);
                return;
            }

            if (marriages[proposee]) {
                await m.reply(`${conn.getName(proposee)} ya está casado con ${conn.getName(marriages[proposee])}. No puedes proponer matrimonio a alguien que ya está casado.`);
                return;
            }

            if (proposer === proposee) {
                await m.reply('¡No puedes proponerte matrimonio a ti mismo!');
                return;
            }

            if (proposals[proposer]) {
                await m.reply('Ya has propuesto matrimonio. Espera a que respondan.');
                return;
            }

            proposals[proposer] = proposee;

            await conn.reply(proposee, `¡${conn.getName(proposer)} te ha propuesto matrimonio! Responde a este mensaje con el comando *${usedPrefix}aceptarmatrimonio* para aceptar o *${usedPrefix}rechazarmatrimonio* para rechazar.`, m);
            await m.reply('Tu propuesta de matrimonio ha sido enviada. Espera a que respondan.');
            break;

        case acceptCmd:
            if (marriages[m.sender]) {
                let currentPartner = conn.getName(marriages[m.sender]);
                await m.reply(`Ya estás casado con ${currentPartner}. No puedes aceptar otra propuesta de matrimonio.`);
                return;
            }

            if (!m.quoted || !m.quoted.sender || !proposals[m.quoted.sender] || proposals[m.quoted.sender] !== m.sender) {
                await m.reply('Debes responder al mensaje de propuesta de matrimonio para aceptarla.');
                return;
            }

            let acceptProposee = m.sender;
            let proposerKey = m.quoted.sender;

            delete proposals[proposerKey];

            let proposerName = conn.getName(proposerKey);
            let proposeeName = conn.getName(acceptProposee);

            // Añadir el matrimonio a la lista de matrimonios
            marriages[proposerKey] = acceptProposee;
            marriages[acceptProposee] = proposerKey;
            saveMarriages(marriages); // Guardar los matrimonios en el archivo

            await conn.reply(m.chat, `🎉 ¡Felicidades a ${proposerName} y ${proposeeName}! ¡Ahora están casados! 🎉`, m);
            break;

        case rejectCmd:
            if (marriages[m.sender]) {
                let currentPartner = conn.getName(marriages[m.sender]);
                await m.reply(`Ya estás casado con ${currentPartner}. No puedes rechazar otra propuesta de matrimonio.`);
                return;
            }

            if (!m.quoted || !m.quoted.sender || !proposals[m.quoted.sender] || proposals[m.quoted.sender] !== m.sender) {
                await m.reply('Debes responder al mensaje de propuesta de matrimonio para rechazarla.');
                return;
            }

            let rejectProposee = m.sender;
            let rejectProposerKey = m.quoted.sender;

            if (!proposals[rejectProposerKey] || proposals[rejectProposerKey] !== rejectProposee) {
                await m.reply('No tienes ninguna propuesta de matrimonio pendiente de esta persona.');
                return;
            }

            delete proposals[rejectProposerKey];

            let rejectProposerName = conn.getName(rejectProposerKey);
            let rejectProposeeName = conn.getName(rejectProposee);

            await conn.reply(rejectProposerKey, `${rejectProposeeName} ha rechazado tu propuesta de matrimonio.`, m);
            await m.reply(`Has rechazado la propuesta de matrimonio de ${rejectProposerName}.`);
            break;

        case divorceCmd:
            if (!m.mentionedJid || m.mentionedJid.length === 0) {
                await m.reply('Por favor, menciona a la persona de la que deseas divorciarte.');
                return;
            }

            let divorcingUser = m.sender;
            let partner = m.mentionedJid[0];

            if (!marriages[divorcingUser]) {
                await m.reply('No estás casado con nadie.');
                return;
            }

            if (marriages[divorcingUser] !== partner) {
                let actualPartner = conn.getName(marriages[divorcingUser]);
                await m.reply(`No estás casado con esta persona. Estás casado con ${actualPartner}.`);
                return;
            }

            delete marriages[divorcingUser];
            delete marriages[partner];
            saveMarriages(marriages); // Guardar los matrimonios en el archivo

            let divorcingUserName = conn.getName(divorcingUser);
            let partnerName = conn.getName(partner);

            await conn.reply(m.chat, `💔 ${divorcingUserName} y ${partnerName} se han divorciado. 💔`, m);
            break;

       // default:
         //   await m.reply(`Comando no reconocido. Usa *${usedPrefix}proponermatrimonio* para proponer matrimonio, *${usedPrefix}aceptarmatrimonio* para aceptar una propuesta, *${usedPrefix}rechazarmatrimonio* para rechazar una propuesta y *${usedPrefix}divorciarse* para divorciarse.`);
          //  break;
    }
}

handler.tags = ['fun']
handler.help = ['proponermatrimonio *@usuario*', 'aceptarmatrimonio', 'rechazarmatrimonio', 'divorciarse *@usuario*']
handler.command = ['proponermatrimonio', 'aceptarmatrimonio', 'rechazarmatrimonio', 'divorciarse']
handler.group = true
export default handler