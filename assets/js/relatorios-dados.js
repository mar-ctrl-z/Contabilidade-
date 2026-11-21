(()=>{
let E=DB.get('metricas',[]);const $=s=>document.querySelector(s),sum=k=>E.reduce((a,r)=>a+r[k],0);
const save=()=>{DB.set('metricas',E.sort((a,b)=>a.data.localeCompare(b.data)));draw()};
const K=v=>v>=1000?(v/1000).toFixed(1).replace('.',',')+'K':String(v);
function draw(){
 const A=sum('alcance'),P=sum('pedidos'),F=sum('fat'),I=sum('inv');
 if(E.length){const v=[K(A),String(P),P?brl(I/P):'—',brl(F)],d=['Soma dos dados que você registrou','Pedidos registrados','Investimento ÷ pedidos',I?`Retorno de ${(F/I).toFixed(1).replace('.',',')}x sobre o investimento`:'Faturamento registrado'];
  document.querySelectorAll('.kpi-card').forEach((k,i)=>{k.querySelector('.kpi-value').textContent=v[i];k.querySelector('.kpi-detail').textContent=d[i];const t=k.querySelector('.kpi-trend');if(t)t.hidden=true})}
 const last=E.slice(-12),mx=Math.max(...last.map(r=>r.alcance),1);
 $('#met-bars').innerHTML=last.map(r=>`<i style="height:${Math.max(r.alcance/mx*100,3)}%" title="${esc(r.data)}: ${r.alcance} de alcance"></i>`).join('');
 $('#met-rows').innerHTML=E.length?E.map((r,i)=>`<tr><td>${esc(r.data.split('-').reverse().join('/'))}</td><td>${esc(r.origem)}</td><td>${r.alcance}</td><td>${r.pedidos}</td><td>${brl(r.fat)}</td><td>${brl(r.inv)}</td><td><button class="x-del" data-i="${i}" aria-label="Excluir registro">×</button></td></tr>`).join(''):'<tr><td colspan="7" class="x-empty">Nenhum dado ainda. Registre acima ou importe um CSV.</td></tr>';
}
$('#met-form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);E.push({data:f.get('data'),origem:f.get('origem'),alcance:Math.round(num(f.get('alcance'))),pedidos:Math.round(num(f.get('pedidos'))),fat:num(f.get('fat')),inv:num(f.get('inv'))});e.target.reset();save()};
$('#met-rows').onclick=e=>{const b=e.target.closest('.x-del');if(b){E.splice(+b.dataset.i,1);save()}};
const head=['data','origem','alcance','pedidos','faturamento','investimento'];
$('#met-import').onclick=()=>$('#met-file').click();
$('#met-file').onchange=e=>{const f=e.target.files[0];if(!f)return;readFile(f,t=>{const add=parseCSV(t).slice(1).map(r=>({data:(r[0]||'').trim(),origem:(r[1]||'Outro').trim(),alcance:Math.round(num(r[2])),pedidos:Math.round(num(r[3])),fat:num(r[4]),inv:num(r[5])})).filter(r=>/^\d{4}-\d{2}-\d{2}$/.test(r.data));E=E.concat(add);save();alert(add.length+' registros importados. (Datas devem estar no formato AAAA-MM-DD.)')});e.target.value=''};
$('#met-template').onclick=()=>download('modelo_resultados.csv',toCSV([head,['2026-11-01','Instagram',1200,8,640,50]]));
const exp=()=>E.length?download('relatorio_resultados.csv',toCSV([head,...E.map(r=>[r.data,r.origem,r.alcance,r.pedidos,r.fat,r.inv])])):0;
$('.btn-lime')?.addEventListener('click',e=>{if(E.length){e.stopImmediatePropagation();exp()}},true);
$('#met-export').onclick=()=>E.length?exp():alert('Registre dados primeiro.');
$('.btn-secondary')?.addEventListener('click',draw);
draw();
})();
