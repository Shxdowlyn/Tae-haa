let handler = async (m, { conn, isAdmin, isOwner }) => {
  // Solo en grupos
  if (!m.isGroup) return m.reply('⚠️ Este comando solo funciona en grupos.')

  // Solo creadores del bot
  if (!isOwner) return m.reply('🚫 Este comando es exclusivo para los creadores del bot.')

  // Si ya es admin
  if (isAdmin) return m.reply('✅ Ya eres admin del grupo.')

  // Promover al remitente
  await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')

  // Confirmación al usuario
  await m.reply('🛡️ Has sido promovido a admin por el bot.')
}

// Lista de comandos válidos
handler.command = ['admin', 'atad', 'autoadmin']

// Solo el owner puede usarlo
handler.owner = true

// El bot debe ser admin en el grupo
handler.botAdmin = true

export default handler