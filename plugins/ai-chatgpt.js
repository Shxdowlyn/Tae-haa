import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {

    if (!text) {
        let helpMsg =
        `╭━━━〔 TAE-HAA // INPUT 〕━━━╮
┃
┃ Orden incompleta.
┃ No se ha recibido una consulta.
┃
┣━━━〔 USO 〕━━━┫
┃ ✦ Comando :: ${command}
┃ ✦ Acción  :: Escribe tu solicitud
┃
┣━━━〔 EJEMPLOS 〕━━━┫
┃ ✦ ${usedPrefix + command} Dame un plan para aprender inglés en 1 mes
┃ ✦ ${usedPrefix + command} Escríbeme un código para una página web simple
┃ ✦ ${usedPrefix + command} Cuéntame un chiste
┃
╰━━━〔 Tae-Haa espera tu orden 〕━━━╯`

        return conn.sendMessage(m.chat, { text: helpMsg }, { quoted: m })
    }

    try {
        await conn.sendPresenceUpdate('composing', m.chat)

        try {
            await conn.sendMessage(m.chat, { react: { text: '🧠', key: m.key } })
        } catch (e) {}

        let username = m.pushName || "amigo"
        let systemPrompt = `
        Eres Tae Haa.

No eres un asistente común. Respondes con claridad, precisión y sin rodeos.

El usuario se llama: ${username}.

Hablas en español. Tu tono es tranquilo, directo y medido.
No exageras amabilidad ni usas expresiones innecesarias.

Respondes solo lo necesario, pero con criterio.
        `.trim()

        let apiUrl = `https://text.pollinations.ai/${encodeURIComponent(text)}?model=openai&system=${encodeURIComponent(systemPrompt)}`
        let req = await fetch(apiUrl)
        let response = await req.text()

        if (!response) throw new Error('No se pudo obtener respuesta del servidor.')

        const fkontak = {
            key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'ChatGPT' },
            message: {
                locationMessage: {
                    name: 'ChatGPT • Premiun 👑',
                    jpegThumbnail: await (await fetch('https://files.catbox.moe/s2ajod.jpg')).buffer(),
                    vcard:
                        'BEGIN:VCARD\n' +
                        'VERSION:3.0\n' +
                        'N:;ChatGPT;;;\n' +
                        'FN:ChatGPT\n' +
                        'ORG:OpenAI\n' +
                        'TITLE:Asistente IA\n' +
                        'item1.TEL;waid=00000000000:+0 000 000 0000\n' +
                        'item1.X-ABLabel:IA\n' +
                        'X-WA-BIZ-DESCRIPTION:Respuestas rápidas, claras y precisas.\n' +
                        'X-WA-BIZ-NAME:ChatGPT\n' +
                        'END:VCARD'
                }
            },
            participant: '0@s.whatsapp.net'
        }

        await conn.sendMessage(
            m.chat,
            { text: response.trim() },
            { quoted: fkontak }
        )

        try {
            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
        } catch (e) {}

    } catch (error) {
        console.error(error)

        try {
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
        } catch (e) {}

        await conn.sendMessage(m.chat, { text: `╭━━━〔 TAE-HAA // ERROR 〕━━━╮
┃
┃ Fallo de conexión.
┃ El servidor no respondió.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Estado :: Error de red
┃ ✦ Acción :: Reintentar más tarde
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Fallido
┃ ✦ Revisión  :: Pendiente
┃
╰━━━〔 Tae-Haa no tolera fallos 〕━━━╯` }, { quoted: m })
    }
}

handler.command = /^(openai|chatgpt|ia|ai|chatgpt2|ia2)$/i
handler.help = ['ai <pregunta>', 'chatgpt <pregunta>']
handler.tags = ['ai']
handler.group = true

export default handler