import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

global.botNumber = "" 

global.owner = [
// ZONA DE GUAPOS
["543863402551", "Adara </>", true],
["543863447787", "Jade", true],
]

global.mods = []
global.suittag = ["543863447787"] 
global.prems = []


global.libreria = "Baileys Multi Device"
global.vs = "^1.3.2"
global.nameqr = "Tae-haaBot"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.MichiJadibts = true

global.botname = "Tae-haa BOT"
global.textbot = "Tae-haa BOT, Adara"
global.dev = "Tae-haa BOT"
global.author = "*Tae-haa* © mᥲძᥱ ᥕі𝗍һ Adara"
global.etiqueta = "© Tae-haa | 𝟤𝟢𝟤6"
global.currency = "¢ Pesos"
global.michipg = "https://files.catbox.moe/h8lydl.jpg"
global.icono = "https://files.catbox.moe/exo9ty.jpg"
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')


global.group = "https://chat.whatsapp.com/D80dadzwRq4LQqFGUntZfK?mode=ems_copy_t"
global.community = "https://chat.whatsapp.com/KCIXMcV2YO9ElYbbmbAeo1"
global.channel = "https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O"
global.github = "https://github.com"
global.gmail = "minexdt@gmail.com"
global.ch = {
ch1: "120363293893278236@newsletter"
}


global.APIs = {
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null },
adonix: { url: "https://api-adonix.ultraplus.click", key: null }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'settings.js'"))
import(`${file}?update=${Date.now()}`)
})