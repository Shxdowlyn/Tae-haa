import PhoneNumber from 'awesome-phonenumber'

const botname = global.botname || "Tae-haa bot"
const dev = global.dev || "Cid Kagenou"
const videoMenu = "https://files.catbox.moe/1jgxen.mp4"
const thumbMenu = "https://files.catbox.moe/qj9tpo.jpg"
const channelRD = global.channelRD || { id: "120363406529946290@newsletter", name: "Tae-haa" }

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let name = await conn.getName(m.sender)

    let totalreg = Object.keys(global.db.data.users || {}).length
    let uptime = clockString(process.uptime() * 1000)
    let totalCommands = Object.keys(global.plugins || {}).length
    let readMore = String.fromCharCode(8206).repeat(4001)

    let userIdNum = m.sender.split('@')[0]
    let phone = PhoneNumber('+' + userIdNum)
    let pais = phone.getRegionCode() || 'Desconocido'

    let commands = Object.values(global.plugins || {})
      .filter(v => v.help && v.tags)
      .map(v => ({
        help: Array.isArray(v.help) ? v.help : [v.help],
        tags: Array.isArray(v.tags) ? v.tags : [v.tags]
      }))

    let menuTexto = commands
      .map(cmd => cmd.help.map(e => `*│ׄꤥㅤׅ* ${usedPrefix}${e}`).join('\n'))
      .join('\n')

    let infoUser = `
>> Ya estás dentro, ${name}. No hay vuelta atrás.

> ─ Sistema
> Comandos: ${totalCommands}
> Tiempo: ${uptime}
> País: ${pais}
> Usuarios: ${totalreg}
> Canal: https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A

${readMore}
tae-haa protocolos
`.trim()

    await conn.sendMessage(m.chat, {
      video: { url: videoMenu },
      caption: infoUser + '\n' + menuTexto,
      gifPlayback: true,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: botname,
          body: `By ${dev}`,
          mediaType: 1,
          thumbnailUrl: thumbMenu,
          renderLargerThumbnail: true
        }
      }
    })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { text: `✘ Error: ${e.message}` })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu']
handler.register = false

export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}