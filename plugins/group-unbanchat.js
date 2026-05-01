import fs from 'fs'
import path from 'path'

const handler = async (m, { conn, isAdmin, isROwner }) => {
  const senderNumber = m.sender.replace(/[^0-9]/g, '')
  const botPath = path.join('./Sessions/SubBot', senderNumber)

  if (!(isAdmin || isROwner || fs.existsSync(botPath))) {
    return m.reply(
      `╭━━━〔 TAE-HAA // ACCESO 〕━━━╮
┃
┃ Acceso denegado.
┃ No posees los permisos requeridos.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Estado :: Restringido
┃ ✦ Acción :: Bloqueada
┃
┣━━━〔 NOTA 〕━━━┫
┃ ✦ Solicita autorización para continuar.
┃
╰━━━〔 Tae-Haa no permite intrusos 〕━━━╯`, 
      m
    )
  }

  global.db.data.chats[m.chat].isBanned = false

  m.reply(
    `˚∩ El bot ha sido desbaneado correctamente.`
  )
}

handler.help = ['desbanearbot']
handler.tags = ['group']
handler.command = ['desbanearbot', 'unbanchat']
handler.group = true

export default handler