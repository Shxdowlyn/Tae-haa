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
          return m.reply(`╭━━━〔 TAE-HAA // NOMBRE 〕━━━╮
┃
┃ Orden incompleta.
┃ No se ha definido el nuevo nombre.
┃
┣━━━〔 REQUISITO 〕━━━┫
┃ ✦ Tipo :: Nombre del grupo
┃ ✦ Estado :: Vacío
┃
┣━━━〔 NOTA 〕━━━┫
┃ ✦ Proporciona el nombre que deseas asignar.
┃
╰━━━〔 Tae-Haa exige precisión 〕━━━╯`)

        await m.react('🎭')
        await conn.groupUpdateSubject(m.chat, text)
        await m.react('✔️')
        m.reply(`╭━━━〔 TAE-HAA // NOMBRE 〕━━━╮
┃
┃ Proceso completado.
┃ Nombre actualizado correctamente.
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
    }
  } catch (e) {
    await m.react('✖️')
    m.reply(`╭━━━〔 TAE-HAA // ERROR 〕━━━╮
┃
┃ Fallo detectado.
┃ El proceso no se completó.
┃
┣━━━〔 ACCIÓN 〕━━━┫
┃ ✦ Reporta :: ${usedPrefix}report
┃ ✦ Detalle :: ${e.message}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Registro :: Guardado
┃ ✦ Revisión :: Pendiente
┃
╰━━━〔 Tae-Haa no tolera errores 〕━━━╯`)
  }
}

handler.help = ['gpbanner', 'groupimg', 'gpdesc', 'groupdesc', 'gpname', 'groupname']
handler.tags = ['grupo']
handler.command = ['gpbanner', 'groupimg', 'gpdesc', 'groupdesc', 'gpname', 'groupname']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler