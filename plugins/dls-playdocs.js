import yts from "yt-search"
import fetch from "node-fetch"

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply("🎶 Ingresa el nombre o el enlace de YouTube.")

  await m.react("🕘")

  try {
    let url = text
    let title = "Desconocido"
    let authorName = "Desconocido"
    let durationTimestamp = "Desconocida"
    let views = "Desconocidas"
    let thumbnail = ""

    if (!text.startsWith("https://")) {
      const res = await yts(text)
      if (!res?.videos?.length) return m.reply("🚫 No encontré nada.")
      const video = res.videos[0]
      title = video.title
      authorName = video.author?.name
      durationTimestamp = video.timestamp
      views = video.views
      url = video.url
      thumbnail = video.thumbnail
    }

    const vistas = formatViews(views)
    const isVideo = command.includes('mp4')
    const type = isVideo ? "mp4" : "mp3"

    const res3 = await fetch("https://files.catbox.moe/wfd0ze.jpg")
    const thumb3 = Buffer.from(await res3.arrayBuffer())

    const fkontak = {
      key: { fromMe: false, participant: "0@s.whatsapp.net" },
      message: {
        locationMessage: {
          name: `『 ${title} 』`,
          jpegThumbnail: thumb3
        }
      }
    }

    const caption = `╭━━━〔 DOCUMENTO // REGISTRO 〕━━━╮
┃
┃ El archivo fue identificado.
┃ No todo está hecho para ser abierto.
┃
┣━━━〔 INFORMACIÓN 〕━━━┫
┃ ✦ Título     :: ${title}
┃ ✦ Canal      :: ${authorName}
┃ ✦ Vistas     :: ${vistas}
┃ ✦ Duración   :: ${durationTimestamp}
┃ ✦ Tipo       :: ${type.toUpperCase()} DOC
┃
┣━━━〔 ACCESO 〕━━━┫
┃ ${url}
┃
┣━━━〔 SISTEMA 〕━━━┫
┃ Núcleo   :: Tae-haa Bot
┃ Control  :: Adara
┃
╰━━━〔 Apertura bajo responsabilidad 〕━━━╯`

    const thumb = (await conn.getFile(thumbnail)).data

    await conn.sendMessage(
      m.chat,
      {
        image: thumb,
        caption,
        footer: "⚡ Shadow — Descargas en Documento ⚡",
        headerType: 4
      },
      { quoted: fkontak }
    )

    await downloadMedia(conn, m, url, type)

    await m.react("✅")
  } catch (e) {
    m.reply("❌ Error: " + e.message)
    m.react("⚠️")
  }
}

const downloadMedia = async (conn, m, url, type) => {
  try {
    const msg = type === "mp3"
      ? "🎵 Preparando audio en documento..."
      : "🎬 Preparando video en documento..."

    const sent = await conn.sendMessage(m.chat, { text: msg }, { quoted: m })

    const apiUrl = type === "mp3"
      ? `https://apiaxi.i11.eu/down/ytaudio?url=${encodeURIComponent(url)}`
      : `https://apiaxi.i11.eu/down/ytvideo?url=${encodeURIComponent(url)}`

    const r = await fetch(apiUrl)
    const data = await r.json()

    if (!data?.status || !data?.resultado?.url_dl) return m.reply("🚫 No se pudo descargar el archivo.")

    const fileUrl = data.resultado.url_dl
    const fileTitle = cleanName(data.resultado.titulo || "Shadow_File")

    const audioThumb = await fetch("https://files.catbox.moe/wfd0ze.jpg")
    const mini = Buffer.from(await audioThumb.arrayBuffer())

    if (type === "mp3") {
      await conn.sendMessage(
        m.chat,
        {
          document: { url: fileUrl },
          mimetype: "audio/mpeg",
          fileName: fileTitle + ".mp3",
          jpegThumbnail: mini,
          title: fileTitle
        },
        { quoted: m }
      )
    } else {
      await conn.sendMessage(
        m.chat,
        {
          document: { url: fileUrl },
          mimetype: "video/mp4",
          fileName: fileTitle + ".mp4",
          jpegThumbnail: mini,
          title: fileTitle
        },
        { quoted: m }
      )
    }

    await conn.sendMessage(
      m.chat,
      { text: `✅ Entrega completada\n\n🎼 Título: ${fileTitle}`, edit: sent.key }
    )

  } catch (e) {
    console.error(e)
    m.reply("❌ Error: " + e.message)
  }
}

const cleanName = (name) => name.replace(/[^\w\s-_.]/gi, "").substring(0, 50)

const formatViews = (views) => {
  if (views === undefined || views === null) return "No disponible"
  if (views >= 1000000000) return `${(views / 1000000000).toFixed(1)}B`
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
  return views.toString()
}

handler.command = handler.help = ['mp3doc', 'ytmp3doc', 'mp4doc', 'ytmp4doc']
handler.tags = ['descargas']
handler.register = true

export default handler