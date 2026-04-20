let R = Math.random;
let Fl = Math.floor;
let toM = (a) => "@" + a.split("@")[0];
function handler(m, {groupMetadata}) {
  let ps = groupMetadata.participants.map((v) => v.id);
  let a = ps[Fl(R() * ps.length)];
  let b;
  do b = ps[Fl(R() * ps.length)];
  while (b === a);
  let c;
  do c = ps[Fl(R() * ps.length)];
  while (b === a);
  let d;
  do d = ps[Fl(R() * ps.length)];
  while (b === a);
  let e;
  do e = ps[Fl(R() * ps.length)];
  while (b === a);
  let f;
  do f = ps[Fl(R() * ps.length)];
  while (b === a);
  let g;
  do g = ps[Fl(R() * ps.length)];
  while (b === a);
  let h;
  do h = ps[Fl(R() * ps.length)];
  while (b === a);
  let i;
  do i = ps[Fl(R() * ps.length)];
  while (b === a);
  let j;
  do j = ps[Fl(R() * ps.length)];
  while (b === a);
  m.reply(
`╭━━━〔  TOP 5 PAREJAS DEL GRUPO  〕━━━╮
┃
┃ 1. ${toM(a)}  💙  ${toM(b)}
┃    ✦ Destinados a estar juntos
┃
┃ 2. ${toM(c)}  ✨  ${toM(d)}
┃    ✦ Tortolitos enamorados
┃
┃ 3. ${toM(e)}  🤱  ${toM(f)}
┃    ✦ Ya parecen familia
┃
┃ 4. ${toM(g)}  💍  ${toM(h)}
┃    ✦ Matrimonio secreto confirmado
┃
┃ 5. ${toM(i)}  💕  ${toM(j)}
┃    ✦ Luna de miel activa
┃
╰━━━〔 Sistema de parejas activado 〕━━━╯`,
    null,
    {
      mentions: [a, b, c, d, e, f, g, h, i, j],
    }
  );
}
handler.help = ["formarpareja5"];
handler.tags = ["main", "fun"];
handler.command = ["formarpareja5"];
handler.register = true;
handler.group = true;
export default handler;