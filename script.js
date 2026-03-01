// === Sparkle Background ===
const sparkleCanvas = document.getElementById('sparkleCanvas');
const sCtx = sparkleCanvas.getContext('2d');
sparkleCanvas.width = innerWidth;
sparkleCanvas.height = innerHeight;
window.addEventListener('resize',()=>{sparkleCanvas.width=innerWidth;sparkleCanvas.height=innerHeight;});
let sparkles=[];
for(let i=0;i<100;i++){sparkles.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2+1,speedY:Math.random()*0.5+0.2,alpha:Math.random()});}
function sparkleAnim(){
  sCtx.clearRect(0,0,innerWidth,innerHeight);
  sparkles.forEach(s=>{
    s.y+=s.speedY; if(s.y>innerHeight) s.y=0;
    sCtx.fillStyle=`rgba(255,255,255,${s.alpha})`;
    sCtx.beginPath(); sCtx.arc(s.x,s.y,s.r,0,Math.PI*2); sCtx.fill();
  });
  requestAnimationFrame(sparkleAnim);
}
sparkleAnim();

// === Painting Setup ===
const canvas=document.getElementById('holiCanvas');
const ctx=canvas.getContext('2d');
const img=document.getElementById('mePic');
function resizeCanvas(){canvas.width=img.clientWidth;canvas.height=img.clientHeight;}
resizeCanvas();window.addEventListener('resize',resizeCanvas);
let currentColor='#FF5DA2';let paintWidth=15;
document.querySelectorAll('.color-btn').forEach(btn=>btn.addEventListener('click',()=>currentColor=btn.dataset.color));
canvas.addEventListener('click',e=>{
  const rect=canvas.getBoundingClientRect();
  const x=e.clientX-rect.left,y=e.clientY-rect.top;
  ctx.globalAlpha=0.6;ctx.fillStyle=currentColor;ctx.beginPath();ctx.arc(x,y,paintWidth+Math.random()*5,0,Math.PI*2);ctx.fill();
  shootGulalAt(x,y);
});
document.getElementById('resetColors').addEventListener('click',()=>ctx.clearRect(0,0,canvas.width,canvas.height));

// === Navigation ===
document.getElementById('homeBtn').onclick=()=>document.getElementById('home').scrollIntoView({behavior:'smooth'});
document.getElementById('playBtn').onclick=()=>document.getElementById('play').scrollIntoView({behavior:'smooth'});
document.getElementById('wishBtn').onclick=()=>document.getElementById('wish').scrollIntoView({behavior:'smooth'});

// === Video Button ===
document.getElementById('openVideo').onclick=()=>window.open('video.html','_blank');

// === Gulal ===
const gulalCanvas=document.getElementById('gulalCanvas');
const gCtx=gulalCanvas.getContext('2d');
gulalCanvas.width=innerWidth;gulalCanvas.height=innerHeight;
window.addEventListener('resize',()=>{gulalCanvas.width=innerWidth;gulalCanvas.height=innerHeight;});
function shootGulalAt(x,y){
  let parts=[];const colors=['#FF5DA2','#FFD93D','#6BCB77','#845EC2','#FF9671'];
  for(let i=0;i<30;i++){parts.push({x,y,radius:Math.random()*8+5,color:colors[Math.floor(Math.random()*colors.length)],speedX:Math.random()*6-3,speedY:Math.random()*-6-2,alpha:1});}
  function animate(){
    gCtx.clearRect(0,0,gulalCanvas.width,gulalCanvas.height);
    parts.forEach(p=>{p.x+=p.speedX;p.y+=p.speedY;p.alpha-=0.02;gCtx.fillStyle=p.color;gCtx.globalAlpha=p.alpha;gCtx.beginPath();gCtx.arc(p.x,p.y,p.radius,0,Math.PI*2);gCtx.fill();});
    parts=parts.filter(p=>p.alpha>0);
    if(parts.length>0)requestAnimationFrame(animate);
  }
  animate();
}
document.getElementById('home').addEventListener('click',e=>{
  const rect=e.currentTarget.getBoundingClientRect();
  shootGulalAt(e.clientX-rect.left,e.clientY-rect.top);
});

// === Confetti on Wish Submit ===
const confettiCanvas=document.getElementById('confettiCanvas');
const cCtx=confettiCanvas.getContext('2d');
confettiCanvas.width=innerWidth;confettiCanvas.height=innerHeight;
window.addEventListener('resize',()=>{confettiCanvas.width=innerWidth;confettiCanvas.height=innerHeight;});
document.getElementById('wishForm').addEventListener('submit',e=>{
  e.preventDefault();confetti();setTimeout(()=>e.target.submit(),1200);
});
function confetti(){
  let confs=[];for(let i=0;i<150;i++){confs.push({x:Math.random()*confettiCanvas.width,y:Math.random()*-confettiCanvas.height,radius:Math.random()*6+4,color:['#FF5DA2','#FFD93D','#6BCB77','#845EC2','#FF9671'][Math.floor(Math.random()*5)],speedY:Math.random()*5+2,speedX:Math.random()*4-2,alpha:1});}
  function animate(){
    cCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    confs.forEach(f=>{f.x+=f.speedX;f.y+=f.speedY;f.alpha-=0.01;cCtx.fillStyle=f.color;cCtx.globalAlpha=f.alpha;cCtx.beginPath();cCtx.arc(f.x,f.y,f.radius,0,Math.PI*2);cCtx.fill();});
    confs=confs.filter(f=>f.alpha>0);
    if(confs.length>0)requestAnimationFrame(animate);
  }
  animate();
}