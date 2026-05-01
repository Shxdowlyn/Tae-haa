let media = 'https://files.catbox.moe/lcn1kw.mp4'
let handler = async (m, {conn, command}) => {
  const wm = (typeof global !== 'undefined' && global.wm) ? global.wm : 'Shadow-BOT-MD ⚔️';
  const bot = 'Shadow-BOT-MD ⚔️';

  let fkontak = {
    key: {participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo'},
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  }

  let str = `╭━━━〔 BIENVENIDO 〕━━━╮
┃
┃ 🌑⚔️ CUENTAS OFICIALES ⚔️🌑
┃ 💜 Welcome to Official Accounts
┃
┣━━━〔 BOT 〕━━━┫
┃ ✦ Shadow-BOT-MD
┃   El poder oculto se revela
┃   solo en las sombras...
┃
┣━━━〔 LINKS OFICIALES 〕━━━┫
┃ GitHub:
┃ https://github.com/yosue891
┃
┃ Canal Yosue:
┃ https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O
┃
┃ Canal Ado:
┃ https://whatsapp.com/channel/0029VbBIgz1HrDZg92ISUl2M
┃
┃ Comunidad:
┃ https://chat.whatsapp.com/ETHW7aP7kOICrR2RBrfE6N
┃
┣━━━〔 CREADORES〕━━━┫
┃ ✦ Yosue
┃   +58 424-2773183
┃
┃ ✦ Ado
┃   +504 9373-2693
┃
╰━━━〔 SISTEMA ACTIVO 〕━━━╯`

  await conn.sendButton(
    m.chat,
    str,
    wm,
    media,
    [
      ['👑 Creadores 💗', '#owner'],
      ['☘️ Volver al Menú', '/menu']
    ],
    null,
    [[bot, 'https://github.com/yosue891/SHADOW-BOT-MD.git']],
    fkontak
  )
}

handler.command = ['cuentasoficiales']
handler.exp = 35
export default handler