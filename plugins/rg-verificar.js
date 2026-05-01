import { createHash } from 'crypto'

const SelloMistico = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  const who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)
  const pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')
  const user = global.db.data.users[m.sender]
  const name2 = conn.getName(m.sender)

  if (user.registered) {
    return conn.sendMessage(m.chat, {
      text: `╭━━━〔 ⚠︎ REGISTRO ACTIVO 〕━━━╮
┃
┃ ✦ Ya tienes un registro activo
┃   ${name2}-kun
┃
┃ ✦ ¿Deseas eliminarlo?
┃   Esto borrará tu vínculo actual
┃
┃ ✦ Uso: ${usedPrefix}unreg
┃
╰━━━〔 Confirmación requerida 〕━━━╯`,
      buttons: [
        { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '⚔️ Volver al Menú' }, type: 1 },
        { buttonId: `${usedPrefix}unreg`, buttonText: { displayText: '🌌 Romper el Sello' }, type: 1 }
      ],
      headerType: 1
    }, { quoted: m })
  }

  if (!SelloMistico.test(text)) {
    return m.reply(`╭━━━〔 ⚠︎ ERROR DE FORMATO 〕━━━╮
┃
┃ ✦ El comando no está bien escrito
┃
┣━━━〔 FORMATO CORRECTO 〕━━━┫
┃ ${usedPrefix + command} nombre.edad
┃
┣━━━〔 EJEMPLO 〕━━━┫
┃ ${usedPrefix + command} ${name2}.18
┃
╰━━━〔 Intenta nuevamente 〕━━━╯`)
  }

  let [_, name, __, age] = text.match(SelloMistico)
  age = parseInt(age)

  if (age > 60) {
    return m.reply(`╭━━━〔 ⚠︎ EDAD NO VÁLIDA 〕━━━╮
┃
┃ ✦ No puedes registrarte
┃   con más de 60 años
┃
╰━━━〔 Intenta nuevamente 〕━━━╯`)
  }
  if (age >= 1 && age <= 5) {
    return m.reply(`╭━━━〔 ⚠︎ EDAD NO VÁLIDA 〕━━━╮
┃
┃ ✦ No puedes registrarte
┃   con menos de 6 años
┃
╰━━━〔 Intenta nuevamente 〕━━━╯`)
  }
  if (isNaN(age) || age < 10) {
    return m.reply(`╭━━━〔 ⚠︎ EDAD INVÁLIDA 〕━━━╮
┃
┃ ✦ Debes ingresar una edad válida
┃   mayor a 10
┃
╰━━━〔 Intenta nuevamente 〕━━━╯`)
  }

  user.name = `${name}⋆⟡Shadow⟡⋆`
  user.age = age
  user.regTime = +new Date()
  user.registered = true

  const sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  const certificadoPacto = `
╭━━━〔 REGISTRO COMPLETADO 〕━━━╮
┃
┃ ✦ Nombre
┃   ${name}
┃
┃ ✦ Edad
┃   ${age} años
┃
┃ ✦ Código de registro
┃   ${sn}
┃
┣━━━〔 INFORMACIÓN 〕━━━┫
┃ ✦ Ya puedes usar los comandos del bot
┃
┃ ✦ Para ver tu perfil:
┃   .profile
┃
╰━━━〔 SISTEMA 〕━━━╯
`.trim()

  await m.react('🌑')

  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: certificadoPacto,
    buttons: [
      { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '🌌 Volver al Menú' }, type: 1 },
      { buttonId: `${usedPrefix}profile ${m.sender}`, buttonText: { displayText: 'Perfil del grupo xd' }, type: 1 }
    ],
    headerType: 4,
    contextInfo: {
      externalAdReply: {
        title: '☽ Pacto Shadow Completado ☽',
        body: 'El poder oculto ha sido sellado...',
        thumbnailUrl: pp,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })

  await conn.sendMessage(m.chat, {
    document: { url: 'https://files.catbox.moe/zbyywc.jpg' }, 
    mimetype: 'application/pdf', 
    fileName: '☽ Pacto Shadow ☽',
    caption: '『📜』 El pacto ha sido sellado con éxito...'
  }, { quoted: m })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler