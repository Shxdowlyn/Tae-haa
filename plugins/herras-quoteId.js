import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, args, command }) => {
  let text;
  if (args.length >= 1) {
    text = args.join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    throw `╭━━━〔 ⚠︎ AVISO 〕━━━╮
┃
┃ ✦ Debes ingresar una frase
┃   o responder un mensaje
┃
┣━━━〔 EJEMPLO 〕━━━┫
┃ ${usedPrefix + command} El arte es la expresión más pura del pensamiento.
┃
╰━━━〔 Requisito necesario 〕━━━╯`
  }

  const quote = await createQuote(m.name, text);

  await conn.sendFile(
    m.chat,
    quote,
    '',
    `╭━━━〔 ✦ CITA GENERADA 〕━━━╮
┃
┃ ┌─ INFORMACIÓN
┃ │
┃ │ ✐ Autor
┃ │   ${m.name}
┃ │
┃ │ ⴵ Estilo
┃ │   Quozio aleatorio
┃ │
┃ │ 🜸 Fuente
┃ │   quozio.com
┃ │
┃ └─────────────────────
┃
╰━━━〔 ✦ Proceso finalizado 〕━━━╯`,
    m,
    { ...rcanal }
  );
};

handler.tags = ["herramientas"];
handler.command = handler.help = ["quozio"];
export default handler;

// api
async function createQuote(author, message) {
  const host = "https://quozio.com/";
  let path = "api/v1/quotes";

  const body = JSON.stringify({
    author: author,
    quote: message,
  });

  const quote = await fetch(host + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
  }).then(res => res.json());

  const quoteId = quote["quoteId"];

  path = "api/v1/templates";
  const templates = await fetch(host + path)
    .then(res => res.json())
    .then(val => val["data"]);

  const index = Math.floor(Math.random() * templates.length);
  const templateId = templates[index]["templateId"];

  path = `api/v1/quotes/${quoteId}/imageUrls?templateId=${templateId}`;
  const imageUrl = await fetch(host + path)
    .then(res => res.json())
    .then(val => val["medium"]);

  return imageUrl;
}