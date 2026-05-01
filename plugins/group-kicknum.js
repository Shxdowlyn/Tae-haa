const handler = async (m, { conn, args, participants, command }) => {
  const prefix = args[0]
  if (!prefix || !prefix.startsWith('+')) {
    return m.reply(`╭━━━〔 TAE-HAA // PREFIJO 〕━━━╮
┃
┃ Formato inválido.
┃ La invocación fue incompleta.
┃
┣━━━〔 REQUISITO 〕━━━┫
┃ Ingresá un prefijo válido.
┃
┣━━━〔 EJEMPLO 〕━━━┫
┃ ✦ .${command} +54
┃
╰━━━〔 Sin código no hay búsqueda 〕━━━╯`)
  }

  const botNumber = conn.user.id.split(':')[0]

  const groupMetadata = await conn.groupMetadata(m.chat)
  const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id)

  const matching = participants.filter(p => 
    p.id.startsWith(prefix.replace('+', '')) &&
    p.id !== botNumber &&
    !admins.includes(p.id)
  )

  if (command === 'listnum' || command === 'listanum') {
    if (matching.length === 0) return m.reply(`👻🌌 Las sombras no encontraron almas con el prefijo ${prefix}...`)

    const lista = matching.map((p, i) => `${i + 1}. wa.me/${p.id.split('@')[0]}`).join('\n')
    return m.reply(`╭━━━〔 TAE-HAA // ESCANEO 〕━━━╮
┃
┃ Búsqueda completada.
┃ Prefijo detectado :: ${prefix}
┃
┣━━━〔 RESULTADOS 〕━━━┫
┃ Usuarios vinculados:
${lista}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ Registro finalizado.
┃ Las sombras ya observaron.
┃
╰━━━〔 Vigilancia activa 〕━━━╯`)
  }

  if (command === 'kicknum') {
    if (matching.length === 0) return m.reply(`👻🌌 Ningún espíritu con el prefijo ${prefix} fue hallado para ser expulsado.`)

    for (let p of matching) {
      await conn.groupParticipantsUpdate(m.chat, [p.id], 'remove').catch(_ => null)
    }
    return m.reply(`╭━━━〔 TAE-HAA // PURGA 〕━━━╮
┃
┃ Operación completada.
┃ Prefijo objetivo :: ${prefix}
┃
┣━━━〔 RESULTADO 〕━━━┫
┃ Almas removidas :: ${matching.length}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ Disciplina restaurada.
┃ El dominio permanece en orden.
┃
╰━━━〔 Silencio impuesto 〕━━━╯`)
  }
}

handler.command = ['kicknum', 'listnum', 'listanum']
handler.group = true
handler.botAdmin = true // Tú puedes quitar esta línea si no quieres validación att:shadow uwu

export default handler