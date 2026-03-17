(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();function O(){const e=document.getElementById("diagram"),t=document.getElementById("codeInput");if(!e||!t){console.error("Editor elements not found");return}async function o(){const s=t.value.trim();if(!s.startsWith("useCase")){e.innerHTML="<div style='color: #666; font-family: sans-serif; padding: 20px;'>Waiting for valid input (Start with 'useCase')...</div>";return}try{const n=await W(s);e.innerHTML=n;const r=e.querySelector("svg");r&&(r.style.width="100%",r.style.height="auto",r.style.display="block")}catch(n){console.error("Render error:",n)}}let i;t.addEventListener("input",()=>{clearTimeout(i),i=setTimeout(o,400)}),t.addEventListener("keydown",s=>{if(s.key==="Tab"){s.preventDefault();const n=t.selectionStart,r=t.selectionEnd,a=t.value;t.value=a.substring(0,n)+"	"+a.substring(r),t.selectionStart=t.selectionEnd=n+1}}),window.downloadSVG=()=>{const s=e.innerHTML,n=new Blob([s],{type:"image/svg+xml"}),r=URL.createObjectURL(n),a=document.createElement("a");a.href=r,a.download="diagram.svg",a.click(),URL.revokeObjectURL(r)},window.downloadPNG=()=>{const s=document.getElementById("diagram");html2canvas(s,{backgroundColor:"#ffffff",scale:2,scrollX:0,scrollY:0}).then(n=>{const r=document.createElement("a");r.download="diagram.png",r.href=n.toDataURL("image/png"),r.click()})},o()}class H{constructor(t="System"){this.title=t,this.actors={},this.system=null,this.externalSystems={},this.usecases={},this.connections=[]}addActor(t,o){this.actors[t]=o||t}setSystem(t){this.system=t}addExternalSystem(t,o){this.externalSystems[t]=o||t}addUseCase(t,o){this.usecases[t]=o||t}addConnection(t,o,i){this.connections.push({from:t.trim(),type:o,to:i.trim()})}inferUseCases(){const t=new Set;this.connections.forEach(o=>{t.add(o.from),t.add(o.to)}),t.forEach(o=>{const i=this.actors.hasOwnProperty(o),s=this.externalSystems.hasOwnProperty(o),n=this.usecases.hasOwnProperty(o);!i&&!s&&!n&&this.addUseCase(o,o)})}}function M(e){const t=new H,o=e.split(`
`);let i=null;for(const s of o){const n=s.trim();if(!n||n==="useCase"||n==="usecaseDiagram"||n.startsWith("#"))continue;if(n.startsWith("system")){const a=n.match(/system\s+"(.+?)"/);a&&t.setSystem(a[1]);continue}if(n==="}"){i=null;continue}if(n.startsWith("actor")){i="actor",b(n.replace(/^actor/,""),t,"actor");continue}if(n.startsWith("usecase")){i="usecase",b(n.replace(/^usecase/,""),t,"usecase");continue}if(n.startsWith("external")){i="external",b(n.replace(/^external/,""),t,"external");continue}const r=/^(include|extend|generalization|dependency|realization|anchor|constraint|containment):/i;if(n.match(r)){const $=n.match(r)[1].toLowerCase();n.split(":")[1].split(";").forEach(f=>{if(f.includes("-->")){const[d,l]=f.split("-->").map(u=>u.trim());d&&l&&t.addConnection(d,$,l)}});continue}if(n.includes("..>")){const a=n.split("..>"),$=a[0].trim(),m=a[1].trim();let f,d="include";if(m.includes(":")){const l=m.split(":");f=l[0].trim(),l[1].toLowerCase().includes("extend")&&(d="extend")}else{const l=m.split(/\s+/);f=l[0].trim(),l[1]&&l[1].toLowerCase().includes("extend")&&(d="extend")}t.addConnection($,d,f);continue}if(n.includes("-->")){const[a,$]=n.split("-->");$.split(";").forEach(m=>{const f=m.trim();f&&t.addConnection(a.trim(),"association",f)});continue}(i==="usecase"||i==="actor"||i==="external")&&b(n,t,i)}return t.inferUseCases(),t}function b(e,t,o){e.split(";").forEach(i=>{const s=i.trim();if(!s||s.includes("-->")||s.includes("..>"))return;const n=s.match(/"(.+?)"\s+as\s+(\w+)/);if(n){const[,r,a]=n;o==="actor"?t.addActor(a,r):o==="external"?t.addExternalSystem(a,r):t.addUseCase(a,r)}else{const r=s.split(/\s+/)[0];r&&(o==="actor"?t.addActor(r,r):o==="external"?t.addExternalSystem(r,r):t.addUseCase(r,r))}})}function X(e){const t=Object.keys(e.usecases),o=Object.keys(e.actors),i=Object.keys(e.externalSystems),s=800,n=s/2,r=220,a=n-r,$=n+r,m=80,f=70,d=70,l=m+f,u={};t.forEach((w,c)=>{u[w]={x:n,y:l+c*d}});const x=(w,c)=>{w.forEach((h,v)=>{const L=e.connections.filter(k=>k.from===h||k.to===h).map(k=>u[k.from===h?k.to:k.from]?.y).filter(k=>k!==void 0);let S=L.length>0?L.reduce((k,C)=>k+C,0)/L.length:l+v*d;u[h]={x:c,y:S}})};x(o,a),x(i,$);const g=t.length*d+f,y=Math.max(m+g+60,600);return{positions:u,width:s,height:y,systemHeight:g,systemTop:m,boundaryWidth:280}}function z(e,t=140){const o=e.split(" ");let i="";const s=[];return o.forEach(n=>{const r=i+n+" ";r.length*7>t&&i.length>0?(s.push(i.trim()),i=n+" "):i=r}),i.trim().length>0&&s.push(i.trim()),s}const p={actor(e,t,o){return`
    <g class="actor">
      <circle cx="${e}" cy="${t-50}" r="6" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <line x1="${e}" y1="${t-44}" x2="${e}" y2="${t-20}" stroke="black" stroke-width="1"/>
      <line x1="${e-15}" y1="${t-35}" x2="${e+15}" y2="${t-35}" stroke="black" stroke-width="1"/>
      <line x1="${e}" y1="${t-20}" x2="${e-15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <line x1="${e}" y1="${t-20}" x2="${e+15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <text x="${e}" y="${t+15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${o}</text>
    </g>
    `},useCase(e,t,o){return`
    <g class="usecase">
      <ellipse cx="${e}" cy="${t}" rx="70" ry="25" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <text x="${e}" y="${t+5}" text-anchor="middle" font-size="11" font-family="Helvetica" font-weight="bold" fill="black">
        ${o}
      </text>
    </g>
    `},systemBoundary(e,t,o,i,s){return`
    <g class="system-boundary">
      <rect x="${e}" y="${t}" width="${o}" height="${i}" fill="#61c1ed" stroke="#000" stroke-width="2"/>
      <text x="${e+o/2}" y="${t+30}" text-anchor="middle" font-size="18" font-family="Helvetica" font-weight="bold">${s}</text>
    </g>
    `},note(e,t,o){return`
    <g class="note">
      <path d="M ${e} ${t} L ${e+80} ${t} L ${e+100} ${t+20} L ${e+100} ${t+60} L ${e} ${t+60} Z" fill="#61c1ed" stroke="black"/>
      <path d="M ${e+80} ${t} L ${e+80} ${t+20} L ${e+100} ${t+20} Z" fill="#ffffff" stroke="black"/>
      <text x="${e+50}" y="${t+35}" text-anchor="middle" font-size="10" font-family="Helvetica" font-weight="bold">${o}</text>
    </g>
    `},dashedOval(e,t,o){return`
    <g class="dashed-oval">
      <ellipse cx="${e}" cy="${t}" rx="70" ry="30" fill="#61c1ed" stroke="black" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="${e}" y="${t+5}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${o}</text>
    </g>
    `},externalSystem(e,t,o){const i=z(o,140),s=40+(i.length-1)*15;return`
  <g class="external-system">
    <rect x="${e}" y="${t}" width="160" height="${s}" fill="#61c1ed" stroke="black"/>
    ${i.map((n,r)=>`<text x="${e+80}" y="${t+20+r*15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${n}</text>`).join("")}
    </g>
    `},connector(e,t,o,i,s,n,r,a){const $=s==="include"||s==="extend",m=$||s==="dependency"||s==="realization"||s==="anchor",f=s==="constraint";if(s==="anchor"){const c=a.notes[n]||a.externalSystems?.[n],h=a.notes[r]||a.externalSystems?.[r];if(!c&&!h)return console.error("Anchor connection only allowed between System/External System and Notes"),""}if(s==="containment"){const c=a.systemBoundary?.id===n,h=a.usecases[r]||a.notes[r];if(!c||!h)return console.error("Containment only allowed from System Boundary to UseCase or Note"),""}let d="none";($||s==="dependency")&&(d="arrow-open"),(s==="generalization"||s==="realization")&&(d="arrow-hollow"),s==="containment"&&(d="arrow-diamond");let l,u,x;if($||["dependency","realization","generalization","containment","constraint"].includes(s)){const c=e+70,h=o+70,v=Math.max(c,h)+60,E=(t+i)/2;l=`M ${c} ${t} Q ${v} ${E} ${h} ${i}`,u=Math.max(c,h)+40,x=(t+i)/2}else{let c=e,h=o;e<o?(c=e,h=o-70):(c=e,h=o+70),l=`M ${c} ${t} L ${h} ${i}`}let y="";return m&&(y='stroke-dasharray="5,5"'),f&&(y='stroke-dasharray="2,2"'),`
      <g class="connector" data-type="${s}">
        <path d="${l}" stroke="black" stroke-width="1.2" fill="none" ${y} marker-end="url(#${d})"/>
        ${$?`
          <text x="${u}" y="${x}" text-anchor="start" font-size="10" font-family="Helvetica" font-style="italic" fill="#000" font-weight="bold">
            «${s}»
          </text>`:""}
      </g>
    `}};function D(e,t){const{positions:o,width:i,height:s,systemHeight:n,systemTop:r,boundaryWidth:a}=t,m=i/2-a/2,f=r;let d="",l="",u="";e.system&&(d+=p.systemBoundary(m,f,a,n,e.system)),e.connections.forEach(g=>{const y=o[g.from],w=o[g.to];!y||!w||(l+=p.connector(y.x,y.y,w.x,w.y,g.type,g.from,g.to,e))});const x=(g,y)=>{Object.keys(g).forEach(w=>{const c=o[w];c&&(y==="usecase"?u+=p.useCase(c.x,c.y,g[w]):y==="external"?u+=p.externalSystem(c.x,c.y,g[w]):y==="actor"&&(u+=p.actor(c.x,c.y,g[w])))})};return x(e.usecases,"usecase"),x(e.externalSystems,"external"),x(e.actors,"actor"),`<svg width="${i}" height="${s}" viewBox="0 0 ${i} ${s}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow-open" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="black" stroke-width="1.2"/>
      </marker>
      
      <marker id="arrow-hollow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
        <path d="M 10 5 L 0 0 L 0 10 Z" fill="white" stroke="black" stroke-width="1"/>
      </marker>

      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" fill="black">
        <polygon points="0 0, 10 3.5, 0 7"/>
      </marker>

      <marker id="arrow-diamond" markerWidth="12" markerHeight="12" refX="12" refY="6" orient="auto">
        <path d="M 0 6 L 6 0 L 12 6 L 6 12 Z" fill="white" stroke="black" stroke-width="1"/>
      </marker>
    </defs>
    ${d} ${l} ${u}
  </svg>`}async function W(e){try{const t=M(e),o=X(t);return D(t,o)}catch(t){return console.error("Diagram Rendering failed:",t),`<svg width="400" height="150" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8fafc" rx="5"/>
      <text x="200" y="75" fill="#ef4444" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">
        Invalid Diagram Syntax: Check your DSL formatting
      </text>
    </svg>`}}O();
