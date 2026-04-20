let handler = async (m, { args, text, usedPrefix, command }) => {
 if (!text) return m.reply(
`╭━━━〔  ORÁCULO FESTIVO DEL DESTINO  〕━━━╮
┃
┃ Los vientos del destino no han sido invocados...
┃ Falta tu pregunta para abrir el ritual.
┃
┣━━━〔 🜂 USO DEL CONJURO 🜂 〕━━━┫
┃
┃ ✦ ${usedPrefix}${command} ¿seré millonario?
┃
┣━━━〔 🔮 MENSAJE DEL ORÁCULO 〕━━━┫
┃
┃ ✦ Pronuncia tu duda al vacío digital
┃ Y el destino responderá con verdad
┃
╰━━━〔  El juicio aún no ha comenzado  〕━━━╯`
)

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