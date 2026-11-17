(function(){
  var top=document.getElementById('top'),b=document.querySelector('.burger'),panel=document.getElementById('panel');
  function zamknij(){b.setAttribute('aria-expanded','false');panel.classList.remove('otw');top.classList.remove('otw');document.body.style.overflow=''}
  b.addEventListener('click',function(){if(b.getAttribute('aria-expanded')==='true'){zamknij()}else{b.setAttribute('aria-expanded','true');panel.classList.add('otw');top.classList.add('otw');document.body.style.overflow='hidden'}});
  panel.querySelectorAll('a').forEach(function(a){a.addEventListener('click',zamknij)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('otw'))zamknij()});

  // naglowek jasny po zjechaniu z pierwszego ekranu
  var hero=document.getElementById('start');
  function naglowek(){top.classList.toggle('jasny',window.scrollY>hero.offsetHeight-top.offsetHeight-10)}

  // pasek dolny po przewinieciu za przycisk w hero
  var mob=document.getElementById('mob'),cta=document.getElementById('cta-hero');
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(e){mob.classList.toggle('widac',!e[0].isIntersecting&&e[0].boundingClientRect.top<0)}).observe(cta);
  }

  // aktywna pozycja menu
  var ids=['oferta','badanie','o-nas','wspolpraca','blog','kontakt'],sek=ids.map(function(i){return document.getElementById(i)});
  var linki=document.querySelectorAll('.menu a, .panel > a'),tops=[],czeka=false;
  function mierz(){tops=sek.map(function(s){return s.getBoundingClientRect().top+window.scrollY})}
  function akt(){czeka=false;naglowek();mierz();var y=window.scrollY+window.innerHeight*.4,id='';sek.forEach(function(s,i){if(tops[i]<=y)id=s.id});linki.forEach(function(a){a.classList.toggle('on',!!id&&a.getAttribute('href')==='#'+id)})}
  window.addEventListener('scroll',function(){if(!czeka){czeka=true;requestAnimationFrame(akt)}},{passive:true});
  window.addEventListener('resize',function(){requestAnimationFrame(akt)});
  window.addEventListener('load',function(){mierz();akt()});
  naglowek();

  // wybor uslugi w formularzu
  var sel=document.getElementById('usluga');
  document.querySelectorAll('[data-usluga]').forEach(function(a){a.addEventListener('click',function(){sel.value=a.dataset.usluga})});

  // pas artykulow: przeciaganie mysza + strzalki
  document.querySelectorAll('.pas').forEach(function(p){
    var start=0,sl=0,ciag=false,ruch=0;
    p.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;ruch=0;start=e.clientX;sl=p.scrollLeft;p.classList.add('ciag')});
    window.addEventListener('pointermove',function(e){if(!ciag)return;var d=e.clientX-start;ruch=Math.max(ruch,Math.abs(d));p.scrollLeft=sl-d});
    window.addEventListener('pointerup',function(){if(!ciag)return;ciag=false;p.classList.remove('ciag');var f=p.firstElementChild;if(f){var w=f.offsetWidth+20;p.scrollTo({left:Math.round(p.scrollLeft/w)*w,behavior:'smooth'})}});
    p.addEventListener('click',function(e){if(ruch>6){e.stopPropagation();e.preventDefault();ruch=0}},true);
    p.addEventListener('dragstart',function(e){e.preventDefault()});
  });
  document.querySelectorAll('.strz').forEach(function(s){s.addEventListener('click',function(){var p=document.getElementById(s.dataset.pas),f=p.firstElementChild;p.scrollBy({left:(f.offsetWidth+20)*(+s.dataset.k),behavior:'smooth'})})});

  function strzalki(){document.querySelectorAll('.pas').forEach(function(p){var s=document.querySelector('[data-pas="'+p.id+'"]');if(s)s.parentNode.hidden=p.scrollWidth<=p.clientWidth+4})}
  window.addEventListener('resize',strzalki);strzalki();

  // powiekszanie zdjec
  var lb=document.getElementById('lb'),lbi=lb.querySelector('img'),lbp=lb.querySelector('p'),ostatni=null;
  function otworz(im){ostatni=im;lbi.src=im.dataset.full;lbi.alt=im.alt;lbp.textContent=im.alt;lb.classList.add('otw');document.body.style.overflow='hidden';lb.querySelector('.zamk').focus()}
  document.querySelectorAll('img[data-full]').forEach(function(im){im.addEventListener('click',function(){otworz(im)});im.addEventListener('keydown',function(e){if(e.key==='Enter')otworz(im)})});
  function zamk(){lb.classList.remove('otw');document.body.style.overflow='';lbi.removeAttribute('src');if(ostatni)ostatni.focus()}
  lb.querySelector('.zamk').addEventListener('click',zamk);
  lb.addEventListener('click',function(e){if(e.target===lb)zamk()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('otw'))zamk()});

  // formularz pokazowy
  document.getElementById('form').addEventListener('submit',function(e){e.preventDefault();document.getElementById('info-form').style.display='block'});

  // mapa po przewinieciu
  var m=document.getElementById('mapa');
  function wstaw(){if(m.dataset.ok)return;m.dataset.ok=1;var f=document.createElement('iframe');f.src=m.dataset.src;f.title='Mapa dojazdu do Quantum Audyt, ul. dr. Adama Próchnika 1, Łódź';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f)}
  if('IntersectionObserver' in window){new IntersectionObserver(function(e,o){if(e[0].isIntersecting){wstaw();o.disconnect()}},{rootMargin:'300px'}).observe(m)}else wstaw();

  var r=document.getElementById('rok');if(r)r.textContent=new Date().getFullYear();
})();
