(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function C(){const e=document.getElementById("diagram"),t=document.getElementById("codeInput");if(!e||!t){console.error("Editor elements not found");return}async function n(){const o=t.value.trim();if(!o.startsWith("useCase")){e.innerHTML="<div style='color: #666; font-family: sans-serif; padding: 20px;'>Waiting for valid input (Start with 'useCase')...</div>";return}try{const s=await W(o);e.innerHTML=s;const r=e.querySelector("svg");r&&(r.style.width="100%",r.style.height="auto",r.style.display="block")}catch(s){console.error("Render error:",s)}}let c;t.addEventListener("input",()=>{clearTimeout(c),c=setTimeout(n,400)}),t.addEventListener("keydown",o=>{if(o.key==="Tab"){o.preventDefault();const s=t.selectionStart,r=t.selectionEnd,i=t.value;t.value=i.substring(0,s)+"	"+i.substring(r),t.selectionStart=t.selectionEnd=s+1}}),window.downloadSVG=()=>{const o=e.innerHTML,s=new Blob([o],{type:"image/svg+xml"}),r=URL.createObjectURL(s),i=document.createElement("a");i.href=r,i.download="diagram.svg",i.click(),URL.revokeObjectURL(r)},window.downloadPNG=()=>{const o=document.getElementById("diagram");html2canvas(o,{backgroundColor:"#ffffff",scale:2,scrollX:0,scrollY:0}).then(s=>{const r=document.createElement("a");r.download="diagram.png",r.href=s.toDataURL("image/png"),r.click()})},n()}class O{constructor(t="System"){this.title=t,this.actors={},this.system=null,this.externalSystems={},this.usecases={},this.connections=[]}addActor(t,n){this.actors[t]=n||t}setSystem(t){this.system=t}addExternalSystem(t,n){this.externalSystems[t]=n||t}addUseCase(t,n){this.usecases[t]=n||t}addConnection(t,n,c){this.connections.push({from:t.trim(),type:n,to:c.trim()})}inferUseCases(){const t=new Set;this.connections.forEach(n=>{t.add(n.from),t.add(n.to)}),t.forEach(n=>{const c=this.actors.hasOwnProperty(n),o=this.externalSystems.hasOwnProperty(n),s=this.usecases.hasOwnProperty(n);!c&&!o&&!s&&this.addUseCase(n,n)})}}function H(e){const t=new O,n=e.split(`
`);let c=null;for(const o of n){const s=o.trim();if(!(!s||s==="useCase"||s==="usecaseDiagram")){if(s.startsWith("system")){const r=s.match(/system\s+"(.+?)"/);r&&t.setSystem(r[1]);continue}if(s==="}"){c=null;continue}if(s.startsWith("actor")){c="actor";const r=s.replace(/^actor/,"").split(";");for(const i of r){const a=i.trim();if(!a)continue;const l=a.match(/"(.+?)"\s+as\s+(\w+)/);if(l){const[,d,u]=l;t.addActor(u,d)}}continue}if(s.startsWith("usecase")){c="usecase";const r=s.replace(/^usecase/,"").split(";");for(const i of r){const a=i.trim();if(!a)continue;const l=a.match(/"(.+?)"\s+as\s+(\w+)/);if(l){const[,d,u]=l;t.addUseCase(u,d)}}continue}if(c==="usecase"){const r=s.split(";");for(const i of r){const a=i.trim();if(!a)continue;const l=a.match(/"(.+?)"\s+as\s+(\w+)/);if(l){const[,d,u]=l;t.addUseCase(u,d)}}continue}if(s.startsWith("external")){s.replace(/^external/,"").split(";").forEach(i=>{const a=i.trim().match(/"(.+?)"\s+as\s+(\w+)/);a&&t.addExternalSystem(a[2],a[1])});continue}if(s.includes("..>")){const[r,i]=s.split("..>"),a=i.split(":"),l=a[0].trim();let d="include";a[1]&&(d=a[1].replace(/<<|>>/g,"").trim()),t.addConnection(r.trim(),d,l);continue}if(s.includes("-->")){const[r,i]=s.split("-->");i.split(";").forEach(l=>{const d=l.trim();d&&t.addConnection(r.trim(),"association",d)});continue}}}return t.inferUseCases(),t}function U(e){const t=Object.keys(e.usecases),n=Object.keys(e.actors),c=Object.keys(e.externalSystems),o=800,s=o/2,r=220,i=s-r,a=s+r,l=80,d=70,u=70,x=l+d,p={};t.forEach((f,h)=>{p[f]={x:s,y:x+h*u}});const w=(f,h)=>{f.forEach(($,v)=>{const b=e.connections.filter(y=>y.from===$||y.to===$).map(y=>p[y.from===$?y.to:y.from]?.y).filter(y=>y!==void 0);let L=b.length>0?b.reduce((y,S)=>y+S,0)/b.length:x+v*u;p[$]={x:h,y:L}})};w(n,i),w(c,a);const m=t.length*u+d,g=Math.max(l+m+60,600);return{positions:p,width:o,height:g,systemHeight:m,systemTop:l,boundaryWidth:280}}function T(e,t=140){const n=e.split(" ");let c="";const o=[];return n.forEach(s=>{const r=c+s+" ";r.length*7>t&&c.length>0?(o.push(c.trim()),c=s+" "):c=r}),c.trim().length>0&&o.push(c.trim()),o}const k={actor(e,t,n){return`
    <g class="actor">
      <circle cx="${e}" cy="${t-50}" r="6" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <line x1="${e}" y1="${t-44}" x2="${e}" y2="${t-20}" stroke="black" stroke-width="1"/>
      <line x1="${e-15}" y1="${t-35}" x2="${e+15}" y2="${t-35}" stroke="black" stroke-width="1"/>
      <line x1="${e}" y1="${t-20}" x2="${e-15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <line x1="${e}" y1="${t-20}" x2="${e+15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <text x="${e}" y="${t+15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${n}</text>
    </g>
    `},useCase(e,t,n){return`
    <g class="usecase">
      <ellipse cx="${e}" cy="${t}" rx="70" ry="25" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <text x="${e}" y="${t+5}" text-anchor="middle" font-size="11" font-family="Helvetica" font-weight="bold" fill="black">
        ${n}
      </text>
    </g>
    `},systemBoundary(e,t,n,c,o){return`
    <g class="system-boundary">
      <rect x="${e}" y="${t}" width="${n}" height="${c}" fill="#61c1ed" stroke="#000" stroke-width="2"/>
      <text x="${e+n/2}" y="${t+30}" text-anchor="middle" font-size="18" font-family="Helvetica" font-weight="bold">${o}</text>
    </g>
    `},note(e,t,n){return`
    <g class="note">
      <path d="M ${e} ${t} L ${e+80} ${t} L ${e+100} ${t+20} L ${e+100} ${t+60} L ${e} ${t+60} Z" fill="#61c1ed" stroke="black"/>
      <path d="M ${e+80} ${t} L ${e+80} ${t+20} L ${e+100} ${t+20} Z" fill="#ffffff" stroke="black"/>
      <text x="${e+50}" y="${t+35}" text-anchor="middle" font-size="10" font-family="Helvetica" font-weight="bold">${n}</text>
    </g>
    `},dashedOval(e,t,n){return`
    <g class="dashed-oval">
      <ellipse cx="${e}" cy="${t}" rx="70" ry="30" fill="#61c1ed" stroke="black" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="${e}" y="${t+5}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${n}</text>
    </g>
    `},externalSystem(e,t,n){const c=T(n,140),o=40+(c.length-1)*15;return`
  <g class="external-system">
    <rect x="${e}" y="${t}" width="160" height="${o}" fill="#61c1ed" stroke="black"/>
    ${c.map((s,r)=>`<text x="${e+80}" y="${t+20+r*15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${s}</text>`).join("")}
    </g>
    `},connector(e,t,n,c,o){const r=e<n?n-60:n+60;return`    
    <g class="connector">
      <path d="${`M ${e} ${t} L ${r} ${t} L ${r} ${c} L ${n} ${c}`}" stroke="black" stroke-width="1.5" fill="none" ${o==="include"||o==="extend"?'stroke-dasharray="4,4"':""} marker-end="url(#arrowhead)"/>
    </g>
    `}};function D(e,t){const{positions:n,width:c,height:o,systemHeight:s,systemTop:r,boundaryWidth:i}=t,l=c/2-i/2,d=r;let u="",x="",p="";e.system&&(u+=k.systemBoundary(l,d,i,s,e.system)),e.connections.forEach(m=>{const g=n[m.from],f=n[m.to];if(!g||!f)return;const h=0,$=g.x<f.x,v=g.x+($?40:-40),E=g.y+h,b=f.x+($?-70:70),L=f.y;x+=k.connector(v,E,b,L,m.type)});const w=(m,g)=>{Object.keys(m).forEach(f=>{const h=n[f];h&&(g==="usecase"?p+=k.useCase(h.x,h.y,m[f]):g==="external"?p+=k.externalSystem(h.x,h.y,m[f]):g==="actor"&&(p+=k.actor(h.x,h.y,m[f])))})};return w(e.usecases,"usecase"),w(e.externalSystems,"external"),w(e.actors,"actor"),`<svg width="${c}" height="${o}" viewBox="0 0 ${c} ${o}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" fill="black">
        <polygon points="0 0, 10 3.5, 0 7"/>
      </marker>
    </defs>
    ${u} ${x} ${p}
  </svg>`}async function W(e){try{const t=H(e),n=U(t);return D(t,n)}catch(t){return console.error("Diagram Rendering failed:",t),`<svg width="400" height="150" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8fafc" rx="5"/>
      <text x="200" y="75" fill="#ef4444" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">
        Invalid Diagram Syntax: Check your DSL formatting
      </text>
    </svg>`}}C();
