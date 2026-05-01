import fs from 'fs';

const handler = (m) => {
  return m;
};

handler.all = async function(m) {

    const chat = global.db.data.chats[m.chat];
    if (chat.isBaneed) return;

    const text = m.text.toLowerCase(); 

    const respuestas = const data = {
  bot: "Has iniciado el sistema. Usa !menu para ver opciones",
  bug: "Algo falló en el sistema 😅",
  adios: "Nos vemos 👋",
  amor: "El amor sigue creciendo ❤️",
  odio: "Respira... todo se calma",
  gato: "Los gatos observan en silencio",
  perro: "Lealtad y compañía",
  pizza: "Pizza lista 🍕",
  hamburguesa: "Hamburguesa servida 🍔",
  cafe: "Energía en una taza ☕",
  te: "Momento de calma 🍵",
  agua: "Hidratación importante 💧",
  comida: "Buen momento para comer",
  hambre: "Es hora de alimentarse",
  sueño: "Descanso recomendado",
  cansado: "Necesitas un descanso",
  dinero: "Recurso importante",
  trabajo: "Sigue adelante",
  estudio: "Enfoque y constancia",
  tarea: "Tiempo de completar actividades",
  escuela: "Aprendizaje activo",
  fiesta: "Momento de celebración 🎉",
  musica: "Reproduciendo música 🎵",
  baile: "Movimiento y ritmo",
  frio: "Abrígate bien",
  calor: "Día caluroso",
  lluvia: "Está lloviendo 🌧",
  sol: "Día soleado ☀️",
  viento: "Brisa presente",
  noche: "Hora de descansar",
  dia: "Buen día",
  manana: "Nuevo comienzo",
  tarde: "Momento tranquilo",
  madrugada: "Silencio total",
  videojuego: "Hora de jugar 🎮",
  pelicula: "Momento de cine 🍿",
  serie: "Maratón disponible 📺",
  libro: "Lectura en progreso 📚",
  escritura: "Expresión creativa",
  viaje: "Preparando salida ✈️",
  playa: "Relax junto al mar",
  montaña: "Aventura en altura",
  ciudad: "Vida activa",
  deporte: "Actividad física",
  futbol: "Juego en progreso ⚽",
  basquet: "Cancha activa 🏀",
  amigo: "Buen compañero",
  familia: "Apoyo importante",
  silencio: "Momento de calma total"
};

    for (let key in respuestas) {
        const regex = new RegExp(`^${key}$`, "i");
        if (regex.test(m.text)) {
            conn.reply(m.chat, respuestas[key], m, rcanal);
            return !0;
        }
    }

    return !0;
};

export default handler;