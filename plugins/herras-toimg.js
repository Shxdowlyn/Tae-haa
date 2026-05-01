let handler = async (m, { conn, usedPrefix, command }) => {
if (!m.quoted) {
return conn.reply(m.chat, `╭━━━〔 ⚠︎ AVISO 〕━━━╮
┃
┃ ✦ Debes citar un sticker
┃   para convertirlo a imagen
┃
╰━━━〔 Requisito necesario 〕━━━╯`, m, rcanal)
}
await m.react('🕒')
let xx = m.quoted
let imgBuffer = await xx.download()   
if (!imgBuffer) {
await m.react('✖️')
return conn.reply(m.chat, `╭━━━〔 ❌ ERROR 〕━━━╮
┃
┃ ✦ No se pudo procesar el sticker
┃
╰━━━〔 Intenta nuevamente 〕━━━╯`, m)
}
await conn.sendMessage(m.chat, { image: imgBuffer, caption: '✿ *Aquí tienes :D*' }, { quoted: m })
await m.react('✔️')
}

handler.help = ['toimg']
handler.tags = ['herramientas']
handler.command = ['toimg', 'jpg', 'img'] 
//handler.coin = 14

export default handler