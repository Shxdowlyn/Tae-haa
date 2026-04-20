import db from '../lib/database.js'
import util from 'util'

const handler = async (m, { conn, text }) => {
  if (!config.isOwner(m.sender)) {
    return m.reply('❌ *Solo el amo de las sombras puede usar este poder.*')
  }

  const code = text?.trim() || m.text?.replace(/^=>|^.\$|^\.ev|^\.evaluate/i, '').trim()

  if (!code) {
    return m.reply(
     `╭━━━〔 EVAL BEOM TAE-HAA  〕━━━╮
┃
┃ Ejecución habilitada.
┃ El sistema responde… si sabés qué hacer.
┃
┣━━━〔 FUNCIÓN 〕━━━┫
┃ Ejecuta código JavaScript.
┃ Sin errores. Sin explicaciones.
┃
┣━━━〔 EJEMPLOS 〕━━━┫
┃ ➤ => 1 + 1
┃ ➤ => m.chat
┃ ➤ => db.getUser(m.sender)
┃
╰━━━〔 No improvises 〕━━━╯`
    )
  }

  const db = getDatabase()
  let result
  let isError = false

  try {
    result = await eval(`(async () => { ${code} })()`)
  } catch (e) {
    isError = true
    result = e
  }

  let output
  if (typeof result === 'undefined') {
    output = 'undefined'
  } else if (result === null) {
    output = 'null'
  } else if (typeof result === 'object') {
    try {
      output = util.inspect(result, { depth: 2, maxArrayLength: 50 })
    } catch {
      output = String(result)
    }
  } else {
    output = String(result)
  }

  if (output.length > 3000) {
    output = output.slice(0, 3000) + '\n\n... (truncado por las sombras)'
  }

  const status = isError ? '❌ Error' : '✅ Success'
  const type = isError ? result?.name || 'Error' : typeof result

  const resultText = `╭━━━〔 EVAL // RESULTADO 〕━━━╮
┃
┃ Ejecución finalizada.
┃ El sistema no comete errores.
┃
┣━━━〔 INFORMACIÓN 〕━━━┫
┃ ✦ Estado :: ${status}
┃ ✦ Tipo   :: ${type}
┃
┣━━━〔 SALIDA 〕━━━┫
┃ \`\`\`
${output}
\`\`\`
┃
╰━━━〔 Interpretación: tu responsabilidad 〕━━━╯`

  await m.reply(resultText)
}

handler.command = ['eval', 'ev', 'evaluate', '=>']
handler.tags = ['owner']
handler.owner = true

export default handler