import fetch from 'node-fetch'

const imagen1 = 'https://files.catbox.moe/klwxf5.jpg'

var handler = async (m, { conn }) => {
  let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
  let username = await conn.getName(who)

  let pp
  try {
    pp = await conn.profilePictureUrl(who, 'image')
  } catch {
    pp = imagen1
  }

  let user = global.db.data.users[who]
  if (!user) {
    global.db.data.users[who] = {
      registered: false,
      regTime: -1,
      age: 0
    }
    user = global.db.data.users[who]
  }

  let { registered } = user

  const frasesShadow = [
  'Vigilan en silencio, su poder nunca se apaga.',
  'Observa más allá de lo evidente.',
  'Quien se acepta a sí mismo, encuentra la verdadera calma.',
  'Nunca descansan, siempre están presentes.',
  'El archivo oculto revela una fuerza imposible de ignorar.'
]
  const fraseElegida = frasesShadow[Math.floor(Math.random() * frasesShadow.length)]

  let animacion = `
╭━━━〔 TAE-HAA // SYSTEM 〕━━━╮

┃ Inicializando sistema...
┃ Sincronizando registros...
┃ Ejecutando protocolos...

┣━━━〔 PROCESO 〕━━━┫
┃ ✦ Acceso verificado
┃ ✦ Datos alineados
┃ ✦ Control establecido

╰━━━〔 STATUS: COMPLETE 〕━━━╯

"Todo está bajo control."
`.trim()

  await conn.sendMessage(m.chat, { text: animacion, ...rcanal }, { quoted: m })

  let str = `╭━━━〔 TAE-HAA // ARCHIVO 〕━━━╮

┃ ✦ Portador :: ${username}
┃ ✦ ID       :: @${who.replace(/@.+/, '')}
┃ ✦ Registro :: ${registered ? 'Verificado' : 'No registrado'}

┣━━━〔 PERFIL 〕━━━┫
┃ "${fraseElegida}"

┣━━━〔 SISTEMA 〕━━━┫
┃ ✦ Estado :: Activo
┃ ✦ Control :: Estable

╰━━━〔 Tae-Haa observa en silencio 〕━━━╯`

  const wm = (typeof global !== 'undefined' && global.wm) ? global.wm : 'Shadow-BOT-MD ⚔️'
  const bot = 'Shadow-BOT-MD ⚔️'

  let fkontak = {
    key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  }

  await conn.sendButton(
    m.chat,
    str,
    wm,
    pp, 
    [
      ['👑 Creadores', '#owner'],
      ['⚔️ Volver al Menú', '/menu']
    ],
    null,
    [[bot, 'https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O']],
    fkontak
  )
}

handler.help = ['profile']
handler.register = true
handler.group = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler