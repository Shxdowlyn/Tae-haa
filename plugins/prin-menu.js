import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

const botname = global.botname || "Tae-haa bot"
const dev = global.dev || "Cid Kagenou"
const videoMenu = "https://files.catbox.moe/1jgxen.mp4"
const thumbMenu = "https://files.catbox.moe/qj9tpo.jpg" 
const channelRD = global.channelRD || { id: "0@newsletter", name: "Tae-haa" }

let handler = async (m, { conn, usedPrefix, dirname, participants }) => {
  try {
    let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let name = await conn.getName(m.sender)
    let totalreg = Object.keys(global.db.data.users).length
    let groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
    let uptime = clockString(process.uptime() * 1000)
    let totalCommands = Object.keys(global.plugins).length
    let readMore = String.fromCharCode(8206).repeat(4001)

    let userIdNum = m.sender.split('@')[0]
    let phone = PhoneNumber('+' + userIdNum)
    let pais = phone.getRegionCode() || 'Número desconocido…¿Deberia importarme?'

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

    let commands = Object.values(global.plugins)
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
        menuTexto += `\n*╭──･ ̸̷∵* \`${tags[tag]}\`  
${comandos}
*╰─────────────֙╯*\n`
      }
    }

    let infoUser = `
>> Ya estás dentro, ${name}. No hay vuelta atrás.

> ─ Sistema
> Comandos: ${totalCommands}
> Tiempo: ${uptime}
> pais: ${pais}
> : ${totalreg}
> Canal: https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O

${readMore}
  乂 *ᴘʀᴏᴛᴏᴄᴏʟᴏ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏꜱ ᴅᴇ ʟᴀ ꜱᴏᴍʙʀᴀ* 乂\n`.trim()

  const fkontak = {
    key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" },
    message: {
      productMessage: {
        product: {
          productImage: { mimetype: "image/jpeg", jpegThumbnail: await (await fetch(thumbMenu)).buffer() },
          title: `⌗ֶㅤ𝐌𝐞𝐧𝐮 𝐝𝐞 𝐥𝐚 𝐒𝐨𝐦𝐛𝐫𝐚`,
          description: "« Soy quien actúa en las sombras »",
          currencyCode: "USD",
          priceAmount1000: 0,
          retailerId: "menu"
        },
        businessOwnerJid: "584242773183@s.whatsapp.net"
      }
    }
  }

  await m.react('🔥')

  await conn.sendMessage(m.chat, { 
    video: { url: videoMenu },
    caption: infoUser + menuTexto,
    gifPlayback: true,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: '',
        newsletterName: channelRD.name
      },
      externalAdReply: {
        title: `${botname}  organizacional`,
        body: `By ${dev}`,
        mediaType: 1,
        sourceUrl: null,
        thumbnailUrl: thumbMenu, 
        renderLargerThumbnail: true,
        showAdAttribution: false
      }
    }
  }, { quoted: fkontak })

} catch (e) {
   console.error(e)
   await conn.sendMessage(m.chat, { text: `✘ Error: ${e.message}` })
 }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú', 'allmenu']
handler.register = true
export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
  }