// créditos reservados para wilkerson
let handler = async (m, { conn }) => {
  let chat = global.db.data.chats[m.chat]
  if (!chat || !chat.primaryBot) {
    return m.reply(`╭━━━〔 TAE-HAA // CONTROL 〕━━━╮
┃
┃ Estado indefinido.
┃ No hay un bot primario asignado.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Rol :: Bot principal
┃ ✦ Estado :: No configurado
┃
┣━━━〔 NOTA 〕━━━┫
┃ ✦ Asigna uno para habilitar el control.
┃
╰━━━〔 Tae-Haa no opera sin orden 〕━━━╯`)
  }

  let botJid = chat.primaryBot
  m.reply(`🤖 El bot principal en este grupo es:\n*${botJid}*`)
}

handler.help = ['verprimary']
handler.tags = ['serbot']
handler.command = ['verprimary']
handler.group = true
handler.admin = true

export default handler