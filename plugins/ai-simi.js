import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `╭━━━〔 TAE-HAA // INPUT 〕━━━╮
┃
┃ Entrada incompleta.
┃ No se recibió ningún texto.
┃
┣━━━〔 REQUISITO 〕━━━┫
┃ ✦ Acción :: Escribir mensaje
┃ ✦ Destino :: Interacción
┃
┣━━━〔 NOTA 〕━━━┫
┃ ✦ Ingresa un texto para continuar.
┃
╰━━━〔 Tae-Haa exige precisión 〕━━━╯`, m)

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

— Si Adara te habla: (Adara , Número +54 9 3863 44-7787),
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
    await conn.reply(m.chat, `╭━━━〔 TAE-HAA // ERROR 〕━━━╮
┃
┃ Fallo de conexión.
┃ No se pudo establecer enlace con Simi.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Estado :: Error de red
┃ ✦ Acción :: Reintentar
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Fallido
┃ ✦ Revisión  :: Pendiente
┃
╰━━━〔 Tae-Haa no tolera fallos 〕━━━╯`, m)
  }
}

handler.help = ['simi']
handler.tags = ['tools']
handler.register = true
handler.command = ['simi']

export default handler