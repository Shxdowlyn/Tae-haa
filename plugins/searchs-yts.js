import yts from "yt-search"
import fetch from "node-fetch"
import baileys from "@whiskeysockets/baileys"

const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = baileys

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return m.reply(`╭━━━〔 ⚠︎ YOUTUBE 〕━━━╮
┃
┃ ✦ Ingresa una búsqueda
┃   para continuar
┃
╰━━━〔 Requisito necesario 〕━━━╯`)

  try {
    await m.react("🕸️")

    const results = await yts(text)
    const videos = results.all.filter(v => v.type === "video")
    if (!videos.length) throw new Error(`╭━━━〔 SIN RESULTADOS 〕━━━╮
┃
┃ ✦ No se encontraron resultados
┃   para la búsqueda
┃
╰━━━〔 Intenta otro término 〕━━━╯`)

    const first = videos[0]
    const smallThumb = await (await fetch("https://i.postimg.cc/rFfVL8Ps/image.jpg")).buffer()

    const businessHeader = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "TaehaaYT" },
      message: {
        locationMessage: {
          name: "🔍 YouTube Search",
          jpegThumbnail: smallThumb,
          vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;YouTube;;;\nFN:YouTube\nORG:Tae Haa\nEND:VCARD"
        }
      },
      participant: "0@s.whatsapp.net"
    }

    const media = await prepareWAMessageMedia(
      { image: { url: first.thumbnail } },
      { upload: conn.waUploadToServer }
    )

    const rows = videos.slice(0, 20).map(v => ({
      title: v.title,
      description: `⏱ ${v.timestamp} | Canal: ${v.author.name}`,
      id: `${usedPrefix}play ${v.url}` 
    }))

    const interactive = proto.Message.InteractiveMessage.fromObject({
      body: { text: `╭━━━〔 📥 DESCARGA 〕━━━╮
┃
┃ ✦ Selecciona un video de la lista
┃   para descargarlo automáticamente
┃
╰━━━〔 En espera 〕━━━╯` },
      footer: { text: "Tae Haa — YouTube Search" },
      header: {
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "Lista de Resultados",
              sections: [
                {
                  title: "RESULTADOS DE YOUTUBE",
                  highlight_label: "🔎",
                  rows
                }
              ]
            })
          }
        ]
      },
      contextInfo: {
        mentionedJid: [m.sender]
      }
    })

    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: { interactiveMessage: interactive }
        }
      },
      { quoted: businessHeader }
    )

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    await m.react("✔️")

  } catch (e) {
    await m.react("✖️")
    m.reply(`╭━━━〔 ❌ ERROR 〕━━━╮
┃
┃ ✦ Ocurrió un error
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ${e.message}
┃
╰━━━〔 Fin del error 〕━━━╯`)
  }
}

handler.all = async function (m) {
  if (!m.message) return
  const type = m.message.interactiveResponseMessage?.body?.text
  if (type && type.startsWith(this.prefix || "/")) {
    this.emit('chat-update', {
      ...m,
      message: {
        extendedTextMessage: { text: type }
      }
    })
  }
}

handler.command = ["ytbuscar", "ytsearch", "yts"]
export default handler