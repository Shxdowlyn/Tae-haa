let handler = async (m, { args, usedPrefix, command }) => {
    const chat = global.db.data.chats[m.chat]
    if (!chat.economy && m.isGroup) {
        return m.reply(
            `《✦》Los comandos de *Economía* están desactivados en este grupo.\n\n` +
            `Un administrador puede activarlos con:\n` +
            `» *${usedPrefix}economy on*`
        )
    }

    let user = global.db.data.users[m.sender]
    const currency = global.currency || "¥"

    if (!args[0]) {
        return m.reply(
`╭━━━〔 TAE-HAA // RETIRO 〕━━━╮
┃
┃ Orden incompleta.
┃ Indica cuánto deseas retirar.
┃
┣━━━〔 FORMATO 〕━━━┫
┃ ✦ Cantidad :: ${currency} número
┃ ✦ Total    :: all
┃
┣━━━〔 EJEMPLOS 〕━━━┫
┃ ✦ ${usedPrefix + command} 25000
┃ ✦ ${usedPrefix + command} all
┃
╰━━━〔 Tae-Haa espera tu decisión 〕━━━╯`
)
    }

    if (args[0].toLowerCase() === 'all') {
        let count = user.bank
        if (count <= 0) return m.reply(`ꕥ No tienes ${currency} en el banco.`)

        user.bank -= count
        user.coin += count

        return m.reply(
            `╭━━━〔 TAE-HAA // RETIRO 〕━━━╮
┃
┃ Movimiento aprobado.
┃ Fondos retirados del banco.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Retiro  :: ${currency}${count.toLocaleString()}
┃ ✦ Estado  :: Disponible ahora
┃
┣━━━〔 AVISO 〕━━━┫
┃ ✦ Ahora puedes usarlo…
┃ ✦ Pero también pueden robártelo.
┃
╰━━━〔 Tae-Haa no repite advertencias 〕━━━╯`
        )
    }

    if (isNaN(args[0])) {
        return m.reply(
            `ꕥ Debes retirar una cantidad válida.\n\n` +
            `Ejemplo:\n` +
            `» ${usedPrefix + command} 25000\n` +
            `» ${usedPrefix + command} all`
        )
    }

    let count = parseInt(args[0])

    if (user.bank <= 0) return m.reply(`ꕥ No tienes suficientes ${currency} en el banco.`)
    if (user.bank < count) {
        return m.reply(
            `ꕥ Solo tienes *${currency}${user.bank.toLocaleString()}* en el banco.`
        )
    }

    user.bank -= count
    user.coin += count

    return m.reply(
`╭━━━〔 TAE-HAA // RETIRO 〕━━━╮
┃
┃ Movimiento aprobado.
┃ Fondos extraídos del banco.
┃
┣━━━〔 DETALLE 〕━━━┫
┃ ✦ Retiro  :: ${currency}${count.toLocaleString()}
┃ ✦ Estado  :: Disponible en cartera
┃
┣━━━〔 AVISO 〕━━━┫
┃ ✦ Ahora podrás usarlo…
┃ ✦ Pero también podrán robártelo.
┃
╰━━━〔 Tae-Haa observa en silencio 〕━━━╯`
)
}

handler.help = ['retirar']
handler.tags = ['economia']
handler.command = ['withdraw', 'retirar', 'with']
handler.group = true

export default handler