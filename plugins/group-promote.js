var handler = async (m, { conn, usedPrefix, command, text, groupMetadata, isAdmin }) => {
let mentionedJid = await m.mentionedJid
let user = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
if (!user) return conn.reply(m.chat, `✎ Debes mencionar a un usuario para poder promoverlo a administrador.`, m)
try {
const groupInfo = await conn.groupMetadata(m.chat)
const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'
if (user === ownerGroup || groupInfo.participants.some(p => p.id === user && p.admin))
return conn.reply(m.chat, `╭━━━〔 TAE-HAA // ADMIN 〕━━━╮
┃
┃ Acción innecesaria.
┃ El usuario ya posee privilegios.
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Rol :: Administrador activo
┃ ✦ Cambio :: No requerido
┃
╰━━━〔 Tae-Haa no repite órdenes 〕━━━╯`, m)
await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
await conn.reply(m.chat, `╭━━━〔 TAE-HAA // ADMIN 〕━━━╮
┃
┃ Permisos actualizados.
┃ Nuevo administrador asignado.
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Acción :: Completada
┃ ✦ Resultado :: Éxito
┃
╰━━━〔 Tae-Haa aprueba el cambio 〕━━━╯`, m)
} catch (e) {
conn.reply(m.chat, `╭━━━〔 TAE-HAA // ERROR 〕━━━╮
┃
┃ Fallo detectado.
┃ El sistema no respondió como esperaba.
┃
┣━━━〔 ACCIÓN 〕━━━┫
┃ ✦ Reporta :: ${usedPrefix}report
┃ ✦ Mensaje :: ${e.message}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Registro :: Guardado
┃ ✦ Revisión :: Pendiente
┃
╰━━━〔 Tae-Haa no tolera errores 〕━━━╯`, m)
}}

handler.help = ['promote']
handler.tags = ['grupo']
handler.command = ['promote', 'promover']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler