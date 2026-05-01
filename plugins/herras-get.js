import fetch from 'node-fetch'
import { format } from 'util'

let handler = async (m, { conn, usedPrefix, text }) => {
  if (m.fromMe) return
  if (!/^https?:\/\//.test(text)) 
    return m.reply(`╭━━━〔 ✨ AVISO 〕━━━╮
┃
┃ ✦ Debes enviar una URL válida
┃   para continuar
┃
╰━━━〔 Acción requerida 〕━━━╯`)

  let url = text
  await m.react('🎭') // reacción teatral

  try {
    let res = await fetch(url)

    // Protección contra archivos gigantes
    if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
      throw `╭━━━〔 ❌ ARCHIVO DEMASIADO GRANDE 〕━━━╮
┃
┃ ✦ No se puede procesar el archivo
┃ ✦ Tamaño detectado: ${res.headers.get('content-length')}
┃
╰━━━〔 Reduce el tamaño e intenta de nuevo 〕━━━╯`
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
    conn.reply(m.chat, `╭━━━〔 ⚠︎ ERROR 〕━━━╮
┃
┃ ✦ El proceso falló
┃
┣━━━〔 AYUDA 〕━━━┫
┃ Usa ${usedPrefix}report
┃ para informarlo
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ${e.message}
┃
╰━━━〔 Fin del proceso 〕━━━╯`, m)
  }
}

handler.help = ['get']
handler.tags = ['tools']
handler.command = ['fetch', 'get']

export default handler