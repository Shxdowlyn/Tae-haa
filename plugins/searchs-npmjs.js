import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `╭━━━〔 ⚠︎ AVISO 〕━━━╮
┃
┃ ✦ Debes escribir el nombre
┃   del scraper o paquete
┃
┣━━━〔 EJEMPLO 〕━━━┫
┃ ${usedPrefix + command} yt-search
┃
╰━━━〔 Requisito necesario 〕━━━╯`, m)

  try {
    await m.react('🎭') // reacción teatral inicial
    conn.reply(m.chat, `🌌 *Invocando las Sombras* 🎅\nBuscando el scraper en los registros ocultos...`, m)

    let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
    let { objects } = await res.json()

    if (!objects.length) return conn.reply(m.chat, `🌌 *Discípulo de las Sombras* 🎄\nNo se encontró resultado para: *${text}*`, m)

    let txt = objects.map(({ package: pkg }) => {
      return `╭━━━〔 SCRAPER INVOCADO 〕━━━╮
┃
┃ ✦ Nombre
┃   ${pkg.name}
┃
┃ ✦ Versión
┃   V${pkg.version}
┃
┃ ✦ Enlace
┃   ${pkg.links.npm}
┃
┃ ✦ Descripción
┃   ${pkg.description || 'Sin descripción'}
┃
╰━━━〔 FIN 〕━━━╯`
    }).join`\n\n`

    await conn.reply(m.chat, txt, m, fake)
    await m.react('✔️')
  } catch {
    await conn.reply(m.chat, `⚠️ El ritual falló...\n> Usa *${usedPrefix}report* para informarlo.`, m)
    await m.react('✖️')
  }
}

handler.help = ['npmjs']
handler.tags = ['buscador']
handler.command = ['npmjs']
handler.register = true

export default handler