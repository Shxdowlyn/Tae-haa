import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  await m.react('👑') 
  let list = [
    {
      displayName: ' Shadow Creator ',
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:Shadow Master
TEL;type=CELL;waid=584242773183:+58 424-2773183
TEL;type=CELL;waid=50493732693:+504 9373-2693
END:VCARD`
    }
  ]

  const canalInfo = {
    title: '⚔️ Canal Oficial de SHADOW ⚔️',
    body: 'Sumérgete en las sombras. Únete al canal oficial.',
    thumbnailUrl: 'https://files.catbox.moe/iq1skp.jpg',
    sourceUrl: 'https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O',
    mediaType: 1,
    renderLargerThumbnail: true
  }

  await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: `${list.length} Contacto`,
        contacts: list
      },
      contextInfo: {
        externalAdReply: canalInfo
      }
    },
    { quoted: m }
  )

  let txt = `╭━━━〔 INFO DEL CREADOR 〕━━━╮
┃
┃ ⚔️ SHADOW MASTER ⚔️
┃ El estratega detrás del sistema
┃
┣━━━〔 CANAL OFICIAL 〕━━━┫
┃ https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O
┃
┣━━━〔 CONTACTOS 〕━━━┫
┃ ✦ Creador principal
┃   +58 424-2773183 (Yosue)
┃
┃ ✦ Segundo creador
┃   +504 9373-2693 (Ado)
┃
╰━━━〔 Shadow-BOT-MD 〕━━━╯`

  await conn.sendMessage(
    m.chat,
    {
      text: txt,
      ...rcanal
    },
    { quoted: m }
  )
}

handler.help = ['owner', 'creador']
handler.tags = ['info']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler