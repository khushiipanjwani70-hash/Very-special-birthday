
(function(){
'use strict';

var $ = function(id){ return document.getElementById(id); };
var screens = document.querySelectorAll('.screen');

function show(id){
  screens.forEach(function(s){
    s.classList.remove('active');
  });
  $(id).classList.add('active');
  window.scrollTo(0,0);
}

/* Floating pink decorations */
var icons = ['🎀','💗','✨','🌸','💕','🩷','🦋','💌'];
var fl = $('floaters');

for(var i = 0; i < 18; i++){
  var s = document.createElement('span');
  s.textContent = icons[i % icons.length];
  s.style.left = (Math.random()*95)+'%';
  s.style.fontSize = (18+Math.random()*26)+'px';
  s.style.animationDuration = (9+Math.random()*10)+'s';
  s.style.animationDelay = (-Math.random()*15)+'s';
  fl.appendChild(s);
}

/* Pink confetti */
var cv = $('confetti');
var cx = cv.getContext('2d');
var bits = [];
var running = false;

function size(){
  cv.width = window.innerWidth;
  cv.height = window.innerHeight;
}
size();
window.addEventListener('resize',size);

var cols = [
  '#f5a6c8',
  '#e9b9f1',
  '#ffc9df',
  '#ffe7ad',
  '#f8c2d8',
  '#ffffff'
];

function confetti(n){
  for(var i=0;i<n;i++){
    bits.push({
      x:Math.random()*cv.width,
      y:-20-Math.random()*cv.height*.4,
      w:6+Math.random()*8,
      h:8+Math.random()*10,
      c:cols[Math.floor(Math.random()*cols.length)],
      vy:2+Math.random()*4,
      vx:-1.5+Math.random()*3,
      r:Math.random()*6,
      vr:-.2+Math.random()*.4
    });
  }

  if(!running){
    running=true;
    requestAnimationFrame(tick);
  }
}

function tick(){
  cx.clearRect(0,0,cv.width,cv.height);

  bits = bits.filter(function(b){
    return b.y < cv.height+30;
  });

  bits.forEach(function(b){
    b.x+=b.vx;
    b.y+=b.vy;
    b.r+=b.vr;

    cx.save();
    cx.translate(b.x,b.y);
    cx.rotate(b.r);
    cx.fillStyle=b.c;
    cx.fillRect(-b.w/2,-b.h/2,b.w,b.h);
    cx.restore();
  });

  if(bits.length){
    requestAnimationFrame(tick);
  }else{
    running=false;
    cx.clearRect(0,0,cv.width,cv.height);
  }
}

/* First screen */
var teases = [
  'Are you REALLY sure? 🥺',
  'This button is getting nervous. 😂',
  'Cousin ji, we both know you want to see it. 💅',
  'Okay fine... but the surprise is still waiting! 💗'
];

var t=0;
var yes=$('yes');

$('yes').addEventListener('click',function(){
  confetti(80);
  show('s2');
});

$('no').addEventListener('click',function(){
  $('tease').textContent=teases[t%teases.length];
  t++;

  yes.style.transform='scale('+Math.min(1+t*.12,1.6)+')';

  var no=$('no');
  no.style.transform='translate('+
    (Math.random()*40-20)+'px,'+
    (Math.random()*20-10)+'px) rotate('+
    (Math.random()*16-8)+'deg)';
});

/* Birthday cake */
$('blow').addEventListener('click',function(){
  document.querySelectorAll('.flame').forEach(function(f,i){
    setTimeout(function(){
      f.classList.add('out');
    },i*250);
  });

  $('cake').classList.add('party');
  confetti(220);
  setTimeout(function(){
    confetti(120);
  },900);

  $('blow').classList.add('hidden');
  $('blownMsg').classList.remove('hidden');
  $('c2').classList.remove('hidden');
});

$('c2').addEventListener('click',function(){
  show('s3');
  confetti(120);
});

/* Birthday wishes */
$('c3').addEventListener('click',function(){
  show('s4');
});

/* Flower selection */
var gifts=document.querySelectorAll('.gift');

gifts.forEach(function(g){
  g.addEventListener('click',function(){
    gifts.forEach(function(x){
      x.classList.remove('sel');
    });

    g.classList.add('sel');
    $('flowerMsg').textContent=g.getAttribute('data-msg');
    $('c4').classList.remove('hidden');
    confetti(60);
  });
});

$('c4').addEventListener('click',function(){
  show('s5');
});

/* Personal letter */
$('c5').addEventListener('click',function(){
  show('s6');
  confetti(250);

  setTimeout(function(){
    confetti(150);
  },1200);
});

/* Replay birthday surprise */
$('replay').addEventListener('click',function(){
  t=0;
  $('tease').textContent='';
  yes.style.transform='';
  $('no').style.transform='';

  document.querySelectorAll('.flame').forEach(function(f){
    f.classList.remove('out');
  });

  $('cake').classList.remove('party');
  $('blow').classList.remove('hidden');
  $('blownMsg').classList.add('hidden');
  $('c2').classList.add('hidden');

  gifts.forEach(function(x){
    x.classList.remove('sel');
  });

  $('flowerMsg').textContent='Tap a bouquet to choose it.';
  $('c4').classList.add('hidden');

  show('s1');
});

})();
