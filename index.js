import{A as N,S as x,N as M,K as F,a as P}from"./assets/vendor-DVdPKRJn.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))v(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&v(d)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function v(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}})();const X=document.querySelector(".burger-menu"),L=document.querySelector(".mobile-menu-overlay"),_=document.querySelector(".nav-menu-button"),f=document.querySelector(".nav-list");document.querySelector(".navigation");const Q=document.querySelector(".about-info"),Z=document.querySelector(".about-swiper"),ee=document.querySelector(".projects-swiper"),te=document.querySelector(".faq-questions-list"),oe=document.querySelector(".reviews-swiper"),E=document.querySelector(".reviews-list"),g=document.querySelector(".footer-form"),c=document.querySelector(".submit-pop-up"),k=document.querySelector(".tech-stack"),O=window.innerWidth,re={elementClass:"about-item",triggerClass:"about-info-expand-button",panelClass:"about-panel-wrap",showMultiple:!0},se={elementClass:"faq-question-card",triggerClass:"faq-expand-button",panelClass:"faq-answer",showMultiple:!0};new N(Q,{...re});new N(te,{...se});const b={modules:[M,F],loop:!0,navigation:{nextEl:".about-swiper-button-next"},slidesPerView:2,wrapperClass:"tech-stack",slideClass:"tech-name",keyboard:{enabled:!0,onlyInViewport:!0},oneWayMovement:!0},ne={modules:[M,F],navigation:{nextEl:".project-swiper-controlls-next",prevEl:".project-swiper-controlls-prev"},wrapperClass:"projects-list",slideClass:"project-card",keyboard:{enabled:!0,onlyInViewport:!0},spaceBetween:10},q={modules:[M,F],navigation:{nextEl:".review-swiper-controlls-next",prevEl:".review-swiper-controlls-prev"},wrapperClass:"reviews-list",slideClass:"review-card",keyboard:{enabled:!0,onlyInViewport:!0},spaceBetween:16};let m,p;window.addEventListener("load",()=>{O>767&&(b.slidesPerView=3,q.slidesPerView=2),O>1439&&(T(),b.slidesPerView=6,q.slidesPerView=4),m=new x(Z,{...b}),new x(ee,{...ne}),p=new x(oe,{...q})});window.addEventListener("resize",()=>{const e=window.innerWidth;m&&(e<768&&(V(),m.params.slidesPerView=2),e>767&&(V(),m.params.slidesPerView=3),e>1439&&(T(),m.params.slidesPerView=6),m.update()),p&&(e<768&&(p.params.slidesPerView=1),e>767&&(p.params.slidesPerView=2),e>1439&&(p.params.slidesPerView=4),p.update())});P.defaults.baseURL="https://portfolio-js.b.goit.study/api/";P.get("reviews").then(async function(e){await ie(e.data)}).catch(function(e){console.log(e),E.style.display="none",document.querySelector(".reviews-fetch-error").style.display="block",alert(e)});function T(){k.insertAdjacentHTML("beforeend",`<li class="tech-name"><p>HTML/CSS</p></li>
          <li class="tech-name"><p>JavaScript</p></li>
          <li class="tech-name"><p>React</p></li>
          <li class="tech-name"><p>Node. js</p></li>
          <li class="tech-name"><p>React Native</p></li>
          <li class="tech-name"><p>Soft skills</p></li>`)}function V(){k.innerHTML="",k.insertAdjacentHTML("beforeend",` <li class="tech-name"><p>HTML/CSS</p></li>
          <li class="tech-name"><p>JavaScript</p></li>
          <li class="tech-name"><p>React</p></li>
          <li class="tech-name"><p>Node. js</p></li>
          <li class="tech-name"><p>React Native</p></li>
          <li class="tech-name"><p>Soft skills</p></li>`)}function ie(e){const o=[];e.forEach(l=>{o.push(`<li class="review-card">
        <div class="review-card-wrap"> 
          <img src="${l.avatar_url}" alt="${l.author} photo" class="review-img"/>
          <h3 class="reviewer-name">${l.author}</h3>
          <p class="review-text">${l.review}</p>
        </div>
      </li>`)}),E.innerHTML="",E.insertAdjacentHTML("afterbegin",o.join(""))}X.addEventListener("click",e=>{L.classList.add("is-open"),$()});L.addEventListener("click",e=>{(e.target.nodeName==="A"||e.target.closest("button"))&&(L.classList.remove("is-open"),I())});function $(){const e=window.scrollY;document.body.style.position="fixed",document.body.style.top=`-${e}px`,document.body.style.width="100%",document.body.style.overflowY="scroll",document.body.dataset.scrollY=e}function I(){const e=document.body.dataset.scrollY;document.body.style.position="",document.body.style.top="",document.body.style.width="",document.body.style.overflowY="",document.querySelector("html").style.scrollBehavior="auto",window.scrollTo(0,parseInt(e||"0")),document.querySelector("html").style.scrollBehavior="smooth"}const i={email:"",comment:""},y="feedback-form-state";if(localStorage.getItem(y)){const e=JSON.parse(localStorage.getItem(y));i.email=e.email,i.message=e.message,g.querySelector('input[name="email"]').value=i.email,g.querySelector('input[name="comment"]').value=i.comment}g.addEventListener("input",e=>{e.target.name==="email"&&(i.email=e.target.value),e.target.name==="comment"&&(i.comment=e.target.value),localStorage.setItem(y,JSON.stringify(i))});g.addEventListener("submit",e=>{if(e.preventDefault(),i.email===""||i.comment===""){alert("Fill please all fields");return}P.post("requests",i).then(o=>{le(o.data.title,o.data.message)}).catch(o=>{console.log(o)}),localStorage.removeItem(y),i.email="",i.comment="",g.reset()});function le(e,o){c.querySelector(".submit-pop-up-title").textContent=e,c.querySelector(".submit-pop-up-text").textContent=o,c.classList.add("is-open"),$()}c.addEventListener("click",e=>{(e.target.closest("button")||e.target===c)&&(c.classList.remove("is-open"),I())});document.addEventListener("keydown",e=>{c.classList.contains("is-open")&&e.key==="Escape"&&(c.classList.remove("is-open"),I())});document.addEventListener("click",e=>{e.target===_?f.classList.contains("visually-hidden")?f.classList.remove("visually-hidden"):f.classList.add("visually-hidden"):f.classList.contains("visually-hidden")||f.classList.add("visually-hidden")});const ae=[{x1:"./img/cover-powerpulse@1x.png",x2:"./img/cover-powerpulse@2x.png",alt:"Power Pulse"},{x1:"./img/cover-mimino@1x.png",x2:"./img/cover-mimino@2x.png",alt:"Mimino"},{x1:"./img/cover-ua-artistry@1x.png",x2:"./img/cover-ua-artistry@2x.png",alt:"Ua Artistry"},{x1:"./img/cover-green-harvest@1x.png",x2:"./img/cover-green-harvest@2x.png",alt:"Green Harvest"},{x1:"./img/cover-wallet@1x.png",x2:"./img/cover-wallet@2x.png",alt:"Wallet"},{x1:"./img/cover-chego@1x.png",x2:"./img/cover-chego@2x.png",alt:"Chego"},{x1:"./img/cover-energy-flow@1x.png",x2:"./img/cover-energy-flow@2x.png",alt:"Energy Flow"},{x1:"./img/cover-fruitbox@1x.png",x2:"./img/cover-fruitbox@2x.png",alt:"Fruibox"},{x1:"./img/cover-englishexcellence@1x.png",x2:"./img/cover-englishexcellence@2x.png",alt:"English Excellence"},{x1:"./img/cover-starlight-studio@1x.png",x2:"./img/cover-starlight-studio@2x.png",alt:"Starlight Studio"}],ce=ae.map(({x1:e,x2:o,alt:l})=>`<li class="slide">
    <img src=${e} srcset="${e} 1x, ${o} 2x" alt="${l}"/>
  </li>`).join(""),ue=[document.querySelector(".carousel-from-start-1"),document.querySelector(".carousel-from-start-2"),document.querySelector(".carousel-from-start-3"),document.querySelector(".carousel-from-end-1"),document.querySelector(".carousel-from-end-2")];function de(){for(let e of ue)e.insertAdjacentHTML("beforeend",ce)}de();const C=document.querySelector(".carousel"),w=parseFloat(window.getComputedStyle(C).transitionDuration)*1e3,h=[];function j(){const e=C.children,o=document.querySelector(".covers-container"),l=parseFloat(window.getComputedStyle(C).rowGap),v=parseFloat(window.getComputedStyle(o).width),t=e[0].offsetWidth+l,r=e.length,d=t*r-v;function A(a){let s=0,n=-1;return()=>{s+=n,s<0?s=r-1:s>=r&&(s=0);let u=s*t;u>d&&(u=d-l),a.style.transform=`translateX(${-u}px)`,n*=-1}}function S(a,s){let n=A(a);window.requestAnimationFrame(()=>{n()});const u=setInterval(()=>{n()},s);h.push(u)}function B(a,s){let n=A(a);a.style.transitionDuration="0s",n(),window.requestAnimationFrame(()=>{a.style.transitionDuration=`${s/1e3}s`,n()});const u=setInterval(()=>{n()},s);h.push(u)}const W=document.querySelector(".carousel-from-start-1"),D=document.querySelector(".carousel-from-start-2"),R=document.querySelector(".carousel-from-start-3"),Y=document.querySelector(".carousel-from-end-1"),J=document.querySelector(".carousel-from-end-2"),K={root:null,rootMargin:"0px",threshold:0},U=function(a,s){a.forEach(n=>{n.isIntersecting&&(window.requestAnimationFrame(()=>{S(W,w),S(D,w),S(R,w),B(Y,w),B(J,w)}),s.unobserve(n.target))})},z=new IntersectionObserver(U,K);var G=document.querySelector("#covers");z.observe(G)}function H(){h.forEach(clearInterval),h.length=0}window.addEventListener("resize",()=>{H(),j()});window.addEventListener("orientationchange",()=>{H(),j()});j();
//# sourceMappingURL=index.js.map
