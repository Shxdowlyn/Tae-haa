export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};

  const palabrasClave = ['PIEDRA', 'PAPEL', 'TIJERA', 'serbot', 'jadibot'];

  if (palabrasClave.some((palabra) => m.text.includes(palabra))) return true;
  if (m.chat === '120363406529946290@newsletter') return true;

  const creador = '+543863447787';
  if (m.sender.includes(creador.replace('+', ''))) return true;

  if (bot.antiPrivate && !isOwner && !isROwner) {
    const prefixRegex = /^[!/#$.]/; 
    if (prefixRegex.test(m.text)) {
      const grupoURL = 'https://chat.whatsapp.com/ETHW7aP7kOICrR2RBrfE6N'; 
      const nombreUsuario = await conn.getName(m.sender);
      const mensajeBloqueo = `Hola ${nombreUsuario}.

Este lugar no es para eso.

Los comandos están deshabilitados en privado,
y forzar su uso solo termina en un bloqueo automático.

Si sabes cómo funcionan las cosas,
entonces ya sabes dónde ir:

${grupoURL}

No insistas.`;
      const imagenURL = 'https://files.catbox.moe/y6hfiv.jpg';

      await conn.sendFile(m.chat, imagenURL, 'antiprivado.jpg', mensajeBloqueo, m, false, { mentions: [m.sender]});
      await conn.updateBlockStatus(m.chat, 'block');
    }
  }

  return false;
}