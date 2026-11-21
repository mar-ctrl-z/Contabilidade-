(()=>{
let rows=DB.get('clientes',[]);const $=s=>document.querySelector(s);
const save=()=>{DB.set('clientes',rows);draw()};
function draw(){
 const total=rows.reduce((a,r)=>a+r.gasto,0),compras=rows.reduce((a,r)=>a+r.compras,0),city={};
 rows.forEach(r=>{const c=r.cidade||'Sem cidade';city[c]=(city[c]||0)+r.gasto});
 const top=Object.entries(city).sort((a,b)=>b[1]-a[1])[0],best=[...rows].sort((a,b)=>b.gasto-a.gasto)[0];
 $('#sheet-report').innerHTML=rows.length?`<div class="x-kpis"><div class="x-kpi"><small>Clientes</small><strong>${rows.length}</strong></div><div class="x-kpi"><small>Total gasto</small><strong>${brl(total)}</strong></div><div class="x-kpi"><small>Ticket médio</small><strong>${brl(compras?total/compras:0)}</strong></div><div class="x-kpi"><small>Melhor cidade</small><strong>${esc(top[0])}</strong></div></div><p>Melhor cliente: <b>${esc(best.nome)}</b> (${brl(best.gasto)}).</p>`:'';
 $('#sheet-rows').innerHTML=rows.length?rows.map((r,i)=>`<tr><td>${esc(r.nome)}</td><td>${esc(r.tel)}</td><td>${esc(r.cidade)}</td><td>${r.compras}</td><td>${brl(r.gasto)}</td><td><button class="x-del" data-i="${i}" aria-label="Excluir ${esc(r.nome)}">×</button></td></tr>`).join(''):'<tr><td colspan="6" class="x-empty">Nenhum cliente ainda. Importe um CSV ou cadastre acima.</td></tr>';
 const s=$('.stat.coral');if(s&&rows.length){s.querySelector('strong').textContent=rows.length;s.querySelector('p').textContent='da sua planilha'}
}
$('#client-form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);rows.push({nome:f.get('nome').trim(),tel:f.get('tel').trim(),cidade:f.get('cidade').trim(),compras:Math.round(num(f.get('compras'))),gasto:num(f.get('gasto'))});e.target.reset();save()};
$('#sheet-rows').onclick=e=>{const b=e.target.closest('.x-del');if(b){rows.splice(+b.dataset.i,1);save()}};
const imp=$('.import');if(imp)imp.onclick=()=>{$('#sheet').scrollIntoView({behavior:'smooth'});$('#sheet-file').click()};
$('#sheet-import').onclick=()=>$('#sheet-file').click();
$('#sheet-file').onchange=e=>{const f=e.target.files[0];if(!f)return;readFile(f,t=>{const R=parseCSV(t),h=R[0].map(x=>x.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''));
 const ix=(re,d)=>{const i=h.findIndex(x=>re.test(x));return i<0?d:i},c={n:ix(/nome|cliente/,0),t:ix(/tel|whats|cel/,1),c:ix(/cidade/,2),g:ix(/gasto|total|valor/,3),p:ix(/compra|pedido/,4)};
 const add=R.slice(1).map(r=>({nome:(r[c.n]||'').trim(),tel:(r[c.t]||'').trim(),cidade:(r[c.c]||'').trim(),gasto:num(r[c.g]),compras:Math.round(num(r[c.p]))})).filter(r=>r.nome);
 rows=rows.concat(add);save();alert(add.length+' clientes importados.')});e.target.value=''};
const head=['nome','telefone','cidade','total_gasto','compras'],line=r=>[r.nome,r.tel,r.cidade,r.gasto,r.compras];
$('#sheet-template').onclick=()=>download('modelo_clientes.csv',toCSV([head,['Maria Souza','(89) 99999-0000','Picos',320,4]]));
$('#sheet-export').onclick=()=>download('clientes.csv',toCSV([head,...rows.map(line)]));
$('#sheet-report-dl').onclick=()=>{if(!rows.length)return alert('Cadastre ou importe clientes primeiro.');const t=rows.reduce((a,r)=>a+r.gasto,0),c=rows.reduce((a,r)=>a+r.compras,0);
 download('relatorio_clientes.csv',toCSV([['Relatório de clientes'],['Clientes',rows.length],['Total gasto',t.toFixed(2)],['Ticket médio',(c?t/c:0).toFixed(2)],[],head,...[...rows].sort((a,b)=>b.gasto-a.gasto).map(line)]))};
draw();
})();
