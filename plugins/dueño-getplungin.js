import fs from 'fs/promises'; 
import path from 'path'; 

const handler = async (m, {conn, isROwner, usedPrefix, command, text}) => {
  const ar = Object.keys(plugins);
  const ar1 = ar.map((v) => v.replace('.js', ''));

  if (!text) {
    const pluginsList = ar1.map((v) => `*◉* ${v}`).join('\n');
    return m.reply(
`╭━━━〔 TAE-HAA // PLUGINS 〕━━━╮
┃
┃ Entrada requerida.
┃ No se detectó un archivo válido.
┃
┣━━━〔 USO 〕━━━┫
┃ ✦ ${usedPrefix + command} <nombre del plugin>
┃
┣━━━〔 EJEMPLO 〕━━━┫
┃ ${usedPrefix + command} info-infobot
┃
┣━━━〔 DISPONIBLES 〕━━━┫
┃ ${pluginsList}
┃
╰━━━〔 Seleccioná correctamente 〕━━━╯`);
  }

  const pluginName = text.replace(/.js$/i, '');
  const pluginFileName = `${pluginName}.js`;
  const pluginPath = path.join('./plugins', pluginFileName);

  if (!ar1.includes(pluginName)) {
    const pluginsList = ar1.map((v) => `*◉* ${v}`).join('\n');
    return m.reply(
`╭━━━〔 TAE-HAA // ERROR 〕━━━╮
┃
┃ El archivo no existe.
┃ No se encontró ningún plugin con el nombre:
┃ "${text}"
┃
┣━━━〔 DISPONIBLES 〕━━━┫
┃ ${pluginsList}
┃
╰━━━〔 Verificá antes de intentar 〕━━━╯`);
  }

  let fileContent;

  try {
    fileContent = await fs.readFile(pluginPath, 'utf8');

    const messageResult = await conn.sendMessage(m.chat, {text: fileContent}, {quoted: m});

    await conn.sendMessage(
      m.chat, 
      {
        document: Buffer.from(fileContent, 'utf8'),
        mimetype: 'application/javascript', 
        fileName: pluginFileName
      }, 
      {quoted: messageResult}
    );

  } catch (error) {
    console.error('Error al leer el plugin:', error);
    m.reply(`*❌ 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙻𝙴𝙴𝚁 𝙴𝙻 𝙰𝚁𝙲𝙷𝙸𝚅𝙾*\n\n*Detalles del error (consola):*\n${error.message}`);
  }
};

handler.help = ['getplugin'].map((v) => v + ' *<nombre>*');
handler.tags = ['owner'];
handler.command = ['getplugin', 'gp'];
handler.rowner = true;

export default handler;