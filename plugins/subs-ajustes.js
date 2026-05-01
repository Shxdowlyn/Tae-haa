import { jidDecode } from '@whiskeysockets/baileys'
import path from 'path'
import fs from 'fs'
import ws from 'ws'

const linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i
const handler = async (m, { conn, command, usedPrefix, text }) => {
try {
const isSubBots = [conn.user.jid, ...global.owner.map(([number]) => `${number}@s.whatsapp.net`)].includes(m.sender)
if (!isSubBots) return m.reply(`╭━━━〔 ⚠︎ ACCESO RESTRINGIDO 〕━━━╮
┃
┃ ✦ Este comando solo puede ser
┃   ejecutado por el socket
┃
┃ ✦ Comando: ${command}
┃
╰━━━〔 Permiso denegado 〕━━━╯`)
switch (command) {
case 'self': case 'public': case 'antiprivado': case 'antiprivate': case 'gponly': case 'sologp': {
const config = global.db.data.settings[conn.user.jid]
const value = text ? text.trim().toLowerCase() : ''
const type = /self|public/.test(command) ? 'self' : /antiprivado|antiprivate/.test(command) ? 'antiPrivate' : /gponly|sologp/.test(command) ? 'gponly' : null
if (!type) return m.reply(`╭━━━〔 ⚠︎ ERROR 〕━━━╮
┃
┃ ✦ Modo no reconocido
┃
╰━━━〔 Intenta nuevamente 〕━━━╯`)
const isEnable = config[type] || false
const enable = value === 'enable' || value === 'on'
const disable = value === 'disable' || value === 'off'
if (enable || disable) {
if (isEnable === enable)
return m.reply(`╭━━━〔 ⚠︎ ESTADO 〕━━━╮
┃
┃ ✦ El modo ${type}
┃   ya estaba ${enable ? 'activado' : 'desactivado'}
┃
╰━━━〔 Sin cambios 〕━━━╯`)
config[type] = enable
return conn.reply(m.chat, `╭━━━〔 ⚙︎ CONFIGURACIÓN 〕━━━╮
┃
┃ ✦ Has ${enable ? 'activado' : 'desactivado'}
┃   el modo ${type}
┃   para el socket
┃
╰━━━〔 Estado actualizado 〕━━━╯`, m)
}
conn.reply(m.chat, `╭━━━〔 ⚙︎ CONFIGURACIÓN 〕━━━╮
┃
┃ ✦ Modo: ${type}
┃
┣━━━〔 USO 〕━━━┫
┃ ✔ Activar: ${usedPrefix}${command} enable
┃ ✖ Desactivar: ${usedPrefix}${command} disable
┃
┣━━━〔 ESTADO ACTUAL 〕━━━┫
┃ ${isEnable ? '✓ Activado' : '✗ Desactivado'}
┃
╰━━━〔 SISTEMA 〕━━━╯`, m)
break
}
case 'join': {
if (!text) return m.reply(`❀ Debes enviar un enlace de invitación para unirme a un grupo.`)
const [_, code] = text.match(linkRegex) || []
if (!code) return m.reply(`ꕥ El enlace de invitación no es válido.`)
await m.react('🕒')
await conn.groupAcceptInvite(code)
await m.react('✔️')
m.reply(`╭━━━〔 🎉 BIENVENIDA 〕━━━╮
┃
┃ ✦ ${botname} se ha unido
┃   exitosamente al grupo
┃
╰━━━〔 Conexión establecida 〕━━━╯`)
break
}
case 'salir': case 'leave': {
await m.react('🕒')
const id = text || m.chat
const chat = global.db.data.chats[m.chat]
chat.welcome = false
await conn.reply(id, `╭━━━〔 👋 DESPEDIDA 〕━━━╮
┃
┃ ✦ Bueno, entiendo
┃   me salgo del grupo
┃
┃ ✦ Bye a todos 👋
┃   ${botname} se despide 
┃
╰━━━〔 Fin de sesión 〕━━━╯`)
await conn.groupLeave(id)
chat.welcome = true
await m.react('✔️')
break
}
case 'logout': {
const rawId = conn.user?.id || ''
const cleanId = jidDecode(rawId)?.user || rawId.split('@')[0]
const index = global.conns?.findIndex(c => c.user.jid === m.sender)
if (global.conn.user.jid === conn.user.jid)
return conn.reply(m.chat, `╭━━━〔 ⚠︎ DESHABILITADO 〕━━━╮
┃
┃ ✦ Este comando no está disponible
┃   en sesiones principales
┃
╰━━━〔 Restricción activa 〕━━━╯`, m)
if (index === -1 || !global.conns[index])
return conn.reply(m.chat, `╭━━━〔 ⚠︎ SESIÓN 〕━━━╮
┃
┃ ✦ La sesión ya está cerrada
┃   o no hay conexión activa
┃
╰━━━〔 Sin cambios 〕━━━╯`, m)
conn.reply(m.chat, `╭━━━〔 🚪 SESIÓN 〕━━━╮
┃
┃ ✦ Tu sesión ha sido cerrada
┃   exitosamente
┃
╰━━━〔 Cerrado 〕━━━╯`, m)
setTimeout(async () => {
await global.conns[index].logout()
global.conns.splice(index, 1)
const sessionPath = path.join(global.jadi, cleanId)
if (fs.existsSync(sessionPath)) {
fs.rmSync(sessionPath, { recursive: true, force: true })
console.log(`╭━━━〔 🧹 SESIÓN ELIMINADA 〕━━━╮
┃
┃ ✦ Usuario: ${cleanId}
┃ ✦ Ruta: ${sessionPath}
┃
┃ ✦ Estado: Eliminada correctamente
┃
╰━━━〔 LOG REGISTRADO 〕━━━╯`)
}}, 3000)
break
}
case 'reload': {
const rawId = conn.user?.id || ''
const cleanId = jidDecode(rawId)?.user || rawId.split('@')[0]
const sessionPath = path.join(global.jadi, cleanId)
if (!fs.existsSync(sessionPath)) return conn.reply(m.chat, `╭━━━〔 ⚠︎ ACCESO DENEGADO 〕━━━╮
┃
┃ ✦ Este comando solo puede
┃   ejecutarse desde una instancia
┃   Sub-Bot
┃
╰━━━〔 Permiso requerido 〕━━━╯`, m)
await m.react('🕒')
if (typeof global.reloadHandler !== 'function')
throw new Error(`╭━━━〔 ❌ ERROR FATAL 〕━━━╮
┃
┃ ✦ No se encontró la función
┃   global.reloadHandler
┃
╰━━━〔 Sistema detenido 〕━━━╯`)
await global.reloadHandler(true)
await m.react('✔️')
conn.reply(m.chat, `╭━━━〔 🔄 SESIÓN 〕━━━╮
┃
┃ ✦ La sesión fue recargada
┃   correctamente
┃
╰━━━〔 Listo 〕━━━╯`, m)
break
}}} catch (error) {
await m.react('✖️')
conn.reply(m.chat, `╭━━━〔 ❌ ERROR 〕━━━╮
┃
┃ ✦ Se ha producido un problema
┃
┣━━━〔 SOLUCIÓN 〕━━━┫
┃ Usa ${usedPrefix}report
┃ para informarlo
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ${error.message || error}
┃
╰━━━〔 Proceso interrumpido 〕━━━╯`, m)
}}

handler.command = ['self', 'public', 'antiprivate', 'gponly', 'sologp', 'join', 'salir', 'leave', 'logout', 'reload']
handler.help = ['self', 'public', 'antiprivate', 'gponly', 'sologp', 'join', 'salir', 'leave', 'logout', 'reload']
handler.tags = ['serbot']

export default handler