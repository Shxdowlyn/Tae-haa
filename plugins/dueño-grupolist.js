const handler = async (m, { conn }) => {
  let txt = '';
  try {    
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;
    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];
      const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
      const participantStatus = isParticipant ? '👤 Participante' : '❌ Ex participante';
      const totalParticipants = participants.length;
      txt += `
╔══════════════════════════╗
║       GRUPO ${i + 1}         ║
╚══════════════════════════╝

✦ Nombre        :: ${await conn.getName(jid)}
✦ Identificador :: ${jid}
✦ Control       :: ${isBotAdmin ? 'Disponible' : 'Denegado'}
✦ Estado        :: ${participantStatus}
✦ Miembros      :: ${totalParticipants}

───────────────
✦ Enlace
${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || '---'}` : 'No disponible'}
───────────────\n\n`;
    }
    m.reply(`╭━━━〔 SHADOW // REPORTE GLOBAL 〕━━━╮
┃
┃ Supervisión completada.
┃ Los dominios siguen bajo control.
┃
┣━━━〔 RESUMEN 〕━━━┫
┃ ✦ Dominios vigilados :: ${totalGroups}
┃
┣━━━〔 REGISTRO 〕━━━┫
${txt}
┃
╰━━━〔 Nada escapa a la sombra 〕━━━╯`.trim());
  } catch {
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;
    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];
      const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
      const participantStatus = isParticipant ? '👤 Participante' : '❌ Ex participante';
      const totalParticipants = participants.length;    
      txt += `
╔══════════════════════════╗
║       GRUPO ${i + 1}         ║
╚══════════════════════════╝

✦ Nombre        :: ${await conn.getName(jid)}
✦ Identificador :: ${jid}
✦ Control       :: ${isBotAdmin ? 'Disponible' : 'Denegado'}
✦ Estado        :: ${participantStatus}
✦ Miembros      :: ${totalParticipants}

───────────────
✦ Acceso
${isBotAdmin ? '--- (Error) ---' : 'No autorizado'}
───────────────\n\n`;
    }
    m.reply(`╭━━━〔 SHADOW // REPORTE INVERNAL 〕━━━╮
┃
┃ La vigilancia continúa.
┃ Ni el silencio de la nieve detiene el control.
┃
┣━━━〔 RESUMEN 〕━━━┫
┃ ✦ Dominios activos :: ${totalGroups}
┃
┣━━━〔 REGISTRO 〕━━━┫
${txt}
┃
╰━━━〔 La sombra no celebra… observa 〕━━━╯`.trim());
  }    
};
handler.help = ['groups', 'grouplist'];
handler.tags = ['owner'];
handler.command = ['listgroup', 'gruposlista', 'grouplist', 'listagrupos']
handler.rowner = true;
handler.private = true

export default handler;