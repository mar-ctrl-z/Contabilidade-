const form=document.querySelector('#chat-form'),input=document.querySelector('#chat-input'),messages=document.querySelector('#messages'),content=document.querySelector('#chat-content'),fileInput=document.querySelector('#chat-file');
const pick=a=>a[Math.floor(Math.random()*a.length)],tag=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\W/g,'').toLowerCase();
const ctx={intent:null,ask:null,biz:'',prod:'',extra:''};
const INTENTS=[['oferta',/oferta|promo|desconto|black/i],['calendario',/calend|agenda|planej|semana/i],['insights',/insight|alcance|m[eé]trica|resultado|relat/i],['trafego',/tr[aá]fego|an[uú]ncio|pago|impuls/i],['imagem',/imagem|foto/i],['post',/post|legenda|publica|divulg/i]];
const Q={biz:'Qual é o nome do seu negócio?',prod:'O que você quer divulgar? (ex: Camiseta Solar)',extra:'Qual a condição da oferta? (ex: 20% off até domingo)'};
const NEED={post:['biz','prod'],oferta:['biz','prod','extra'],calendario:['biz']};
const END='\n\nQuer outra versão? Digite “outra”.';
const G={
post:c=>pick([`✦ ${c.prod} chegou na ${c.biz}!\n\nLegenda: Separamos ${c.prod} com carinho para você. Vem conferir e garantir o seu antes que acabe. 💛\nChamada: Peça agora pelo WhatsApp.\n#${tag(c.biz)} #${tag(c.prod)} #novidade`,`Procurando algo assim? 👀\n\nLegenda: ${c.prod} é um dos queridinhos da ${c.biz}. Qualidade, preço justo e entrega rápida.\nChamada: Chame no direct e faça seu pedido.\n#${tag(c.biz)} #${tag(c.prod)} #compreilocal`,`Dica da ${c.biz}: ${c.prod} combina com tudo. ✨\n\nLegenda: Mostre como você usa e marque a gente! Os melhores looks aparecem nos nossos stories.\nChamada: Toque no link da bio.\n#${tag(c.biz)} #${tag(c.prod)}`])+'\n\nMelhor horário: 18h às 20h. Use foto real, na vertical (4:5).'+END,
oferta:c=>pick([`🔥 OFERTA NA ${c.biz.toUpperCase()}\n\n${c.prod}: ${c.extra}.\nLegenda: É só por tempo limitado! Garanta o seu pelo WhatsApp antes que acabe.\n#${tag(c.biz)} #oferta #${tag(c.prod)}`,`Aproveite! ${c.prod} com condição especial: ${c.extra}.\n\nLegenda: A ${c.biz} preparou algo para você. Corre, o estoque é limitado.\nChamada: Chame agora e peça o seu.\n#${tag(c.biz)} #promocao`])+'\n\nDica: destaque o prazo no início da arte e fixe o post no perfil.'+END,
calendario:c=>`Plano de 7 dias para a ${c.biz}:\n\nSeg: bastidores do negócio (stories)\nTer: apresente um produto (post)\nQua: depoimento de cliente\nQui: dica de uso ou curiosidade (carrossel)\nSex: oferta do fim de semana\nSáb: post com preço + botão de WhatsApp\nDom: enquete nos stories para saber o que o público quer\n\nPublique sempre no mesmo horário. Quer que eu escreva algum desses posts? Digite “criar um post”.`,
insights:()=>'Os 4 números que importam:\n\n• Alcance: quantas pessoas viram. Se cai, poste com mais frequência.\n• Engajamento: curtidas, comentários e salvamentos. Mostra se o conteúdo agrada.\n• Cliques no link/WhatsApp: mostram interesse real em comprar.\n• Pedidos: o resultado final.\n\nRegistre esses números na página Relatórios Detalhados para acompanhar a evolução.',
trafego:()=>'Para começar com tráfego pago:\n\n1. Comece com R$ 10 a R$ 20 por dia, por 5 dias.\n2. Impulsione o post que já deu mais resultado.\n3. Escolha a sua cidade e um raio de até 15 km.\n4. Use o botão “Enviar mensagem” (WhatsApp) como objetivo.\n5. Pause o que não gerar mensagens e invista mais no que gerar.',
imagem:()=>'Clique no botão ＋ ao lado do campo de mensagem e escolha uma foto. Eu avalio resolução, formato, brilho e contraste.'};
function add(role,text,img){const d=document.createElement('div');d.className='message '+role;if(img){const i=new Image();i.src=img;i.alt='Imagem enviada';d.append(i)}if(text)d.append(document.createTextNode(text));messages.append(d);content.scrollTop=content.scrollHeight}
const bot=t=>setTimeout(()=>add('bot',t),350);
function run(){bot(G[ctx.intent](ctx))}
function next(){const k=(NEED[ctx.intent]||[]).find(x=>!ctx[x]);if(k){ctx.ask=k;return bot(Q[k])}run()}
function agent(t,fromButton){
 const hit=INTENTS.find(([,r])=>r.test(t));
 if(fromButton||(!ctx.ask&&hit)){ctx.ask=null;ctx.intent=hit?hit[0]:ctx.intent;return next()}
 if(ctx.ask){ctx[ctx.ask]=t;ctx.ask=null;return next()}
 if(/^outra/i.test(t)&&ctx.intent)return run();
 if(/^(oi|ol[aá]|bom dia|boa )/i.test(t))return bot('Oi! Sou a D+. Posso criar um post, montar uma oferta, planejar sua semana ou explicar seus resultados. Por onde começamos?');
 bot('Ainda não entendi esse pedido. Tente “criar um post”, “montar uma oferta” ou “planejar calendário”, ou escolha uma opção ao lado.');
}
function sendMessage(text,fromButton){const t=text.trim();if(!t)return;add('user',t);agent(t,fromButton)}
form.addEventListener('submit',e=>{e.preventDefault();sendMessage(input.value);input.value=''});
document.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>sendMessage(b.dataset.prompt,true)));
document.querySelector('.attach').addEventListener('click',()=>fileInput.click());
fileInput.addEventListener('change',()=>{const f=fileInput.files[0];if(!f)return;const url=URL.createObjectURL(f);add('user','',url);const im=new Image();
 im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d');x.drawImage(im,0,0,32,32);const d=x.getImageData(0,0,32,32).data,n=d.length/4;let s=0,q=0;
  for(let i=0;i<d.length;i+=4){const l=.299*d[i]+.587*d[i+1]+.114*d[i+2];s+=l;q+=l*l}
  const m=s/n,sd=Math.sqrt(Math.max(q/n-m*m,0)),r=im.width/im.height,L=[`Recebi a imagem (${im.width}×${im.height}px).`];
  L.push(r>.95&&r<1.05?'Formato quadrado (1:1): ótimo para o feed.':r<.7?'Formato vertical (9:16): perfeito para Stories e Reels.':r<.95?'Formato vertical próximo de 4:5: ideal para o feed.':'Formato horizontal: no Instagram vai ganhar bordas. Prefira 1:1 ou 4:5.');
  L.push(Math.min(im.width,im.height)<1080?'Resolução baixa (menos de 1080px): pode perder nitidez.':'Resolução boa.');
  L.push(m<80?'A foto está escura: fotografe perto de uma janela ou aumente o brilho.':m>200?'A foto está muito clara: reduza a exposição.':'Brilho equilibrado.');
  if(sd<35)L.push('Contraste baixo: o produto pode não se destacar do fundo.');
  L.push('Quer uma legenda para ela? Digite “criar um post”.');bot(L.join('\n'))};
 im.onerror=()=>bot('Não consegui abrir esse arquivo. Envie uma imagem JPG, PNG ou WebP.');im.src=url;fileInput.value=''});
