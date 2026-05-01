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
      `╭━━━〔 🌌 REFLEJO INVOCADO 〕━━━╮
┃
┃ ✦ Estado
┃   Reflejo generado correctamente
┃
┃ ✦ Enlace
┃   ${args[0]}
┃
┃ ✦ Modo
┃   Edición navideña
┃
╰━━━〔 Proceso completado 〕━━━╯`,
      m
    )

    await m.react('✔️')
  } catch (error) {
    await m.react('✖️')
    return conn.reply(
      m.chat,
      `╭━━━〔 ❌ ERROR 〕━━━╮
┃
┃ ✦ Falló la invocación
┃
┣━━━〔 SOLUCIÓN 〕━━━┫
┃ Usa ${usedPrefix}report
┃ para informarlo
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ${error.message}
┃
╰━━━〔 Proceso detenido 〕━━━╯`,
      m
    )
  }
}

handler.help = ['ssweb', 'ss']
handler.tags = ['tools']
handler.command = ['ssweb', 'ss']
handler.group = true

export default handler