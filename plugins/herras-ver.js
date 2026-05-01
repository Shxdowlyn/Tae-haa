let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'))

let handler = async (m, { conn, usedPrefix }) => {
let quoted = m.quoted
if (!quoted) return conn.reply(m.chat, `╭━━━〔 ⚠︎ AVISO 〕━━━╮
┃
┃ ✦ Responde a un mensaje
┃   tipo “ver una vez”
┃
┃ ✦ Para poder ver su contenido
┃
╰━━━〔 Requisito necesario 〕━━━╯`, m)
try {
await m.react('🕒')
let viewOnceMessage = quoted.viewOnce ? quoted : quoted.mediaMessage?.imageMessage || quoted.mediaMessage?.videoMessage || quoted.mediaMessage?.audioMessage
let messageType = viewOnceMessage.mimetype || quoted.mtype
let stream = await downloadContentFromMessage(viewOnceMessage, messageType.split('/')[0])    
if (!stream) return conn.reply(m.chat, `╭━━━〔 ❌ ERROR 〕━━━╮
┃
┃ ✦ No se pudo cargar el contenido
┃
╰━━━〔 Intenta nuevamente 〕━━━╯`, m)
let buffer = Buffer.from([])
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
if (messageType.includes('video')) {
await conn.sendMessage(m.chat, { video: buffer, caption: viewOnceMessage.caption || '', mimetype: 'video/mp4' }, { quoted: m })
} else if (messageType.includes('image')) {
await conn.sendMessage(m.chat, { image: buffer, caption: viewOnceMessage.caption || '' }, { quoted: m })
} else if (messageType.includes('audio')) {
await conn.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/ogg; codecs=opus', ptt: viewOnceMessage.ptt || false }, { quoted: m })  
}
await m.react('✔️')
} catch (e) {
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
┃ ${e.message}
┃
╰━━━〔 Proceso interrumpido 〕━━━╯`, m)
}}

handler.help = ['ver']
handler.tags = ['herramientas']
handler.command = ['readviewonce', 'read', 'readvo', 'ver']
//handler.coin = 52

export default handler