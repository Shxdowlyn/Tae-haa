import Jimp from 'jimp'
import axios from 'axios'
import FormData from 'form-data'
import * as baileys from '@whiskeysockets/baileys'

const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = baileys

const IMGBB_KEY = '60b7b57c73586b5d915df1c3c378a458'

let handler = async (m, { conn, text, usedPrefix }) => {

  if (!text) {
    return conn.reply(m.chat, `╭━━━〔 ⚠︎ REQUISITO 〕━━━╮
┃
┃ ✦ Debes responder a una
┃   imagen o sticker
┃
┣━━━〔 USO 〕━━━┫
┃ ${usedPrefix}reducir 300×300
┃
╰━━━〔 Acción necesaria 〕━━━╯`, m)
  }

  let input = text.trim().split(/[x×]/i)
  if (input.length !== 2 || isNaN(input[0]) || isNaN(input[1])) {
    return m.reply(`╭━━━〔 ❌ FORMATO INCORRECTO 〕━━━╮
┃
┃ ✦ El formato no es válido
┃
┣━━━〔 USO CORRECTO 〕━━━┫
┃ ${usedPrefix}reducir 300×300
┃
╰━━━〔 Intenta nuevamente 〕━━━╯`)
  }

  let width = parseInt(input[0])
  let height = parseInt(input[1])

  let media
  if (m.quoted && /image|sticker/.test(m.quoted.mtype)) {
    media = await m.quoted.download()
  } else if (/image|sticker/.test(m.mtype)) {
    media = await m.download()
  } else {
    return conn.reply(m.chat, `╭━━━〔 ⚠︎ REQUISITO 〕━━━╮
┃
┃ ✦ Responde a una imagen
┃   o sticker para reducirlo
┃
╰━━━〔 Acción necesaria 〕━━━╯`, m)
  }

  try {
    let image = await Jimp.read(media)
    image.resize(width, height)
    let buffer = await image.getBufferAsync(Jimp.MIME_JPEG)

    let formData = new FormData()
    formData.append('image', buffer.toString('base64'))

    let uploadRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
      formData,
      { headers: formData.getHeaders() }
    )

    if (!uploadRes.data?.data?.url) {
      throw new Error('ImgBB no devolvió URL')
    }

    let uploadedUrl = uploadRes.data.data.url

    let mediaMsg = await prepareWAMessageMedia(
      { image: buffer },
      { upload: conn.waUploadToServer }
    )

    const buttons = [{
      name: "cta_copy",
      buttonParamsJson: JSON.stringify({
        display_text: "♡ Copiar enlace",
        copy_code: uploadedUrl
      })
    }]

    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `☁️ L I N K:\n${uploadedUrl}`
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: `Imagen reducida a *${width}×${height}*`
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: "ⓘ IMAGEN REDUCIDA",
                hasMediaAttachment: true,
                imageMessage: mediaMsg.imageMessage
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons
              })
            })
          }
        }
      },
      { quoted: m }
    )

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al procesar o subir la imagen.')
  }
}

handler.command = ['reduce', 'reducir']
handler.help = ['reduce', 'reducir']
handler.tags = ['tools']

export default handler