const TOPIC = process.env.NTFY_TOPIC;
const DIAS_CULTO = [];

const CASA = [
["00:00","🛌 Hora de dormir","Cama inclinada em 15 cm, deitada do lado esquerdo."],
["05:00","💊 Remédio da tireoide","1 gole sutil de água. Ficar um pouco sentada na cama."],
["09:00","🥣 Gel de farelo de aveia","100 ml de água morna + 1 colher (sopa) de farelo."],
["09:30","🍽️ Café da manhã","Com 240 ml de chá de camomila. Mastigar cada garfada 30 vezes."],
["10:00","🚫 Jejum de líquidos","Zero água."],
["11:30","💧 Hidratação da manhã","300 ml de água pura, em golinhos."],
["12:15","⏳ Prepare o almoço","Sem líquidos."],
["12:30","🍽️ Almoço","ZERO LÍQUIDOS."],
["13:00","🚫 Jejum de líquidos","Zero água."],
["15:00","💧 Hidratação da tarde","400 ml de água pura, em goles calmos."],
["16:00","⏳ Prepare o lanche","Sem líquidos."],
["16:15","🍌 Lanche da tarde","Alimento saudável + 240 ml de chá de camomila ou erva-doce morno. Sem cafeína."],
["16:30","🚫 Jejum total","Zero água e zero comida."],
["19:30","🍽️ Jantar","ZERO LÍQUIDOS."],
["20:00","🚫 Jejum total","Zero água e zero comida."],
["22:30","⏳ Prepare o gel noturno","Sem líquidos."],
["22:45","🥣 Gel de aveia noturno","100 ml de água morna + 1 colher (sopa) de farelo."],
["23:00","🚫 Jejum pós-aveia","Zero água."]
];

const CULTO = [
["00:00","🛌 Hora de dormir","Cama inclinada em 15 cm, deitada do lado esquerdo."],
["05:00","💊 Remédio da tireoide","1 gole sutil de água. Ficar um pouco sentada na cama."],
["09:00","🥣 Gel de farelo de aveia","200 ml de água morna + 1 colher (sopa) de farelo."],
["09:30","🍽️ Café da manhã","Com 240 ml de chá de camomila. Mastigar cada garfada 30 vezes."],
["10:00","🚫 Jejum de líquidos","Zero água."],
["11:30","💧 Hidratação da manhã","300 ml de água pura, em golinhos."],
["12:15","⏳ Prepare o almoço","Sem líquidos."],
["12:30","🍽️ Almoço","ZERO LÍQUIDOS."],
["13:00","🚫 Jejum de líquidos","Zero água."],
["15:00","💧 Hidratação da tarde","400 ml de água pura, em goles calmos."],
["16:00","⏳ Prepare o lanche","Sem líquidos."],
["16:15","🍌 Lanche da tarde","1 torrada + banana-prata amassada + 240 ml de chá de camomila ou erva-doce morno. Proibido suco ou café."],
["16:30","🚫 Jejum de líquidos","Zero água."],
["17:30","🍽️ Jantar precoce","Comer antes de sair. ZERO LÍQUIDOS."],
["18:00","⛪ Horário do culto","Jejum (no máximo 1 gole de água se tossir)."],
["21:30","🥣 Gel de aveia noturno","100 ml de água morna + 1 colher (sopa) de farelo. Preparar assim que chegar em casa."],
["22:00","🚫 Jejum total","Zero água e zero comida."]
];

(async () => {
  const hoje = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
  const d = new Date(hoje + "T12:00:00-03:00");
  d.setUTCDate(d.getUTCDate() + 1);
  const amanha = d.toISOString().slice(0, 10);
  const lista = DIAS_CULTO.includes(d.getUTCDay()) ? CULTO : CASA;
  console.log("Agendando", amanha, lista === CULTO ? "(culto)" : "(em casa)");
  for (const [hora, title, message] of lista) {
    const ts = Math.floor(new Date(amanha + "T" + hora + ":00-03:00").getTime() / 1000);
    if (ts * 1000 < Date.now() + 30000) continue;
    const r = await fetch("https://ntfy.sh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: TOPIC, title, message, priority: 4, delay: String(ts) })
    });
    console.log(hora, r.status);
  }
})();
