import fetch from "node-fetch"

const API_URL = "https://dl08.yt-dl.click/"

let handler = async (m, { text }) => {
  if (!text) return m.reply(`╭━━━〔 TAE-HAA // INPUT 〕━━━╮
┃
┃ Entrada inválida.
┃ No se detectó un enlace.
┃
┣━━━〔 REQUISITO 〕━━━┫
┃ ✦ Tipo :: URL de YouTube
┃ ✦ Estado :: Vacío
┃
┣━━━〔 EJEMPLO 〕━━━┫
┃ ✦ ${usedPrefix + command} https://youtu.be/dQw4w9WgXcQ
┃
╰━━━〔 Tae-Haa exige precisión 〕━━━╯`)

  try {
    let body = {
      url: text,
      vQuality: "720p",
      isAudioOnly: false,
      filenamePattern: "pretty",
      disableMetadata: false,
      disableSubtitle: true
    }

    let res = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    })

    let data = await res.json().catch(() => null)
    if (!data) data = await res.text()

    await m.reply("Respuesta API:\n" + JSON.stringify(data, null, 2))
  } catch (e) {
    console.error(e)
    m.reply(`╭━━━〔 TAE-HAA // ERROR 〕━━━╮
┃
┃ Fallo de conexión.
┃ La API no respondió.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Estado :: Error de red
┃ ✦ Acción :: Reintentar
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Fallido
┃ ✦ Revisión  :: Pendiente
┃
╰━━━〔 Tae-Haa no tolera fallos 〕━━━╯`)
  }
}

handler.command = ['test']
export default handler