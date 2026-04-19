import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  const bannerUrl = 'https://files.catbox.moe/xytfun.jpg' // imagen grande arriba
  const miniaturaUrl = 'https://files.catbox.moe/your_red_icon.jpg' // ícono rojo pequeño
  const documentoUrl = 'https://files.catbox.moe/xytfun.jpg' // 👈 pacto shadow intacto actualizado

  const media = await prepareWAMessageMedia({ image: { url: bannerUrl } }, { upload: conn.waUploadToServer })
  const thumb = (await conn.getFile(miniaturaUrl)).data

  const cargaTexto = "i ᡃ⃝ᡃ⃝ᡃ⃝...".repeat(5000)

  // 1) Panel interactivo con frases shadow
  const content = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: { hasMediaAttachment: true, imageMessage: media.imageMessage },
          body: { text: cargaTexto },
          footer: { text: "⚔️ Shadow-BOT-MD • Panel navideño 🎄" },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "Canal Oficial 💚",
                  url: "https://www.whatsapp.com/android",
                }),
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "📋 Copiar carga interactiva",
                  id: "shadow-copy",
                  copy_code: cargaTexto
                }),
              },
              {
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                  title: "📜 Frases Shadow",
                  sections: [{
                    title: "Frases disponibles",
                    rows: [
                      { title: "🎄 La sombra observa en silencio", description: "Frase misteriosa", id: "frase1" },
                      { title: "✨ Entre luces festivas, la sombra sonríe", description: "Frase navideña", id: "frase2" },
                      { title: "⚔️ La eminencia dicta el destino", description: "Frase épica", id: "frase3" },
                      { title: "❄️ El frío guarda secretos ocultos", description: "Frase invernal", id: "frase4" }
                    ]
                  }]
                })
              }
            ],
          },
        },
      },
    },
  }

  const msg = generateWAMessageFromContent(m.chat, content, { userJid: m.sender })
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  // 2) Documento visual del pacto Shadow intacto
  await conn.sendMessage(m.chat, {
    document: { url: documentoUrl }, // 👈 nueva URL
    fileName: '☽ Shadow ☽',
    mimetype: 'application/pdf',
    caption: "『📜』 SHADOW-BOT-MD...\nPOWERED BY SHADOWBUG",
    jpegThumbnail: thumb
  }, { quoted: m })
}

handler.help = ['shadowbug']
handler.tags = ['fun']
handler.command = ['shadowbug'] // 👈 comando shadowbug
handler.register = true

export default handler