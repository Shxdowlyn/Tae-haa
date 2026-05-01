const userSpamData = {}

let handler = m => m

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems }) {
  const chat = global.db.data.chats[m.chat]
  const bot = global.db.data.settings[conn.user.jid] || {}

  if (!bot.antiSpam) return
  if (m.isGroup && chat.modoadmin) return  

  if (isOwner || isROwner || isAdmin || isPrems) return

  const sender = m.sender
  const currentTime = Date.now()
  const timeWindow = 5000   
  const messageLimit = 10   

  if (!(sender in userSpamData)) {
    userSpamData[sender] = {
      lastMessageTime: currentTime,
      messageCount: 1,
      antiBan: 0
    }
  } else {
    const userData = userSpamData[sender]
    const timeDifference = currentTime - userData.lastMessageTime

    if (timeDifference <= timeWindow) {
      userData.messageCount++

      if (userData.messageCount >= messageLimit) {
        userData.antiBan++

        if (userData.antiBan === 1) {
          await conn.reply(m.chat, `╭━━━〔 ⚠︎ ADVERTENCIA 〕━━━╮
┃
┃ ✦ Usuario: @${sender.split('@')[0]}
┃ ✦ Primera advertencia
┃ ✦ Motivo: Spam
┃
┃ 🚫 Evita repetir esta acción
┃
╰━━━〔 SISTEMA 〕━━━╯`, m, { mentions: [sender] })
        } else if (userData.antiBan === 2) {
          await conn.reply(m.chat, `╭━━━〔 ⚠︎ ADVERTENCIA 2 〕━━━╮
┃
┃ ✦ Usuario: @${sender.split('@')[0]}
┃ ✦ Segunda advertencia
┃ ✦ Motivo: Reincidencia de spam
┃
┃ ⚠️ Si continúas serás expulsado
┃
╰━━━〔 SISTEMA 〕━━━╯`, m, { mentions: [sender] })
        } else if (userData.antiBan >= 3) {
          if (isBotAdmin) {
            try {
              await conn.reply(m.chat, `╭━━━〔 ⛔ EXPULSIÓN 〕━━━╮
┃
┃ ✦ Usuario: @${sender.split('@')[0]}
┃ ✦ Motivo: Spam
┃
┃ ✦ Acción: Expulsado del grupo
┃
╰━━━〔 SISTEMA 〕━━━╯`, m, { mentions: [sender] })
              await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
            } catch (err) {
              console.error('Error al expulsar:', err)
              await conn.reply(m.chat, `╭━━━〔 ⚠︎ ERROR DE EXPULSIÓN 〕━━━╮
┃
┃ ✦ No se pudo expulsar a:
┃   @${sender.split('@')[0]}
┃
┃ ✦ Estado: Fallo de ejecución
┃
╰━━━〔 SISTEMA 〕━━━╯`, m, { mentions: [sender] })
            }
          } else {
            await conn.reply(m.chat, `╭━━━〔 ⚠︎ PERMISO INSUFICIENTE 〕━━━╮
┃
┃ ✦ No puedo expulsar porque no soy admin
┃
┃ ✦ Usuario: @${sender.split('@')[0]}
┃ ✦ Motivo: Spam detectado
┃
╰━━━〔 ACCIÓN REQUERIDA 〕━━━╯`, m, { mentions: [sender] })
          }
        }

        userData.messageCount = 1
      }
    } else {
      userData.messageCount = 1
    }

    userData.lastMessageTime = currentTime
  }
}

export default handler