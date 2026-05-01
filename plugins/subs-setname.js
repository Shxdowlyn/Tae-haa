import fs from 'fs'
import path from 'path'

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`╭━━━〔 ⚠︎ USO CORRECTO 〕━━━╮
┃
┃ ✦ Usa el comando así:
┃   ${usedPrefix + command} nombre
┃
╰━━━〔 Requisito necesario 〕━━━╯`)

  const senderNumber = m.sender.replace(/[^0-9]/g, '')
  const botPath = path.join('./Sessions/SubBot', senderNumber)
  const configPath = path.join(botPath, 'config.json')

  if (!fs.existsSync(botPath)) {
    return m.reply(`╭━━━〔 ⚠︎ ACCESO RESTRINGIDO 〕━━━╮
┃
┃ ✦ Este comando es solo para sockets
┃
╰━━━〔 Permiso denegado 〕━━━╯`)
  }

  let config = {}


  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath))
    } catch (e) {
      return m.reply(`╭━━━〔 ❌ ERROR CONFIG 〕━━━╮
┃
┃ ✦ No se pudo leer el config
┃
╰━━━〔 Fallo de sistema 〕━━━╯`)
    }
  }


  config.name = text.trim()

  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    m.reply(`╭━━━〔 ⚙︎ CONFIGURACIÓN 〕━━━╮
┃
┃ ✦ Nombre del socket cambiado
┃
┃ ✦ Nuevo nombre:
┃   ${text.trim()}
┃
╰━━━〔 Actualizado 〕━━━╯`)
  } catch (err) {
    console.error(err)
    m.reply(`╭━━━〔 ❌ ERROR 〕━━━╮
┃
┃ ✦ Ocurrió un error
┃   al guardar el nombre
┃
╰━━━〔 Sin cambios 〕━━━╯`)
  }
}

handler.help = ['setname']
handler.tags= ['serbot']
handler.command = ['setname']

export default handler