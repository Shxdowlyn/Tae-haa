import axios from 'axios'

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text) {
    return conn.reply(m.chat, `🌌 *Discípulo de las Sombras* 🎄\nDebes entregar una *IP* para invocar el oráculo.`, m)
  }
  try {
    await m.react('🎭') // reacción teatral inicial
    const res = await axios.get(`http://ip-api.com/json/${text}?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,mobile,hosting,query`)
    const data = res.data
    if (String(data.status) !== "success") {
      throw new Error(data.message || "Falló la invocación")
    }

    let ipsearch = `╭━━━〔 TAE-HAA // IP SCAN 〕━━━╮
┃
┃ Consulta ejecutada.
┃ Datos extraídos sin intervención.
┃
┣━━━〔 INFORMACIÓN 〕━━━┫
┃ ✦ IP            :: ${data.query}
┃ ✦ País          :: ${data.country} (${data.countryCode})
┃ ✦ Región        :: ${data.regionName} (${data.region})
┃ ✦ Ciudad        :: ${data.city}
┃ ✦ Distrito      :: ${data.district}
┃ ✦ Código Postal :: ${data.zip}
┃ ✦ Zona Horaria  :: ${data.timezone}
┃
┣━━━〔 RED 〕━━━┫
┃ ✦ ISP           :: ${data.isp}
┃ ✦ Organización  :: ${data.org}
┃ ✦ AS            :: ${data.as}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Mobile        :: ${data.mobile ? "Sí" : "No"}
┃ ✦ Hosting       :: ${data.hosting ? "Sí" : "No"}
┃
╰━━━〔 Rastreo completo 〕━━━╯`.trim()
    conn.reply(m.chat, ipsearch, m)
    await m.react('✔️')
  } catch (error) {
    await m.react('✖️')
    conn.reply(m.chat, `⚠️ El ritual falló...\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`, m)
  }
}

handler.help = ['ip <dirección>']
handler.tags = ['owner']
handler.command = ['ip']

export default handler