import fetch from 'node-fetch'

let handler = async (m, { conn, command, args, usedPrefix }) => {
  if (!args[0]) return conn.reply(m.chat, `╭━━━〔 ⚠︎ AVISO 〕━━━╮
┃
┃ ✦ Debes enviar un link
┃   para continuar
┃
┃ ✦ Acción requerida
┃
╰━━━〔 En espera 〕━━━╯`, m)
  try {
    await m.react('🎭') // reacción teatral

    // Captura de pantalla completa con Thum.io
    let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()

    // Envía la imagen con estilo Shadow Garden navideño
    await conn.sendFile(
      m.chat,
      ss,
      'shadow_screenshot.png',
      `🌌 *Reflejo invocado desde las Sombras – Edición Navideña* 🎅\n🔗 ${args[0]}`,
      m
    )

    await m.react('✔️')
  } catch (error) {
    await m.react('✖️')
    return conn.reply(
      m.chat,
      `⚠️ El ritual de invocación falló...\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`,
      m
    )
  }
}

handler.help = ['ssweb', 'ss']
handler.tags = ['tools']
handler.command = ['ssweb', 'ss']
handler.group = true

export default handler