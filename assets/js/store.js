const DB={get:(k,d)=>{try{return JSON.parse(localStorage.getItem('dv_'+k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem('dv_'+k,JSON.stringify(v))}catch{}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const num=v=>parseFloat(String(v).replace(/[^\d,.-]/g,'').replace(/\.(?=\d{3})/g,'').replace(',','.'))||0;
const brl=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
function parseCSV(t){const l=t.split(/\r?\n/)[0],sep=(l.match(/;/g)||[]).length>(l.match(/,/g)||[]).length?';':',',R=[];let r=[],c='',q=false;for(let i=0;i<t.length;i++){const h=t[i];if(q){if(h=='"'&&t[i+1]=='"'){c+='"';i++}else if(h=='"')q=false;else c+=h}else if(h=='"')q=true;else if(h==sep){r.push(c);c=''}else if(h=='\n'||h=='\r'){if(h=='\r'&&t[i+1]=='\n')i++;r.push(c);c='';if(r.some(x=>x.trim()))R.push(r);r=[]}else c+=h}r.push(c);if(r.some(x=>x.trim()))R.push(r);return R}
const toCSV=R=>R.map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(';')).join('\n');
function download(n,t){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+t],{type:'text/csv;charset=utf-8'}));a.download=n;a.click()}
function readFile(f,cb){const r=new FileReader();r.onload=()=>cb(r.result);r.readAsText(f,'utf-8')}
