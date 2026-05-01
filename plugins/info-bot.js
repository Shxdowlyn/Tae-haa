import fs from 'fs';

const handler = (m) => {
  return m;
};

handler.all = async function(m) {

    const chat = global.db.data.chats[m.chat];
    if (chat.isBaneed) return;

    const text = m.text.toLowerCase(); 

    const respuestas = {
  "bot": "🌟 ¡Has invocado al Bot!\n\n👑 Soy Asta, tu asistente.\n✰ Usa *!menu* para ver las opciones.",
  "sexo": "🫣 Mejor mantengamos el respeto.",
  "teta": "😅 Mejor evitemos ese tema.",
  "tetas": "😅 Mejor evitemos ese tema.",
  "bug": "😹 Parece que algo falló.",
  "pene": "😹 Mejor no entremos en eso.",
  "adios": "👋 Hasta luego.",
  "amor": "💖 El amor siempre es especial.",
  "odio": "😅 Respira, todo se calma.",
  "gato": "🐱 Los gatos son geniales.",
  "perro": "🐶 Los perros son fieles amigos.",
  "pizza": "🍕 Hora de pizza.",
  "hamburguesa": "🍔 Qué buena elección.",
  "café": "☕ Energía en una taza.",
  "té": "🍵 Algo tranquilo y relajante.",
  "dinero": "💸 Algo importante en la vida.",
  "trabajo": "💪 Sigue esforzándote.",
  "fiesta": "🎉 Momento de celebrar.",
  "música": "🎵 La música siempre acompaña.",
  "frío": "🥶 Abrígate bien.",
  "calor": "🥵 Hace bastante calor.",
  "lluvia": "🌧 Día lluvioso.",
  "sol": "☀️ Día soleado.",
  "noche": "🌙 Buen descanso.",
  "día": "🌞 Buen día.",
  "videojuego": "🎮 Hora de jugar.",
  "película": "🍿 Momento de ver algo.",
  "serie": "📺 Maratón de series.",
  "libro": "📚 Leer siempre suma.",
  "viaje": "✈️ A explorar nuevos lugares.",
  "playa": "🏖 Relax total.",
  "montaña": "⛰ Aventura natural.",
  "deporte": "⚽ A moverse.",
  "fútbol": "⚽ ¡Gol!",
  "basquet": "🏀 Buen tiro.",
  "amigo": "🤝 Buena compañía.",
  "enemigo": "😬 Mantén distancia.",
  "familia": "👨‍👩‍👧‍👦 Lo más importante.",
  "trabajador": "💪 Esfuerzo diario.",
  "perezoso": "😴 Un poco de descanso no hace daño."
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