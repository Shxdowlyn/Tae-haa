let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const groupMetadataCache = new Map()
const lidCache = new Map()
const handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const chat = global.db.data.chats[m.chat]
const users = m.messageStubParameters[0]
const usuario = await resolveLidToRealJid(m?.sender, conn, m?.chat)
const groupAdmins = participants.filter(p => p.admin)
const rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '', newsletterName: channelRD.name }, externalAdReply: { title: "╭━━━〔 TAE-HAA // AVISO 〕━━━╮", body: textbot, mediaUrl: null, description: null, previewType: "PHOTO", thumbnail: await (await fetch(icono)).buffer(), sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, mentionedJid: null }}
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/83ehu1.jpg'
const nombre = `╭━━━〔 TAE-HAA // GRUPO 〕━━━╮
┃
┃ Cambio detectado.
┃ Nombre del grupo actualizado.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Usuario :: @${usuario.split('@')[0]}
┃ ✦ Nuevo nombre :: ${m.messageStubParameters[0]}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Acción :: Completada
┃ ✦ Registro :: Guardado
┃
╰━━━〔 Tae-Haa observa en silencio 〕━━━╯`

const foto = `╭━━━〔 TAE-HAA // GRUPO 〕━━━╮
┃
┃ Cambio detectado.
┃ Imagen del grupo actualizada.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Usuario :: @${usuario.split('@')[0]}
┃ ✦ Acción  :: Cambio de imagen
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Éxito
┃ ✦ Registro  :: Guardado
┃
╰━━━〔 Tae-Haa mantiene el control 〕━━━╯`
const edit = `╭━━━〔 TAE-HAA // GRUPO 〕━━━╮
┃
┃ Configuración modificada.
┃ Permisos actualizados.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Usuario :: @${usuario.split('@')[0]}
┃ ✦ Acceso  :: ${m.messageStubParameters[0] == 'on' ? 'Solo administradores' : 'Todos'}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Aplicado
┃ ✦ Control   :: Estable
┃
╰━━━〔 Tae-Haa ajusta el orden 〕━━━╯`

const newlink = `╭━━━〔 TAE-HAA // GRUPO 〕━━━╮
┃
┃ Enlace restablecido.
┃ Acceso regenerado.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Usuario :: @${usuario.split('@')[0]}
┃ ✦ Acción  :: Reinicio de enlace
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Éxito
┃ ✦ Registro  :: Guardado
┃
╰━━━〔 Tae-Haa mantiene el control 〕━━━╯`

const status = `╭━━━〔 TAE-HAA // GRUPO 〕━━━╮
┃
┃ Estado actualizado.
┃ Flujo de mensajes modificado.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Usuario :: @${usuario.split('@')[0]}
┃ ✦ Estado  :: ${m.messageStubParameters[0] == 'on' ? 'Cerrado' : 'Abierto'}
┃ ✦ Permiso :: ${m.messageStubParameters[0] == 'on' ? 'Solo administradores' : 'Todos'}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Aplicado
┃ ✦ Control   :: Estable
┃
╰━━━〔 Tae-Haa decide quién habla 〕━━━╯`

const admingp = `╭━━━〔 TAE-HAA // ADMIN 〕━━━╮
┃
┃ Permisos elevados.
┃ Nuevo administrador asignado.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Usuario :: @${users.split('@')[0]}
┃ ✦ Acción  :: Promoción
┃ ✦ Ejecutado por :: @${usuario.split('@')[0]}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Éxito
┃ ✦ Control   :: Estable
┃
╰━━━〔 Tae-Haa otorga autoridad 〕━━━╯`

const noadmingp = `╭━━━〔 TAE-HAA // ADMIN 〕━━━╮
┃
┃ Permisos revocados.
┃ Administrador degradado.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Usuario :: @${users.split('@')[0]}
┃ ✦ Acción  :: Degradación
┃ ✦ Ejecutado por :: @${usuario.split('@')[0]}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Aplicado
┃ ✦ Control   :: Estable
┃
╰━━━〔 Tae-Haa retira el control 〕━━━╯`
if (chat.detect && m.messageStubType == 2) {
const uniqid = (m.isGroup ? m.chat : m.sender).split('@')[0]
const sessionPath = `./${sessions}/`
for (const file of await fs.promises.readdir(sessionPath)) {
if (file.includes(uniqid)) {
await fs.promises.unlink(path.join(sessionPath, file))
console.log(`${chalk.yellow.bold('Delete!')} ${chalk.greenBright(`'${file}'`)}\n${chalk.redBright('Que provoca el "undefined" en el chat.')}`)
}}} if (chat.detect && m.messageStubType == 21) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: nombre, ...rcanal }, { quoted: null })
} if (chat.detect && m.messageStubType == 22) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { image: { url: pp }, caption: foto, ...rcanal }, { quoted: null })
} if (chat.detect && m.messageStubType == 23) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: newlink, ...rcanal }, { quoted: null })
} if (chat.detect && m.messageStubType == 25) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: edit, ...rcanal }, { quoted: null })
} if (chat.detect && m.messageStubType == 26) {
rcanal.contextInfo.mentionedJid = [usuario, ...groupAdmins.map(v => v.id)]
await this.sendMessage(m.chat, { text: status, ...rcanal }, { quoted: null })
} if (chat.detect && m.messageStubType == 29) {
rcanal.contextInfo.mentionedJid = [usuario, users, ...groupAdmins.map(v => v.id)].filter(Boolean)
await this.sendMessage(m.chat, { text: admingp, ...rcanal }, { quoted: null })
return
} if (chat.detect && m.messageStubType == 30) {
rcanal.contextInfo.mentionedJid = [usuario, users, ...groupAdmins.map(v => v.id)].filter(Boolean)
await this.sendMessage(m.chat, { text: noadmingp, ...rcanal }, { quoted: null })
} else { 
if (m.messageStubType == 2) return
console.log({messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType], 
})}}

export default handler

async function resolveLidToRealJid(lid, conn, groupChatId, maxRetries = 3, retryDelay = 60000) {
const inputJid = lid.toString()
if (!inputJid.endsWith("@lid") || !groupChatId?.endsWith("@g.us")) { return inputJid.includes("@") ? inputJid : `${inputJid}@s.whatsapp.net` }
if (lidCache.has(inputJid)) { return lidCache.get(inputJid) }
const lidToFind = inputJid.split("@")[0]
let attempts = 0
while (attempts < maxRetries) {
try {
const metadata = await conn?.groupMetadata(groupChatId)
if (!metadata?.participants) { throw new Error("No se obtuvieron participantes") }
for (const participant of metadata.participants) {
try {
if (!participant?.jid) continue
const contactDetails = await conn?.onWhatsApp(participant.jid)
if (!contactDetails?.[0]?.lid) continue
const possibleLid = contactDetails[0].lid.split("@")[0]
if (possibleLid === lidToFind) {
lidCache.set(inputJid, participant.jid)
return participant.jid
}} catch (e) { continue }}
lidCache.set(inputJid, inputJid)
return inputJid
} catch (e) {
if (++attempts >= maxRetries) {
lidCache.set(inputJid, inputJid)
return inputJid
}
await new Promise((resolve) => setTimeout(resolve, retryDelay))
}}
return inputJid
}