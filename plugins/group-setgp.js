import { makeWASocket } from '@whiskeysockets/baileys'

const handler = async (m, { conn, args, text, command, usedPrefix }) => {
  try {
    switch (command) {
      case 'gpbanner': case 'groupimg': {
        const q = m.quoted || m
        const mime = (q.msg || q).mimetype || ''
        if (!/image\/(png|jpe?g)/.test(mime)) 
          return m.reply(`╭━━━〔 TAE-HAA // ESTANDARTE 〕━━━╮
┃
┃ Invocación incompleta.
┃ Falta el elemento requerido.
┃
┣━━━〔 REQUISITO 〕━━━┫
┃ ✦ Tipo :: Imagen
┃ ✦ Estado :: No detectada
┃
┣━━━〔 NOTA 〕━━━┫
┃ ✦ Adjunta una imagen para continuar.
┃
╰━━━〔 Tae-Haa no procede sin pruebas 〕━━━╯`)

        const img = await q.download()
        if (!img) 
          return m.reply(`╭━━━〔 TAE-HAA // ESTANDARTE 〕━━━╮
┃
┃ Entrada inválida.
┃ No se detectó ninguna imagen.
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Requisito :: Imagen
┃ ✦ Resultado :: Fallido
┃
┣━━━〔 NOTA 〕━━━┫
┃ ✦ Envía una imagen para establecer el estandarte.
┃
╰━━━〔 Tae-Haa no repite instrucciones 〕━━━╯`)

        await m.react('🎭')
        await conn.updateProfilePicture(m.chat, img)
        await m.react('✔️')
        m.reply(`╭━━━〔 TAE-HAA // ESTANDARTE 〕━━━╮
┃
┃ Proceso completado.
┃ Estandarte actualizado correctamente.
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Acción :: Renovación
┃ ✦ Resultado :: Éxito
┃
┣━━━〔 SISTEMA 〕━━━┫
┃ ✦ Registro :: Guardado
┃ ✦ Control  :: Estable
┃
╰━━━〔 Tae-Haa aprueba el cambio 〕━━━╯`)
        break
      }

      case 'gpdesc': case 'groupdesc': {
        if (!args.length) 
          return m.reply(`╭━━━〔 TAE-HAA // DESCRIPCIÓN 〕━━━╮
┃
┃ Orden incompleta.
┃ No se ha proporcionado contenido.
┃
┣━━━〔 REQUISITO 〕━━━┫
┃ ✦ Tipo :: Descripción
┃ ✦ Estado :: Vacío
┃
┣━━━〔 NOTA 〕━━━┫
┃ ✦ Escribe la nueva descripción del grupo.
┃
╰━━━〔 Tae-Haa exige precisión 〕━━━╯`)

        await m.react('🎭')
        await conn.groupUpdateDescription(m.chat, args.join(' '))
        await m.react('✔️')
        m.reply(`╭━━━〔 TAE-HAA // DESCRIPCIÓN 〕━━━╮
┃
┃ Proceso completado.
┃ Descripción actualizada correctamente.
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Acción :: Renovación
┃ ✦ Resultado :: Éxito
┃
┣━━━〔 SISTEMA 〕━━━┫
┃ ✦ Registro :: Guardado
┃ ✦ Control  :: Estable
┃
╰━━━〔 Tae-Haa aprueba el cambio 〕━━━╯`)
        break
      }

      case 'gpname': case 'groupname': {
        if (!text) 
          return m.reply('🌌 *Discípulo de las Sombras* 🎄\nDebes entregar el nuevo nombre para el grupo.')

        await m.react('🎭')
        await conn.groupUpdateSubject(m.chat, text)
        await m.react('✔️')
        m.reply('🌌 *Invocación completada* 🎅\nEl nombre del grupo ha sido renovado en las Sombras.')
        break
      }
    }
  } catch (e) {
    await m.react('✖️')
    m.reply(`⚠️ El ritual falló...\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`)
  }
}

handler.help = ['gpbanner', 'groupimg', 'gpdesc', 'groupdesc', 'gpname', 'groupname']
handler.tags = ['grupo']
handler.command = ['gpbanner', 'groupimg', 'gpdesc', 'groupdesc', 'gpname', 'groupname']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler