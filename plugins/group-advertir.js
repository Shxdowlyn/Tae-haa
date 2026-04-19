import axios from 'axios';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text, command, usedPrefix }) => {
  const emoji = '⚠️';
  const maxWarn = 3;

  // Obtener candidato a advertir
  let who;
  if (m.isGroup) {
    const mentions = m.mentionedJid || [];
    if (mentions.length > 0) {
      who = mentions[0];
    } else if (m.quoted && m.quoted.sender) {
      who = m.quoted.sender;
    } else {
      return conn.reply(m.chat, `${emoji} Etiqueta o responde a alguien para advertir.`, m);
    }
  } else {
    who = m.chat;
  }

  const botJid = conn.user.jid;
  if (who === botJid) return conn.reply(m.chat, `${emoji} No puedo advertirme a mí mismo, sombras.`, m);
  if (who === m.sender) return conn.reply(m.chat, `${emoji} No puedes advertirte a ti mismo.`, m);

  try {
    const owners = (global.owner || []).map(v => Array.isArray(v) ? v[0] : v).filter(Boolean);
    const whoNumber = String(who).split('@')[0];
    if (owners.includes(whoNumber)) {
      return conn.reply(m.chat, `🌌❄️ No se puede advertir a un propietario del Shadow-BOT-MD.`, m);
    }
  } catch {}

  // Verificación de registro
  const isRegistered = global.db.data.users[who]?.registered;
  if (!isRegistered) {
    const img = 'https://files.catbox.moe/88n20k.jpg';
    const res = await axios.get(img, { responseType: 'arraybuffer' });
    const imgBuffer = Buffer.from(res.data);

    const orderMessage = {
      orderId: 'REGISTRO-' + Date.now(),
      thumbnail: imgBuffer,
      itemCount: 1,
      status: 1,
      surface: 1,
      message:
        `🕸️ *ACCESO DENEGADO POR LAS SOMBRAS*\n\n` +
        `Hola @${String(who).split('@')[0]}, para usar este comando debes estar registrado.\n\n` +
        `🔐 Usa *${usedPrefix}reg shadow.18* para unirte al Reino.`,
      orderTitle: 'Registro Denegado - Shadow Garden',
      token: null,
      sellerJid: null,
      totalAmount1000: '0',
      totalCurrencyCode: 'GTQ',
      contextInfo: {
        externalAdReply: {
          title: 'Shadow Bot uwu',
          body: '',
          thumbnailUrl: img,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    };

    const msg = generateWAMessageFromContent(m.chat, { orderMessage }, { quoted: m });
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    return;
  }

  // Motivo limpio
  const dReason = 'Sin motivo';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d{5,}[^\s]*/g, '').trim();

  global.db.data.users[who] = global.db.data.users[who] || {};
  const user = global.db.data.users[who];
  user.warn = user.warn || 0;
  user.warn += 1;

  // Reacción sombría
  await conn.sendMessage(m.chat, { react: { text: '🌑', key: m.key } });

  // Imagen y mensaje tipo catálogo de advertencia
  const img = 'https://files.catbox.moe/88n20k.jpg';
  const res = await axios.get(img, { responseType: 'arraybuffer' });
  const imgBuffer = Buffer.from(res.data);

  const orderMessage = {
    orderId: 'WARN-' + Date.now(),
    thumbnail: imgBuffer,
    itemCount: 1,
    status: 1,
    surface: 1,
    message:
      `🌌 *Advertencia invocada por el Shadow Garden*\n` +
      `🕯️ *Usuario:* @${String(who).split('@')[0]}\n` +
      `🕯️ *Motivo:* ${sdms}\n` +
      `🕯️ *Advertencias:* ${user.warn}/${maxWarn}`,
    orderTitle: '🌑 Ritual de Advertencia',
    token: null,
    sellerJid: null,
    totalAmount1000: '0',
    totalCurrencyCode: 'GTQ',
    contextInfo: {
      externalAdReply: {
        title: 'Shadow Bot uwu',
        body: '',
        thumbnailUrl: img,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  };

  const msg = generateWAMessageFromContent(m.chat, { orderMessage }, { quoted: m });
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  // Expulsión si supera el límite
  if (user.warn >= maxWarn) {
    user.warn = 0;
    await conn.reply(
      m.chat,
      `${emoji} @${String(who).split('@')[0]} ha sido sellado fuera del grupo por las sombras.\n🌑 Advertencias superadas: ${maxWarn}`,
      m,
      { mentions: [who] }
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }

  return true;
};

handler.command = ['advertir', 'advertencia', 'warn', 'warning'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;