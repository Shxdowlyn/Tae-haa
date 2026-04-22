var handler = async (m, { conn, usedPrefix, command, text, groupMetadata }) => {
let mentionedJid = await m.mentionedJid
let user = mentionedJid && mentionedJid.length 
  ? mentionedJid[0] 
  : m.quoted && await m.quoted.sender 
    ? await m.quoted.sender 
    : null

if (!user) 
  return conn.reply(m.chat, `╭─〔 ERROR 〕
│
│ No señalaste a nadie.
│
╰─ Mencioná al objetivo.`, m)

try {
const groupInfo = await conn.groupMetadata(m.chat)
const participant = groupInfo.participants.find(p => 
  p.id === user || 
  p.jid === user || 
  p.lid === user || 
  p.phoneNumber === user
)

if (!participant?.admin)
  return conn.reply(m.chat, `╭━━━〔 TAE-HA // RESTRICCIÓN 〕━━━╮
┃
┃ Acción bloqueada.
┃ El objetivo posee prioridad absoluta.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ No podés degradar al creador del grupo.
┃
╰━━━〔 Límite establecido 〕━━━╯`, m, { mentions: [user] })

const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'
if (user === ownerGroup)
  return conn.reply(m.chat, `╭─〔 DENEGADO 〕
│
│ Estás apuntando demasiado alto.
│
╰─ No podés tocarlo.`, m)

if (user === conn.user.jid)
  return conn.reply(m.chat, '《✧》 No puedes degradar al bot de administrador.', m)

await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
await conn.reply(m.chat, `
╭━━━〔 TAE-HAA CONTROL 〕━━━╮
┃
┃ Permisos modificados.
┃ Jerarquía actualizada.
┃
┣━━━〔 USUARIO 〕━━━┫
┃ ✦ @${user.split('@')[0]}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ Rol: Administrador → Usuario
┃
╰━━━〔 Cambio aplicado 〕━━━╯`, m, { mentions: [user] })

} catch (e) {
conn.reply(m.chat, `╭━━━〔 TAE-HA // ERROR 〕━━━╮
┃
┃ Ejecución interrumpida.
┃ El comando no se completó.
┃
┣━━━〔 COMANDO 〕━━━┫
┃ ✦ ${usedPrefix + command}
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ${e.message}
┃
╰━━━〔 Reintentá correctamente 〕━━━╯`, m)
}}

handler.help = ['demote']
handler.tags = ['grupo']
handler.command = ['demote', 'degradar']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler