import { performance} from 'perf_hooks';

const handler = async (m, { conn, text}) => {
  // Detectar objetivo: por mención, respuesta o texto
  let target;
  if (m.mentionedJid && m.mentionedJid.length) {
    target = m.mentionedJid[0];
} else if (m.quoted) {
    target = m.quoted.sender;
} else {
    target = text? text: m.sender;
}

  const name = await conn.getName(target);
  const number = target.replace(/\D/g, '').slice(0, 2);

  const countryMap = {
    '58': 'Venezuela 🇻🇪',
    '57': 'Colombia 🇨🇴',
    '52': 'México 🇲🇽',
    '51': 'Perú 🇵🇪',
    '54': 'Argentina 🇦🇷',
    '55': 'Brasil 🇧🇷',
    '56': 'Chile 🇨🇱',
    '1': 'Estados Unidos 🇺🇸',
    '34': 'España 🇪🇸',
    '91': 'India 🇮🇳',
    '81': 'Japón 🇯🇵',
    '49': 'Alemania 🇩🇪',
    '33': 'Francia 🇫🇷'
};

  const country = countryMap[number] || '🌍 País desconocido';

  const loading = [
    '*💻 Iniciando rastreo digital...*',
    '*📡 Escaneando redes locales...*',
    '*🔍 Analizando paquetes UDP...*',
    '*🧠 Decodificando metadatos...*',
    '*📁 Accediendo a registros ocultos...*',
    '*💣 Inyectando comandos en el núcleo...*'
  ];

  for (let line of loading) {
    await m.reply(line);
}

  const old = performance.now();
  const neww = performance.now();
  const speed = (neww - old).toFixed(2);

  const result = `╭━━━〔 TAE-HAA // SCAN 〕━━━╮
┃
┃ Objetivo localizado.
┃ Análisis completado.
┃
┣━━━〔 DATOS 〕━━━┫
┃ ✦ IP        :: 92.28.211.234
┃ ✦ Coordenadas :: 43 7462 / 12.4893
┃ ✦ ID        :: 6979191519182016
┃ ✦ IPV6      :: fe80::5dcd::ef69::fb22::d9888%12
┃ ✦ ISP       :: Ucom universal
┃ ✦ DNS       :: 8.8.8.8 / 1.1.1.8.1
┃ ✦ Gateway   :: 192.168.0.1
┃ ✦ Subnet    :: 255.255.0.255
┃ ✦ WAN       :: 100.23.10.15 (private nat)
┃
┣━━━〔 HARDWARE 〕━━━┫
┃ ✦ MAC       :: 5A:78:3E:7E:00
┃ ✦ Externa   :: 6U:77:89:ER:O4
┃ ✦ Router    :: ERICCSON
┃ ✦ Dispositivo :: WIN32-X
┃ ✦ Red       :: TPLINK COMPANY
┃
┣━━━〔 RED 〕━━━┫
┃ ✦ UPNP      :: Enabled
┃ ✦ DMZ       :: 10.112.42.15
┃ ✦ UDP       :: 8080.80
┃ ✦ TCP       :: 443
┃ ✦ Saltos    :: 64
┃ ✦ Hops      :: 192.168.0.1 → 192.168.1.1 → 100.73.43.4
┃
┣━━━〔 RUTAS 〕━━━┫
┃ ✦ host-132.12.32.167.ucom.com
┃ ✦ host-132.12.111.ucom.com
┃ ✦ 36.134.67.189 / 216.239.78.11
┃ ✦ Sof02s32inf14.1e100.net
┃
┣━━━〔 TRÁFICO 〕━━━┫
┃ ✦ HTTP :: 192.168.3.1:433 → 92.28.211.234:80
┃ ✦ HTTP :: 192.168.625 → 92.28.211.455:80
┃ ✦ HTTP :: 192.168.817 → 92.28.211.8:971
┃ ✦ UDP  :: 192.168452 → 92.28.211:7265288
┃ ✦ TCP  :: 192.168.682 → 92.28.211:62227.7
┃ ✦ TCP  :: 192.168.725 → 92.28.211:67wu2
┃ ✦ TCP  :: 192.168.629 → 92.28.211.167:8615
┃
┣━━━〔 OBJETIVO 〕━━━┫
┃ ✦ Nombre   :: ${text}
┃ ✦ Usuario  :: ${name}
┃ ✦ Región   :: ${country}
┃
┣━━━〔 ESTADO 〕━━━┫
┃ ✦ Sistema :: Comprometido
┃ ✦ Nivel   :: Control parcial
┃
╰━━━〔 Tae-Haa ya terminó 〕━━━╯

"Ya perdiste… te seguí hasta el último movimiento."`;

  await m.reply(result, null, { mentions: [target]});
};

handler.help = ['rastrear'];
handler.tags = ['fun'];
handler.command = ['rastrear'];
handler.group = true;
handler.register = true;

export default handler;