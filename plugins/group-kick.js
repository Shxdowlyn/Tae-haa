var handler = async (m, { conn, participants, usedPrefix, command }) => {
  let mentionedJid = await m.mentionedJid
  let user = mentionedJid && mentionedJid.length
    ? mentionedJid[0]
    : m.quoted && await m.quoted.sender
      ? await m.quoted.sender
      : null

  if (!user) return conn.reply(m.chat, `╭━━━〔 TAE-HA // REQUISITO 〕━━━╮
┃
┃ Acción incompleta.
┃ No se definió el objetivo.
┃
┣━━━〔 NECESARIO 〕━━━┫
┃ Mencioná al usuario a expulsar.
┃
╰━━━〔 Sin objetivo no hay acción 〕━━━╯`, m)

  try {
    const groupInfo = await conn.groupMetadata(m.chat)
    const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net'

    if (user === conn.user.jid) return conn.reply(m.chat, `☽ No puedo eliminar al bot del grupo.`, m)
    if (user === ownerGroup) return conn.reply(m.chat, `☽ No puedo eliminar al propietario del grupo.`, m)
    if (user === ownerBot) return conn.reply(m.chat, `☽ No puedo eliminar al propietario del bot.`, m)

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove')

    await conn.reply(
      m.chat,
      `╭━━━〔 TAE-HA // EXPULSIÓN 〕━━━╮
┃
┃ Objetivo removido.
┃ La decisión ya fue ejecutada.
┃
┣━━━〔 USUARIO 〕━━━┫
┃ ✦ @${user.split('@')[0]}
┃
┣━━━〔 RESULTADO 〕━━━┫
┃ Fuera del dominio.
┃ Sin retorno.
┃
╰━━━〔 Orden mantenido 〕━━━╯`,
      m,
      { mentions: [user] }
    )
  } catch (e) {
    conn.reply(
      m.chat,
      `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`,
      m
    )
  }
}

handler.help = ['kick']
handler.tags = ['grupo']
handler.command = ['kick', 'echar', 'hechar', 'sacar', 'ban']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler