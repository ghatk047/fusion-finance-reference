
(function(){
  // Draggable divider. Width persists so it survives navigation; localStorage
  // can throw on file:// in some browsers, so every access is guarded.
  var grip=document.querySelector('.grip'), root=document.documentElement;
  var MIN=190, MAX=620;
  function store(w){ try{ localStorage.setItem('sideW', w); }catch(e){} }
  try{ var saved=localStorage.getItem('sideW');
       if(saved) root.style.setProperty('--side-w', saved+'px'); }catch(e){}
  if(grip){
    var drag=false;
    function setW(px){
      var w=Math.max(MIN,Math.min(MAX,Math.round(px)));
      root.style.setProperty('--side-w', w+'px'); return w;
    }
    grip.addEventListener('pointerdown',function(e){
      drag=true; grip.setPointerCapture(e.pointerId);
      document.body.classList.add('resizing'); e.preventDefault();
    });
    grip.addEventListener('pointermove',function(e){ if(drag) setW(e.clientX); });
    function end(e){
      if(!drag) return; drag=false;
      document.body.classList.remove('resizing');
      try{ grip.releasePointerCapture(e.pointerId); }catch(_){}
      store(parseInt(getComputedStyle(root).getPropertyValue('--side-w'))||296);
    }
    grip.addEventListener('pointerup',end);
    grip.addEventListener('pointercancel',end);
    grip.addEventListener('dblclick',function(){ store(setW(296)); });
    grip.addEventListener('keydown',function(e){
      var cur=parseInt(getComputedStyle(root).getPropertyValue('--side-w'))||296, step=e.shiftKey?48:16;
      if(e.key==='ArrowLeft'){ store(setW(cur-step)); e.preventDefault(); }
      if(e.key==='ArrowRight'){ store(setW(cur+step)); e.preventDefault(); }
      if(e.key==='Home'){ store(setW(296)); e.preventDefault(); }
    });
  }

  var q=document.getElementById('q'); if(q){
    var items=[].slice.call(document.querySelectorAll('.navi'));
    var groups=[].slice.call(document.querySelectorAll('.navgrp'));
    var nores=document.querySelector('.nores');
    q.addEventListener('input',function(){
      var t=q.value.trim().toLowerCase(), hits=0;
      items.forEach(function(el){
        var m=!t||el.dataset.k.indexOf(t)>-1;
        el.style.display=m?'':'none'; if(m)hits++;
      });
      // Hide an L2 sub-heading when every process beneath it is filtered out,
      // then hide the pillar group when nothing under it survives.
      groups.forEach(function(g){
        var kids=[].slice.call(g.children), head=null, seen=0, vis=0;
        function settle(){ if(head)head.style.display=seen?'':'none'; }
        kids.forEach(function(el){
          if(el.classList.contains('navl2')){ settle(); head=el; seen=0; }
          else if(el.classList.contains('navi')&&el.style.display!=='none'){ seen++; vis++; }
        });
        settle();
        g.style.display=vis?'':'none';
      });
      if(nores)nores.style.display=hits?'none':'block';
    });
    q.addEventListener('keydown',function(e){
      if(e.key==='Escape'){q.value='';q.dispatchEvent(new Event('input'));}
      if(e.key==='Enter'){
        var f=items.filter(function(el){return el.style.display!=='none'})[0];
        if(f)window.location=f.getAttribute('href');
      }
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus();}
    });
  }
  var lb=document.getElementById('lb');
  if(lb){
    document.querySelectorAll('.figwrap img').forEach(function(im){
      im.addEventListener('click',function(){
        lb.querySelector('img').src=im.src; lb.classList.add('on');
      });
    });
    lb.addEventListener('click',function(){lb.classList.remove('on');});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape')lb.classList.remove('on');
    });
  }
  // Centre the active item within whichever container actually scrolls —
  // .side on desktop, .navlist once the mobile disclosure is open.
  // scrollIntoView() would scroll the main document instead, dropping the
  // reader partway down the page.
  var cur=document.querySelector('.navi.on');
  if(cur){
    var sc=[cur.closest('.navlist'),document.querySelector('.side')].filter(function(e){
      return e&&e.scrollHeight>e.clientHeight+4;
    })[0];
    if(sc){
      var r=cur.getBoundingClientRect(), s=sc.getBoundingClientRect();
      sc.scrollTop += (r.top-s.top) - sc.clientHeight/2 + r.height/2;
    }
  }
  // Opening the mobile disclosure should land on the current process.
  var tg=document.getElementById('navtoggle');
  if(tg)tg.addEventListener('change',function(){
    if(!tg.checked)return;
    var a=document.querySelector('.navi.on'), l=document.querySelector('.navlist');
    if(a&&l&&l.scrollHeight>l.clientHeight+4){
      var ar=a.getBoundingClientRect(), lr=l.getBoundingClientRect();
      l.scrollTop += (ar.top-lr.top) - l.clientHeight/2 + ar.height/2;
    }
  });
})();
