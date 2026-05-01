let handler = async (m, { conn }) => {
  try {
    let userName = m.pushName || 'Sin nombre';
    m.reply(`╭━━━〔 INFO USUARIO 〕━━━╮
┃
┃ ✦ Nombre
┃   ${userName}
┃
╰━━━〔 Fin de datos 〕━━━╯`);
  } catch (e) {
    m.reply(`╭━━━〔 ❌ ERROR 〕━━━╮
┃
┃ ✦ Ocurrió un problema
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ${e.message}
┃
╰━━━〔 Fin del error 〕━━━╯`);
  }
};

handler.help = ['nombre'];
handler.tags = ['tools'];
handler.command = /^(nombre)$/i;

export default handler;