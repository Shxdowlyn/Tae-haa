const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text}) => {

  conn.reply(m.chat, `🌌 Las sombras están buscando un consejo... espera en silencio...`, m)

  conn.reply(
  m.chat,
  `╭━━━〔 ⚘ CONSEJO DEL SISTEMA 〕━━━╮
┃
┃ ❥ "${pickRandom(global.consejo)}"
┃
╰━━━〔        MENSAJE       〕━━━╯`,
  m
)

}

handler.help = ['consejo']
handler.tags = ['fun']
handler.command = ['consejo']
handler.fail = null
handler.exp = 0
handler.group = true
handler.register = true

export default handler

let hasil = Math.floor(Math.random() * 5000)

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.consejo = [
"El esfuerzo constante siempre vence al talento sin disciplina",
"Lo que hoy parece difícil, mañana será tu rutina",
"No necesitas ser perfecto, solo necesitas ser constante",
"Cree en el proceso incluso cuando no veas resultados",
"Tu mayor competencia eres tú mismo de ayer",
"Cada error te acerca más a hacerlo bien",
"No esperes motivación, crea disciplina",
"El éxito no llega de golpe, se construye día a día",
"Pequeños avances también son progreso",
"La paciencia es parte del camino al éxito",
"Si te caes, levántate con más experiencia",
"No abandones solo porque es difícil",
"Tu mente puede ser tu mayor impulso o tu mayor límite",
"Hacer algo imperfecto es mejor que no hacer nada",
"El cambio empieza cuando decides intentarlo",
"No te compares, enfócate en mejorar",
"Los resultados llegan a quien no se rinde",
"Aprender siempre te hace más fuerte",
"No tengas miedo de empezar desde cero",
"Todo gran logro comenzó siendo un intento",
"El tiempo que inviertes en ti nunca se pierde",
"No busques excusas, busca soluciones",
"La disciplina supera a la motivación",
"Lo imposible solo tarda un poco más",
"Confía en tu proceso aunque nadie más lo entienda",
"Cada día es una nueva oportunidad para mejorar",
"No necesitas suerte, necesitas constancia",
"El progreso lento sigue siendo progreso",
"Tu esfuerzo de hoy es tu recompensa de mañana",
"No te detengas solo porque es difícil ahora",
"El verdadero fracaso es no intentarlo",
"Avanzar poco es mejor que no avanzar nada",
"No subestimes los pequeños logros",
"Tu futuro depende de lo que haces hoy",
"Cada día cuenta, aunque parezca pequeño",
"El cambio empieza con una decisión",
"No necesitas permiso para mejorar",
"Tu única competencia es tu versión anterior",
"El éxito es la suma de pequeños esfuerzos",
"No te rindas justo antes de lograrlo",
"Los límites muchas veces están en tu mente",
"Intenta una vez más antes de rendirte",
"El esfuerzo invisible también construye resultados",
"Confía más en tu proceso que en tus dudas",
"No todos los días serán fáciles, pero valen la pena",
"Cada intento te hace más fuerte",
"El aprendizaje nunca es pérdida de tiempo",
"No esperes el momento perfecto, créalo",
"Si quieres cambiar tu vida, cambia tus hábitos",
"Lo que repites, te convierte en eso",
"La constancia siempre supera la velocidad",
"No es magia, es disciplina diaria"
]