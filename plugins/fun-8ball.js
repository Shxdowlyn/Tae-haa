let handler = async (m, { args, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🌑❄️ *Sombras Festivas del Destino* ❄️🌑\n\nUsa el comando así:\n${usedPrefix}${command} ¿seré millonario?\n\nHaz tu pregunta y las sombras responderán con un sí o un no...`)

  const pregunta = text.toLowerCase()
  let respuesta = Math.random() < 0.5 ? '🎄✨ Sí, bajo el manto de las sombras...' : '🌑⛄ No, el destino se oculta en la nieve...'

  if (pregunta.includes('gay') || pregunta.includes('homo') || pregunta.includes('bisexual')) {
    respuesta = '🎁🌌 Sí, las estrellas confirman tu verdad...'
  } else if (pregunta.includes('hetero') || pregunta.includes('heterosexual')) {
    respuesta = '🕯️❄️ No, las sombras niegan ese camino...'
  }

  await m.reply(
`╭━━━〔 🎭 ORÁCULO DE TAE-HAA 〕━━━╮
┃
┃ 🌌 Consulta registrada...
┃ La energía ha sido interpretada.
┃
┣━━━〔 PREGUNTA 〕━━━┫
┃ ✦ ${text}
┃
┣━━━〔 RESPUESTA 〕━━━┫
┃ 🔮 ${respuesta}
┃
┣━━━〔 MENSAJE 〕━━━┫
┃ Las sombras susurran en silencio...
┃ Tae-haa esta observando tu destino.
┃
╰━━━〔 Fin de la lectura 〕━━━╯`
)
}

handler.help = ['8ball <pregunta>']
handler.tags = ['fun', 'shadow', 'navidad']
handler.command = ['8ball', 'shadowball', 'naviball']

export default handler