import moment from 'moment-timezone'
import fetch from 'node-fetch'
import baileys from '@whiskeysockets/baileys'
const { generateWAMessageFromContent, generateWAMessageContent, proto } = baileys

let handler = async (m, { conn }) => {
  try {
    let res = await fetch('https://api.github.com/repos/yosue891/SHADOW-BOT-MD')
    if (!res.ok) throw new Error('Error al obtener datos del repositorio Shadow-BOT-MD')
    let json = await res.json()

    let txt = `╭━━━〔 SHADOW-BOT-MD 〕━━━╮
┃
┃ ⚔️ Proyecto: ${json.name}
┃
┣━━━〔 ESTADÍSTICAS 〕━━━┫
┃ 👀 Watchers: ${json.watchers_count}
┃ 🌟 Stars: ${json.stargazers_count}
┃ 🌿 Forks: ${json.forks_count}
┃ 📦 Tamaño: ${(json.size / 1024).toFixed(2)} MB
┃
┣━━━〔 ACTUALIZACIÓN 〕━━━┫
┃ 🕰️ ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}
┃
┣━━━〔 ENLACE 〕━━━┫
┃ 🔗 ${json.html_url}
┃
┣━━━〔 CREADOR〕━━━┫
┃ 👑 Yosue
┃
╰━━━〔 SISTEMA ACTIVO 〕━━━╯`

    // 🔥 Imagen pequeña estilo WhatsApp Business
    const thumbBuffer = await (await fetch('https://i.postimg.cc/rFfVL8Ps/image.jpg')).buffer()

    const fkontak = {
      key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'ShadowScript' },
      message: {
        locationMessage: {
          name: '📜 script', // ← Texto que pediste
          jpegThumbnail: thumbBuffer,
          vcard:
            'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'N:;script;;;\n' +
            'FN:script\n' +
            'ORG:Shadow Garden\n' +
            'TITLE:\n' +
            'item1.TEL;waid=5804242773183:+58 0424-2773183\n' +
            'item1.X-ABLabel:Creador\n' +
            'X-WA-BIZ-DESCRIPTION:Repositorio oficial del Reino de las Sombras\n' +
            'X-WA-BIZ-NAME:script\n' +
            'END:VCARD'
        }
      },
      participant: '0@s.whatsapp.net'
    }

    // 🔥 Imagen grande del header del menú
    const media = await generateWAMessageContent(
      { image: { url: 'https://files.catbox.moe/owpjte.jpg' } },
      { upload: conn.waUploadToServer }
    )

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: { text: txt },
            footer: { text: 'Shadow-BOT-MD' },
            header: {
              hasMediaAttachment: true,
              imageMessage: media.imageMessage
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: '📦 Repositorio del Bot',
                    url: json.html_url
                  })
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: '📞 Reportar un problema',
                    url: 'https://wa.me/5804242773183'
                  })
                }
              ],
              messageParamsJson: ''
            },
            contextInfo: {
              mentionedJid: [m.sender],
              externalAdReply: {
                title: 'Shadow-BOT-MD',
                body: 'El poder oculto en las sombras',
                thumbnailUrl: 'https://files.catbox.moe/owpjte.jpg',
                sourceUrl: json.html_url,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          })
        }
      }
    }, { quoted: fkontak })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (e) {
    await conn.reply(m.chat, `╭━━━〔 ❌ ERROR 〕━━━╮
┃
┃ ⚔️ Fallo en el sistema
┃   de ejecución
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ${e}
┃
╰━━━〔 Proceso interrumpido 〕━━━╯`, m)
  }
}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['script', 'sc']
handler.register = true

export default handler