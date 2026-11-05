(()=>{
const $=s=>document.querySelector(s),stage=$('#stage');
/* ---------- render slide 6-9 from content.js ---------- */
const slot=$('#stSlot');
window.STRATEGY.forEach(d=>{const s=document.createElement('section');s.className='scene st'+(d.rev?' rev':'');s.id=d.id;s.dataset.trans=d.trans;if(d.toast)s.dataset.toast=d.toast;s.style.setProperty('--acc',d.acc);
 s.innerHTML=`<div class="bgfx"></div><div class="hd">3. Strategi Aktivasi per Marketplace</div>
 <div class="bn"><div class="pct rv rz" style="--i:1">${d.pct}</div><div class="nm rv" style="--i:2">${d.nm}</div><div class="pot rv" style="--i:3">${d.pot}</div></div>
 <div class="tx"><h2 class="rv rl" style="--i:0;font-size:52px;color:var(--acc);margin-bottom:12px">${d.title}</h2><div class="fok rv" style="--i:2">${d.fok}</div>
 <ul>${d.li.map((t,i)=>`<li class="rv rr" style="--i:${i+3}">${t}</li>`).join('')}</ul><div class="camp rv" style="--i:10">${d.camp}</div></div>`;slot.before(s)});
slot.remove();
document.querySelectorAll('[data-kin]').forEach(e=>{e.innerHTML=e.textContent.split(' ').map((w,i)=>`<span style="--w:${i}">${w}</span>`).join(' ')});
/* ---------- audio ---------- */
const A={vol:.8,mute:false,mus:true,sfx:true,cache:{}};
const music=new Audio('assets/audio/opening.mp3'),jok=new Audio('assets/audio/jokowi.mp3'),vid=$('#vid');
const eff=()=>A.mute?0:A.vol;
function sfx(n,v=1){if(!A.sfx||A.mute)return;const a=new Audio(`assets/audio/${n}.mp3`);a.volume=Math.min(1,eff()*v);a.play().catch(()=>{})}
function applyVol(){vid.volume=eff();jok.volume=A.sfx?eff():0;music.volume=A.mus?eff()*(music._r??1):0}
function fadeOut(a,ms=900){const v0=a.volume,t0=performance.now();(function f(){const k=Math.min(1,(performance.now()-t0)/ms);a.volume=v0*(1-k);if(k<1)requestAnimationFrame(f);else{a.pause();a.volume=v0}})()}
/* ---------- engine ---------- */
const order=['gate','intro','loading','s1','s2','s3','freeze','s4','s5','suspense','s6','s7','s8','s9','s10','s11','twist','s12','s13','s14','dark','closing','final'];
const el=Object.fromEntries(order.map(i=>[i,document.getElementById(i)]));
let cur=-1,timers=[],raf=0,lock=0,ivl=0;const T=(f,ms)=>timers.push(setTimeout(f,ms));
const clear=()=>{clearInterval(ivl);timers.forEach(clearTimeout);timers=[];cancelAnimationFrame(raf)};
function type(node,text,speed=55,done){node.textContent='';node.classList.add('type');let i=0;(function s(){node.textContent=text.slice(0,++i);if(i<text.length){sfx('tick',.25);timers.push(setTimeout(s,speed))}else{node.classList.remove('type');done&&done()}})()}
const flash=()=>{const f=$('#flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go')};
function go(i,back){
 if(i<0||i>=order.length||lock)return;clear();
 const id=order[i],n=el[id],prev=el[order[cur]];
 if(prev&&prev!==n){prev.classList.remove('active');prev.classList.add('leaving');const p=prev;setTimeout(()=>p.classList.remove('leaving'),900)}
 [vid,jok].forEach(a=>{if(id!=='closing'&&a===vid)vid.pause();if(a===jok)jok.pause()});
 if(id!=='intro'&&id!=='gate'&&!music.paused)fadeOut(music);
 n.className=n.className.replace(/\bt-\w+|\bback\b|\bactive\b/g,'').trim();void n.offsetWidth;
 n.classList.add(n.dataset.trans||'t-zoom');if(back)n.classList.add('back');n.classList.add('active');
 n.querySelectorAll('.rv,.kin span').forEach(x=>{x.style.animation='none';void x.offsetWidth;x.style.animation=''});
 cur=i;
 const auto=n.hasAttribute('data-auto');
 if(!auto){sfx(n.dataset.trans==='t-glitch'?'glitch':'whoosh',.7);if(id==='s1'||id==='s14')T(()=>sfx('impact'),500)}
 if(n.dataset.toast)T(()=>toast(n,n.dataset.toast),3500);
 (H[id]||(()=>{}))(n);
 ui();
}
const next=()=>{if(cur<order.length-1){if(order[cur]==='closing')vid.pause();go(cur+1)}};
const prevS=()=>{let j=cur-1;while(j>0&&el[order[j]].hasAttribute('data-auto'))j--;if(j>=3)go(j,true)};
function toast(n,t){const d=document.createElement('div');d.className='toast show';d.textContent=t;n.appendChild(d);setTimeout(()=>d.remove(),3300)}
function ui(){const k=Math.max(0,cur),tot=order.length-1;$('#pbar').style.width=(k/tot*100)+'%';$('#cnt').textContent=k+'/'+tot;$('#ui').style.display=cur===0?'none':'flex'}
/* ---------- scene hooks ---------- */
const H={
intro(){
 const chs=['c1','c2','c3','c4'].map(i=>$('#'+i)),show=k=>{chs.forEach((c,j)=>{c.classList.remove('on','frz');if(j===k){void c.offsetWidth;c.classList.add('on')}});$('#i0').style.display='none'};
 chs.forEach(c=>c.classList.remove('on'));$('#sq').classList.remove('on');$('#imain').classList.remove('on');$('#i0').style.display='';
 music.currentTime=0;music._r=.4;applyVol();music.play().catch(()=>{});const t0=performance.now();
 const cues=[[2.2,()=>{show(0);sfx('hit1');flash()}],[5.05,()=>{show(1);sfx('hit2');flash()}],[7.35,()=>{show(2);sfx('hit3');sfx('glitch',.5)}],
 [10.65,()=>{show(3);sfx('hit4');flash();T(()=>$('#c4').classList.add('frz'),1500);T(()=>{$('#c4').classList.remove('frz');sfx('scratch',.4)},2000)}],
 [14.19,()=>{chs.forEach(c=>c.classList.remove('on'));$('#sq').classList.add('on');sfx('impact')}],
 [18.09,()=>{$('#sq').classList.remove('on');$('#imain').classList.add('on');sfx('impact');flash()}],[21.9,()=>go(cur+1)]];let k=0;
 (function loop(){const t=(!music.paused&&music.currentTime>0)?music.currentTime:(performance.now()-t0)/1000;
  music._r=.4+.6*Math.min(1,t/18);applyVol();while(k<cues.length&&t>=cues[k][0])cues[k++][1]();raf=requestAnimationFrame(loop)})();
},
loading(){const m=$('#lmsg'),b=$('#lbar'),p=$('#lpc');let v=0;b.style.width='0';m.textContent='Sedang memproses informasi...';
 const msgs=[[0,'Sedang memproses informasi...'],[1800,'Memuat kecerdasan...'],[3400,'Menghitung potensi kebaikan...']];msgs.forEach(([t,s])=>T(()=>m.textContent=s,t));
 const iv=setInterval(()=>{v=Math.min(99,v+(v<70?2.2:v<96?1.1:.3));b.style.width=v+'%';p.textContent=Math.floor(v)+'%';if(Math.floor(v)%10===0)sfx('tick',.3)},60);ivl=iv;
 T(()=>{el.loading.classList.add('glitch');sfx('glitch');m.textContent='ERR… tidak, ini cuma efek.'},3000);
 T(()=>{el.loading.classList.remove('glitch');m.textContent='Harap bersabar, sistem sedang berpikir.'},4200);
 T(()=>{clearInterval(iv);sfx('scratch');go(cur+1)},6800);},
freeze(n){const a=$('#fz1'),b=$('#fz2');n.classList.remove('fz');a.style.display='';b.style.display='none';
 T(()=>{n.classList.add('fz');sfx('scratch')},2200);
 T(()=>{a.style.display='none';b.style.display='';b.innerHTML='<span class="red">SEBENTAR, JANGAN PINDAH DULU.</span>';b.style.fontSize='90px';b.style.fontFamily='var(--disp)';sfx('sting')},2800);
 T(()=>{n.classList.remove('fz');b.innerHTML='Oke, lanjut. Sekarang bagian program.';b.style.fontSize='';b.style.fontFamily=''},5400);T(next,7600)},
suspense(){const d=$('#su');d.textContent='';sfx('suspense');T(()=>type(d,'Kalian memperhatikan nggak?',70),600);
 T(()=>{d.innerHTML='<span class="gold">Ini belum bagian paling menarik.</span>';sfx('sting')},4600);T(next,7000)},
twist(){const a=$('#tw1'),b=$('#tw2');b.style.display='none';a.style.display='';sfx('suspense',.8);type(a,'Sekarang bagian angka. Siap-siap…',60);
 T(()=>type(a,'Target Rp 5 Miliar. Kedengarannya mustahil, kan?',55),3000);
 T(()=>{a.style.display='none';b.style.display='';flash();sfx('sting');T(()=>{jok.currentTime=0;applyVol();jok.play().catch(()=>{})},350)},6600);T(next,9800)},
dark(){const d=$('#dk');d.style.opacity=1;sfx('suspense');T(()=>type(d,'Sepertinya ada sesuatu yang salah...',75),700);
 T(()=>{d.style.transition='opacity 2s';d.style.opacity=0},4600);T(next,7000)},
closing(){vid.classList.remove('on');vid.pause();vid.currentTime=0;applyVol();
 T(()=>{vid.classList.add('on');vid.play().catch(()=>{vid.controls=true})},1500);vid.onended=()=>{vid.onended=null;next()}},
final(){$('#replay').onclick=()=>{cur=0;go(1)}}};
/* ---------- controls ---------- */
const fit=()=>{const s=Math.min(innerWidth/1920,innerHeight/1080);stage.style.transform=`translate(${-960*s}px,${-540*s}px) scale(${s})`};
addEventListener('resize',fit);fit();
$('#startBtn').onclick=()=>{music.load();jok.load();go(1)};
$('#next').onclick=next;$('#prev').onclick=prevS;
addEventListener('keydown',e=>{if(cur<1)return;const k=e.key;
 if(k==='ArrowRight'||k===' '||k==='PageDown'||k==='Enter'){e.preventDefault();next()}
 else if(k==='ArrowLeft'||k==='PageUp')prevS();else if(k==='Home')go(3);else if(k==='End')go(order.length-2);
 else if(k==='f'||k==='F')fs();else if(k==='m'||k==='M')$('#bMute').click()});
const fs=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{});
$('#bFs').onclick=fs;
$('#vol').oninput=e=>{A.vol=+e.target.value;applyVol()};
$('#bMute').onclick=e=>{A.mute=!A.mute;e.target.textContent=A.mute?'🔇':'🔊';applyVol()};
$('#bMus').onclick=e=>{A.mus=!A.mus;e.target.classList.toggle('off',!A.mus);applyVol()};
$('#bSfx').onclick=e=>{A.sfx=!A.sfx;e.target.classList.toggle('off',!A.sfx);applyVol()};
addEventListener('mousemove',e=>{const c=el[order[cur]]&&el[order[cur]].querySelector('.bgfx');if(c)c.style.transform=`translate(${(e.clientX/innerWidth-.5)*-40}px,${(e.clientY/innerHeight-.5)*-30}px)`});
$('#ui').style.display='none';go(0);
})();
