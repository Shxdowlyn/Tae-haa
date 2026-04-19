import fetch from 'node-fetch'
import fs from 'fs'
import { exec } from 'child_process'

const fetchJson = (url, options) =>
  new Promise((resolve, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
  })

const convertToWebp = (input, output) => {
  return new Promise((resolve, reject) => {
    exec(
      `ffmpeg -i ${input} -vf "scale=512:512:force_original_aspect_ratio=decrease" -vcodec libwebp -lossless 1 -qscale 1 -preset picture -loop 0 -an -vsync 0 ${output}`,
      (err) => {
        if (err) reject(err)
        else resolve()
      }
    )
  })
}

var handler = async (m, { conn, usedPrefix, command, text }) => {
try {
if (!text || !text.includes('+'))
  return conn.reply(m.chat, `《✧》 Debes ingresar *2 emojis* para combinarlos.\n> Ejemplo: *${usedPrefix + command}* 😈+🔥`, m)

let [emoji1, emoji2] = text.split`+`
await m.react('🕒')

let user = globalThis.db.data.users[m.sender] || {}
let name = user.name || m.sender.split('@')[0]
let texto1 = user.metadatos || `Sʜᴀᴅᴏᴡ Gᴀʀᴅᴇɴ ⚜`
let texto2 = user.metadatos2 || `@${name}`

const url = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`
const res = await fetchJson(url)

if (!res.results || res.results.length === 0)
  return conn.reply(m.chat, `《✧》 No existe una combinación para esos emojis.`, m)

for (let result of res.results) {
  const png = `./tmp-${Date.now()}.png`
  const webp = `./tmp-${Date.now()}.webp`

  const buffer = await (await fetch(result.url)).arrayBuffer()
  fs.writeFileSync(png, Buffer.from(buffer))

  await convertToWebp(png, webp)

  await conn.sendMessage(
    m.chat,
    { sticker: fs.readFileSync(webp), packname: texto1, author: texto2 },
    { quoted: m }
  )

  fs.unlinkSync(png)
  fs.unlinkSync(webp)
}

await m.react('✔️')

} catch (e) {
await m.react('✖️')
conn.reply(
  m.chat,
  `⚠︎ Se produjo un error ejecutando *${usedPrefix + command}*.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`,
  m
)
}}

handler.help = ['emojimix']
handler.tags = ['sticker']
handler.command = ['emojimix', 'mixemoji', 'mixemojis']

export default handler