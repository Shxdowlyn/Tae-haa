const handler = async (m, {conn, isOwner}) => {
  const chats = Object.entries(global.db.data.chats).filter((chat) => chat[1].isBanned);
  const users = Object.entries(global.db.data.users).filter((user) => user[1].banned);

  const caption = `
╭━━━〔 TAE-HAA // CONTROL 〕━━━╮
┃
┃ Lista de bloqueos activa.
┃ Sin excepciones.
┃
┣━━━〔 USUARIOS 〕━━━┫
┃ Total :: ${users.length}
${users ? users.map(([jid], i) => `┃ ├ ${isOwner ? '@' + jid.split`@`[0] : jid}`).join('\n') : '┃ ├ —'}
┃
┣━━━〔 DOMINIOS 〕━━━┫
┃ Total :: ${chats.length}
${chats ? chats.map(([jid], i) => `┃ ├ ${isOwner ? '@' + jid.split`@`[0] : jid}`).join('\n') : '┃ ├ —'}
┃
╰━━━〔 Sin intervención externa 〕━━━╯
`.trim();

  m.reply(caption, null, {mentions: conn.parseMention(caption)});
};

handler.command = ['banlist', 'listban']
handler.rowner = true;
export default handler;