// Products: [name, price in PKR, colours, tag, image file]
const WA_NUMBER = "923214406962";
const waLink = text => "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
const pkr = n => "PKR " + n.toLocaleString("en-US");
const DATA = {
  lux: [
    ["Classic White",2500,"12 colors","Best seller","p01"],
    ["Winter Cotton",2900,"20 colors","","p02"],
    ["Premium Wash & Wear",3200,"15 colors","","p10"],
    ["Merino Blend",3650,"9 colors","","p04"],
    ["Everyday Essential",3950,"14 colors","","p08"],
    ["Formal Plus",4200,"11 colors","","p07"],
    ["Signature Grey",4500,"8 colors","","p12"],
    ["Ceremonial White",4800,"6 colors","New","p03"]
  ],
  emb: [
    ["Heritage Embroidery",4800,"1 color","","p11"],
    ["Summer Embroidery",3400,"1 color","","p06"],
    ["Coloured Embroidery",3900,"3 colors","New","p05"],
    ["Kashmiri Stitch",4300,"1 color","","p09"]
  ]
};
const rail = document.getElementById('rail');
function render(key){
  rail.innerHTML = DATA[key].map(([name, price, cols, tag, img]) => {
    const link = waLink(`Assalam o Alaikum! I would like to order ${name} (${pkr(price)}) from SafaidPosh.pk.`);
    return `<article class="card">
      <a href="${link}" target="_blank" rel="noopener"><div class="ph"><img src="images/${img}.svg" alt="${name}" loading="lazy">${tag ? `<span class="tag">${tag}</span>` : ""}<span class="opt">Buy on WhatsApp</span></div></a>
      <h3>${name}</h3>
      <div class="price">${pkr(price)}</div>
      <div class="cols">(${cols})</div>
      <a class="btn dark mini" href="${link}" target="_blank" rel="noopener">Buy Now</a>
    </article>`;
  }).join('');
  rail.scrollLeft = 0;
}
render('lux');
document.querySelectorAll('#tabs button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#tabs button').forEach(x=>x.classList.remove('on'));
  b.classList.add('on'); render(b.dataset.t);
});
document.getElementById('prev').onclick=()=>rail.scrollBy({left:-rail.clientWidth*.8,behavior:'smooth'});
document.getElementById('next').onclick=()=>rail.scrollBy({left:rail.clientWidth*.8,behavior:'smooth'});

// Hero slider
const slides=document.getElementById('slides'), dots=document.getElementById('dots');
const n=slides.children.length; let cur=0, timer;
for(let i=0;i<n;i++){const d=document.createElement('button');d.setAttribute('aria-label','Slide '+(i+1));d.onclick=()=>go(i,true);dots.appendChild(d)}
function go(i,manual){cur=(i+n)%n;slides.style.transform=`translateX(-${cur*100}%)`;[...dots.children].forEach((d,k)=>d.classList.toggle('on',k===cur));if(manual){clearInterval(timer);timer=setInterval(()=>go(cur+1),6000)}}
go(0);timer=setInterval(()=>go(cur+1),6000);

// Mobile menu
document.getElementById('burger').onclick=()=>document.getElementById('nav').classList.toggle('open');

// Optional hero videos: set data-video="videos/hero-1.mp4" on a .slide in index.html.
document.querySelectorAll('.slide[data-video]').forEach(sl => {
  const src = sl.dataset.video;
  if (!src) return;
  const v = document.createElement('video');
  v.className = 'bg';
  v.src = src;
  v.muted = true; v.setAttribute('muted', '');
  v.loop = true; v.autoplay = true; v.playsInline = true; v.setAttribute('playsinline', '');
  v.preload = 'metadata';
  v.addEventListener('error', () => v.remove());   // falls back to the image
  sl.insertBefore(v, sl.querySelector('.copy'));
  v.play().catch(() => {});
});
