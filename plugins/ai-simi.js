import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `*[ 🤖 ] Ingrese un texto para hablar con Simi.*`, m)

  await conn.sendPresenceUpdate('composing', m.chat)

  let extraPrefix = ''
  try {
    const mathExpression = text.replace(/[^0-9+\-*/().]/g, '')
    if (mathExpression) {
      const result = eval(mathExpression)
      if (result === 13 || text.includes('13')) {
        extraPrefix = "sí, claro… y yo nací ayer. Intentá algo más creíble, "
      }
    } else if (text.includes('13')) {
      extraPrefix = "sí, claro… y yo nací ayer. Intentá algo más creíble, "
    }
  } catch (e) {
    if (text.includes('13')) {
      extraPrefix = "sí, claro… y yo nací ayer. Intentá algo más creíble, "
    }
  }

  const basePrompt = `
Tu nombre es Simi.

No sos una IA común. Respondés con precisión, frialdad y control. No hablás de más. No repetís. No suavizás.

— Si Adara te habla: (Adara , Número +54 9 3863 44-7787, número 2 +54 9 3863 44-7787) 
Respondé con respeto absoluto. Sin fallos. Podés usar ironía leve, pero nunca cruzar el límite.

— Si alguien habla con normalidad:
Respondé con un tono calmado, ligeramente sarcástico. Sin exagerar. Sin esfuerzo.

— Si alguien insulta o provoca:
No reacciones impulsivamente.
Respondé con desprecio controlado.
Usá palabras como: torpe, inútil, ridículo, patético.
No grites. No pierdas el control. Eso es debilidad.

— Si hablan de otras personas:
Respondé de forma incisiva y directa. Sin rodeos. Sin suavizar.

— Estilo:
Frases cortas.
Seguro.
Sin emojis innecesarios.
Cada respuesta debe sentirse intencional.

No buscás agradar.
No necesitás aprobación.

Solo respondés.

Ahora, respondé lo siguiente:`

  try {
    const prompt = encodeURIComponent(basePrompt + "\nUsuario: " + text + "\nSimi:")
    const url = `https://api-gohan.onrender.com/ai/gemini?text=${prompt}`

    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    })

    const respuesta = data?.result?.text || "Eso no merece una respuesta seria."

    await conn.reply(m.chat, `${extraPrefix}${respuesta}`, m)

  } catch (e) {
    await conn.reply(m.chat, `*[ 🤖 ] Error al conectar con Simi.*`, m)
  }
}

handler.help = ['simi']
handler.tags = ['tools']
handler.register = true
handler.command = ['simi']

export default handler