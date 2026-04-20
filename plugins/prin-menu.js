import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

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

    let tags = {
      'info': '𝗜𝗡𝗙𝗢 𝗧𝗔𝗘',
      'main': '𝗘𝗦𝗧𝗔𝗗𝗢',
      'anime': '𝗥𝗘𝗔𝗖𝗖𝗜𝗢𝗡𝗘𝗦',
      'search': '𝗕𝗨𝗦𝗤𝗨𝗘𝗗𝗔𝗦',
      'descargas': '𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦',
      'socket': '𝗖𝗢𝗡𝗘𝗫𝗜𝗢𝗡𝗘𝗦',
      'rg': '𝗣𝗘𝗥𝗙𝗜𝗟',
      'fun': '𝗝𝗨𝗘𝗚𝗢𝗦',
      'rpg': '𝗘𝗖𝗢𝗡𝗢𝗠𝗜́𝗔',
      'gacha': '𝗘𝗩𝗘𝗡𝗧𝗢𝗦',
      'game': '𝗝𝗨𝗘𝗚𝗢𝗦',
      'grupos': '𝗖𝗜𝗥𝗖𝗨𝗟𝗢𝗦',
      'nable': '𝗠𝗢𝗗𝗢 𝗢𝗡/𝗢𝗙𝗙',
      'ia': '𝗜𝗡𝗧𝗘𝗟𝗜𝗚𝗘𝗡𝗖𝗜𝗔',
      'stalk': '𝗢𝗕𝗦𝗘𝗥𝗩𝗔𝗖𝗜𝗢𝗡',
      'maker': '𝗜𝗥𝗥𝗘𝗟𝗘𝗩𝗔𝗡𝗧𝗘',
      'tools': '𝗛𝗘𝗥𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦',
      'sticker': '𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦',
      'owner': '𝗖𝗥𝗘𝗔𝗗𝗢𝗥𝗔',
    }

    let commands = Object.values(global.plugins || {})
      .filter(v => v.help && v.tags)
      .map(v => ({
        help: Array.isArray(v.help) ? v.help : [v.help],
        tags: Array.isArray(v.tags) ? v.tags : [v.tags]
      }))

    let menuTexto = ''
    for (let tag in tags) {
      let comandos = commands
        .filter(cmd => cmd.tags.includes(tag))
        .map(cmd => cmd.help.map(e => `*│ׄꤥㅤׅ* ${usedPrefix}${e}`).join('\n'))
        .join('\n')
      if (comandos) {
        menuTexto += `\n*╭──･ ̸̷∵* \`${tags[tag]}\`\n${comandos}\n*╰─────────────֙╯*\n`
      }
    }

    let infoUser = `
>> Ya estás dentro, ${name}. No hay vuelta atrás.

> ─ Sistema
> Comandos: ${totalCommands}
> Tiempo: ${uptime}
> País: ${pais}
> Usuarios: ${totalreg}

${readMore}
tae-haa protocolos
`.trim()

    await m.react('🐺')

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