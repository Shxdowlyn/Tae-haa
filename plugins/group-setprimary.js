import ws from 'ws'

const handler = async (m, { conn, usedPrefix }) => {
  const subBots = [
    ...new Set(
      [
        ...global.conns
          .filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED)
          .map((conn) => conn.user.jid),
      ]
    ),
  ]

  if (global.conn?.user?.jid && !subBots.includes(global.conn.user.jid)) {
    subBots.push(global.conn.user.jid)
  }

  const chat = global.db.data.chats?.[m.chat] || {}
  const mentionedJid = m.mentionedJid
  const who = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.quoted ? m.quoted.sender : false

  if (!who) return conn.reply(m.chat, `╭━━━〔 TAE-HAA // CONTROL 〕━━━╮
┃
┃ Orden incompleta.
┃ No se ha definido un objetivo.
┃
┣━━━〔 REQUISITO 〕━━━┫
┃ ✦ Acción :: Mencionar usuario
┃ ✦ Rol    :: Bot principal
┃
┣━━━〔 NOTA 〕━━━┫
┃ ✦ Indica qué Socket será asignado.
┃
╰━━━〔 Tae-Haa exige precisión 〕━━━╯`, m)
  if (!subBots.includes(who)) return conn.reply(m.chat, `╭━━━〔 TAE-HAA // CONTROL 〕━━━╮
┃
┃ Validación fallida.
┃ El objetivo no cumple los requisitos.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Tipo :: Socket requerido
┃ ✦ Sistema :: ${global.botname}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Rechazado
┃ ✦ Motivo    :: Usuario inválido
┃
╰━━━〔 Tae-Haa no acepta errores 〕━━━╯`, m)
  if (chat.primaryBot === who) {
    return conn.reply(
      m.chat,
     `╭━━━〔 TAE-HAA // CONTROL 〕━━━╮
┃
┃ Acción innecesaria.
┃ El objetivo ya ocupa el rol asignado.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Usuario :: @${who.split`@`[0]}
┃ ✦ Rol     :: Bot primario activo
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Cambio :: No requerido
┃ ✦ Resultado :: Sin modificaciones
┃
╰━━━〔 Tae-Haa no repite órdenes 〕━━━╯`,
      m,
      { mentions: [who] }
    )
  }

  try {
    if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = { primaryBot: who }
    } else {
        global.db.data.chats[m.chat].primaryBot = who
    }

    await global.db.write()

    conn.reply(
      m.chat,
      `╭━━━〔 TAE-HAA // CONTROL 〕━━━╮
┃
┃ Configuración aplicada.
┃ Nuevo bot primario asignado.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Usuario :: @${who.split`@`[0]}
┃ ✦ Rol     :: Bot primario
┃
┣━━━〔 SISTEMA 〕━━━┫
┃ ✦ Comandos :: Redirigidos
┃ ✦ Control  :: Transferido
┃
╰━━━〔 Tae-Haa establece el orden 〕━━━╯`,
      m,
      { mentions: [who] }
    )
  } catch (e) {
    console.error(e)
    conn.reply(
      m.chat,
      `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`,
      m
    )
  }
}

handler.help = ['setprimary']
handler.tags = ['grupo']
handler.command = ['setprimary']
handler.group = true
handler.admin = true

export default handler