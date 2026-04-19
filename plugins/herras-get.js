import fetch from 'node-fetch'
import { format } from 'util'

let handler = async (m, { conn, usedPrefix, text }) => {
  if (m.fromMe) return
  if (!/^https?:\/\//.test(text)) 
    return m.reply(`❄️✨ *Discípulo de las Sombras*, entrega la *URL* para invocar su contenido.`)

  let url = text
  await m.react('🎭') // reacción teatral

  try {
    let res = await fetch(url)

    // Protección contra archivos gigantes
    if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
      throw `📦 El archivo es demasiado grande (${res.headers.get('content-length')})`
    }

    // Si no es texto/JSON, lo manda como archivo
    if (!/text|json/.test(res.headers.get('content-type'))) {
      return conn.sendFile(m.chat, url, 'shadow_file', `🎄 *Archivo invocado desde las Sombras*`, m)
    }

    // Procesa contenido
    let txt = await res.buffer()
    try {
      txt = format(JSON.parse(txt + ''))
    } catch (e) {
      txt = txt + ''
    } finally {
      m.reply(`🌌 *Catálogo de las Sombras – Edición Navideña* 🎅\n\n${txt.slice(0, 65536)}`)
      await m.react('✔️')
    }

  } catch (e) {
    await m.react('✖️')
    conn.reply(m.chat, `⚠️ El ritual falló...\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m)
  }
}

handler.help = ['get']
handler.tags = ['tools']
handler.command = ['fetch', 'get']

export default handler