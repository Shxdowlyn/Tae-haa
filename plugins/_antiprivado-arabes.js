const codigosArabes = ['+212', '+971', '+20', '+966', '+964', '+963', '+973', '+968', '+974'];
const regexArabe = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
const regexComando = /^[\/!#.]/;

global.advertenciasArabes = global.advertenciasArabes || {};

export async function before(m, { conn, isOwner, isROwner}) {
  try {
    if (
      m.isBaileys ||
      m.isGroup ||
!m.message ||
!m.sender ||
      typeof m.text!== 'string' ||
      isOwner ||
      isROwner
) return false;

    const numero = m.sender;
    const texto = m.text;
    const numeroLimpio = numero.replace(/[^0-9]/g, '');

    const esArabe = regexArabe.test(texto) || codigosArabes.some(pref => numeroLimpio.startsWith(pref.replace('+', '')));
    const esComando = regexComando.test(texto);

    if (esArabe &&!esComando) {
      global.advertenciasArabes[numero] = (global.advertenciasArabes[numero] || 0) + 1;
      const advertencias = global.advertenciasArabes[numero];

      if (advertencias>= 2) {
        await m.reply(`
╭━━━〔   𝗧𝗔𝗘-𝗛𝗔𝗔 𝗣𝗥𝗢𝗧𝗢𝗖𝗢𝗟𝗢  〕━━━⬣
┃  
┃  🧪 *PROCEDIMIENTO: BLOQUEO FINAL*
┃  ─────────────────────
┃  🔍 Unidad: Beom Protocol v3.0
┃  📛 Objetivo: ${numero}
┃  📄 Infracción: Comunicación no autorizada (2/2)
┃  
┃  🚫 Acceso: DENEGADO
┃  
╰━━━〔  𝐒𝐘𝐒𝐓𝐄𝐌 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐋𝐄𝐃 〕━━━⬣
`);
        await conn.updateBlockStatus(m.chat, 'block');
        console.log(`[☠️ BLOQUEADX ] ${numero}`);
        delete global.advertenciasArabes[numero];
} else {
        await m.reply(`
⚠️ *[PRIMERA ALERTA DE SOMBRA ${advertencias}/2]* ⚠️
══════════════════════
🕸️ Sistema de defensa activado.
📄 Comunicación sospechosa interceptada.

📌 Solo comandos autorizados permitidos:
Ej: */menu*, */help*, */code*,!info

🧬 Próxima infracción ejecutará *protocolo de eliminación*.
══════════════════════`);
        console.log(`[⚠️ ALERTA SOMBRA ${advertencias}/2] ${numero}`);
}

      return false;
}

    return true;

} catch (e) {
    console.error('[💀 ERROR EN EL NÚCLEO DE SOMBRA]', e);
    return true;
}
}