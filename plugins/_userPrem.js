const handler = (m) => m
export async function all(m) {
for (const user of Object.values(global.db.data.users)) {
if (user.premiumTime != 0 && user.premium) {
if (new Date() * 1 >= user.premiumTime) {
user.premiumTime = 0
user.premium = false
const JID = Object.keys(global.db.data.users).find((key) => global.db.data.users[key] === user)
const usuarioJid = JID.split`@`[0]
const textoo = `╭━━━〔 TAE-HAA // PREMIUM 〕━━━╮
┃
┃ Estado actualizado.
┃ El acceso premium ha expirado.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Usuario :: @${usuarioJid}
┃ ✦ Acción  :: Expiración
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Resultado :: Finalizado
┃ ✦ Acceso    :: Revocado
┃
╰━━━〔 Tae-Haa no extiende privilegios 〕━━━╯`
await this.sendMessage(JID, {text: textoo, mentions: [JID]}, {quoted: m })
}}}}