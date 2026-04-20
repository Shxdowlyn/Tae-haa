// 👻 Juego del Ahorcado Shadow Garden + Navidad echo por yosue uwu osea shadow 👻
let partidas = {} // almacena partidas activas por chat

// Dibujos del ahorcado paso a paso
const ahorcadoStages = [
  `
  
  

  
  `,
  `
  
  |
  |
  |
  `,
  `
  ______
  |
  |
  |
  `,
  `
  ______
  |    O
  |
  |
  `,
  `
  ______
  |    O
  |    |
  |
  `,
  `
  ______
  |    O
  |   /|
  |
  `,
  `
  ______
  |    O
  |   /|\\
  |
  `,
  `
  ______
  |    O
  |   /|\\
  |   /
  `,
  `
  ______
  |    O
  |   /|\\
  |   / \\
  `
]

function ocultarPalabra(palabra, letras) {
  return palabra.split('').map(l => letras.includes(l) ? l : '_').join(' ')
}

let handler = async (m, { command, text }) => {
  const chatId = m.chat
  const jugador = m.pushName || m.sender

  // Palabras fijas estilo Shadow Garden + Navidad
  const palabras = [
    "shadow", "garden", "eminence", "alpha", "beta", "gamma",
    "delta", "epsilon", "zeta", "navidad", "regalo", "nieve",
    "sombras", "trineo", "estrella", "festivo"
  ]

  if (command === 'orcado' || command === 'ahorcado') {
    const palabra = palabras[Math.floor(Math.random() * palabras.length)]
    partidas[chatId] = { jugador, palabra, letras: [], errores: 0 }

    await m.reply(
`╭━━━〔 🎮 JUEGO DEL AHORCADO 〕━━━╮
┃
┃ 👤 Jugador: ${jugador}
┃
┃ 🔤 Palabra oculta:
┃ ${ocultarPalabra(partidas[chatId].palabra, [])}
┃
┣━━━〔 INSTRUCCIONES 〕━━━┫
┃ ✦ Usa: .letra <letra>
┃ ✦ Adivina antes de que se acaben los intentos
┃
╰━━━〔 Sistema activo 〕━━━╯`
)
  }

  if (command === 'letra') {
    if (!partidas[chatId]) return m.reply("⚠️ No hay ninguna partida activa. Usa .orcado para empezar.")
    if (!text) return m.reply("🔤 Ingresa una letra para adivinar.")

    const partida = partidas[chatId]
    const letra = text.toLowerCase()

    if (partida.letras.includes(letra)) {
      return m.reply(`⚠️ ${jugador}, ya intentaste con la letra "${letra}".`)
    }

    partida.letras.push(letra)

    if (partida.palabra.includes(letra)) {
      const oculto = ocultarPalabra(partida.palabra, partida.letras)
      if (!oculto.includes('_')) {
        m.reply(
`╭━━━〔 🎮 VICTORIA 〕━━━╮
┃
┃ 🎉 ¡Felicidades, ${jugador}!
┃
┃ ✔ Has descubierto la palabra:
┃ "${partida.palabra}"
┃
┃ ⏱ Resultado: Victoria antes del límite
┃
╰━━━〔 Juego finalizado 〕━━━╯`
)
        delete partidas[chatId]
      } else {
        m.reply(
`╭━━━〔 🎮 AHORCADO 〕━━━╮
┃
┃ ✅ Bien hecho, ${jugador}
┃
┃ 🔤 Palabra actual:
┃ ${oculto}
┃
╰━━━〔 Continúa jugando 〕━━━╯`
)
      }
    } else {
      partida.errores++
      if (partida.errores >= ahorcadoStages.length - 1) {
        m.reply(
`${ahorcadoStages[partida.errores]}

╭━━━〔 🎮 AHORCADO 〕━━━╮
┃
┃ ❌ ${jugador}
┃
┃ El juego ha terminado
┃
┃ 🔤 Palabra correcta:
┃ "${partida.palabra}"
┃
╰━━━〔 Fin de la partida 〕━━━╯`
)
        delete partidas[chatId]
      } else {
        m.reply(`${ahorcadoStages[partida.errores]}\n⚠️ ${jugador}, la letra "${letra}" no está. Te quedan ${ahorcadoStages.length - 1 - partida.errores} intentos.`)
      }
    }
  }
}

handler.help = ['orcado', 'letra <letra>']
handler.tags = ['game', 'shadow', 'navidad']
handler.command = ['orcado', 'ahorcado', 'letra']

export default handler