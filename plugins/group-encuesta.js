let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const emojiShadow = "🌑"
  const emojiChristmas = "🎄"

  // Validaciones
  if (!args[0]) throw `╭━━━〔 TAE-HA // INPUT 〕━━━╮
┃
┃ Sin contenido.
┃ No hay nada que procesar.
┃
┣━━━〔 REQUISITO 〕━━━┫
┃ Ingresá opciones para la encuesta.
┃
┣━━━〔 FORMATO 〕━━━┫
┃ ✦ ${usedPrefix + command} Pizza|Hamburguesa|Tacos
┃
╰━━━〔 Definí antes de ejecutar 〕━━━╯`
  if (!text.includes('|')) throw `╭━━━〔 TAE-HA // FORMATO 〕━━━╮
┃
┃ Estructura inválida.
┃ Separador no detectado.
┃
┣━━━〔 REQUISITO 〕━━━┫
┃ Usá “|” para dividir las opciones.
┃
┣━━━〔 EJEMPLO 〕━━━┫
┃ ✦ ${usedPrefix + command} perros|conejos|gatos
┃
╰━━━〔 Sin formato no hay ejecución 〕━━━╯`

  // Procesar opciones
  let opciones = []
  let partes = text.split('|')
  for (let i = 0; i < partes.length; i++) {
    opciones.push([`${emojiShadow} ${partes[i].trim()} ${emojiChristmas}`])
  }

  // Título de la encuesta con estilo Shadow + Navidad
  let titulo = `🌑 Encuesta de las Sombras ${emojiChristmas}\n\n` +
               `👾 *The Eminence in Shadow* se mezcla con la magia navideña...\n` +
               `✨ Elige con cuidado, cada opción refleja tu destino.`

  // Enviar encuesta
  return conn.sendPoll(m.chat, titulo, opciones, m)
}

// Ayuda y configuración
handler.help = ['encuesta <opción1|opción2|...>']
handler.tags = ['grupo']
handler.command = ['poll', 'encuesta', 'shadowpoll']
handler.group = true

export default handler