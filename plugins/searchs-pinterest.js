import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

async function pinterestScraper(query, limit = 10) {
  const url = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encodeURIComponent(query)}%22%2C%22scope%22%3A%22pins%22%2C%22rs%22%3A%22typed%22%7D%2C%22context%22%3A%7B%7D%7D`;

  const headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
    'referer': 'https://id.pinterest.com/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    'x-app-version': 'c056fb7',
    'x-pinterest-appstate': 'active',
    'x-pinterest-pws-handler': 'www/index.js',
    'x-pinterest-source-url': '/',
    'x-requested-with': 'XMLHttpRequest'
  };

  try {
    const res = await axios.get(url, { headers });
    if (!res.data?.resource_response?.data?.results) return [];
    return res.data.resource_response.data.results
      .map(item => {
        if (!item.images) return null;
        return {
          title: item.grid_title || item.title || 'Sin título',
          image_large_url: item.images.orig?.url || null
        };
      })
      .filter(Boolean)
      .slice(0, limit);
  } catch (err) {
    console.error('Error en pinterestScraper:', err);
    return [];
  }
}

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `╭━━━〔 ⚠︎ PINTEREST 〕━━━╮
┃
┃ ✦ Escribe lo que deseas buscar
┃   en Pinterest
┃
╰━━━〔 Requisito necesario 〕━━━╯`, m);
  }

  let query = text + " hd";
  await m.react("🗡️");
  conn.reply(m.chat, `╭━━━〔 PROCESANDO 〕━━━╮
┃
┃ ✦ Buscando imágenes
┃   en Pinterest
┃
┃ ✦ Estado: en progreso
┃
╰━━━〔 Espere un momento 〕━━━╯`);

  try {
    const results = await pinterestScraper(query, 10);
    if (!results.length) {
      return conn.reply(m.chat, `╭━━━〔 SIN RESULTADOS 〕━━━╮
┃
┃ ✦ No se encontraron coincidencias
┃   para: ${text}
┃
╰━━━〔 Intenta otra búsqueda 〕━━━╯`, m);
    }

    let cards = [];
    let counter = 1;

    for (let item of results) {
      const { imageMessage } = await generateWAMessageContent({ image: { url: item.image_large_url } }, { upload: conn.waUploadToServer });
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: `╭━━━〔 IMAGEN GENERADA 〕━━━╮
┃
┃ ✦ Resultado #${counter++}
┃   imagen procesada
┃
╰━━━〔 Listo 〕━━━╯` }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: `╭━━━〔 RESULTADO 〕━━━╮
┃
┃ ✦ Se encontró un resultado
┃   disponible
┃
╰━━━〔 Listo 〕━━━╯` }),
        header: proto.Message.InteractiveMessage.Header.fromObject({ title: item.title, hasMediaAttachment: true, imageMessage }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "🔗 Portal de Pinterest",
              Url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`,
              merchant_url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`
            })
          }]
        })
      });
    }

    const messageContent = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `╭━━━〔 RESULTADOS 〕━━━╮
┃
┃ ✦ Búsqueda: ${query}
┃ ✦ Coincidencias encontradas
┃
╰━━━〔 Listo 〕━━━╯` }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: `╭━━━〔 IMÁGENES PROCESADAS 〕━━━╮
┃
┃ ✦ Proceso completado
┃   correctamente
┃
╰━━━〔 Sistema listo 〕━━━╯` }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
          })
        }
      }
    }, { quoted: m });

    await m.react("✅");
    await conn.relayMessage(m.chat, messageContent.message, { messageId: messageContent.key.id });
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `╭━━━〔 ❌ ERROR 〕━━━╮
┃
┃ ✦ El sistema falló
┃   intenta más tarde
┃
╰━━━〔 Inténtalo nuevamente 〕━━━╯`, m);
  }
};

handler.help = ["pinterest", "pin"];
handler.tags = ["buscador"];
handler.command = ["pinterest", "pin"];

export default handler;