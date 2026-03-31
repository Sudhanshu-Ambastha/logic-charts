(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();function W(){const i=document.getElementById("diagram"),t=document.getElementById("codeInput");if(!i||!t){console.error("Editor elements not found");return}async function r(){const e=t.value.trim(),o=e.startsWith("useCase")||e.startsWith("usecase"),n=e.startsWith("cpm");if(!o&&!n){i.innerHTML=`
        <div style='color: #8b949e; font-family: "Plus Jakarta Sans", sans-serif; padding: 40px; text-align: center;'>
          <p style='font-weight: 800; font-size: 1.2rem; margin-bottom: 8px;'>🏗️ Sovereign Architect Editor</p>
          <p style='font-size: 0.9em; opacity: 0.7;'>Waiting for valid input (Start with <code>useCase</code> or <code>cpm</code>)...</p>
        </div>`;return}try{const a=await j(e);i.innerHTML=a;const c=i.querySelector("svg");c&&(c.style.width="100%",c.style.height="auto",c.style.display="block")}catch(a){console.error("Render error:",a),i.innerHTML=`
        <div style="color: #ff4d4d; padding: 20px; font-family: monospace; background: rgba(255,0,0,0.05); border-radius: 8px;">
          <strong>⚠️ Render Error:</strong><br/>
          ${a.message}
        </div>`}}let s;t.addEventListener("input",()=>{clearTimeout(s),s=setTimeout(r,400)}),t.addEventListener("keydown",e=>{if(e.key==="Tab"){e.preventDefault();const o=t.selectionStart,n=t.selectionEnd,a=t.value;t.value=a.substring(0,o)+"	"+a.substring(n),t.selectionStart=t.selectionEnd=o+1}}),window.downloadSVG=()=>{const e=i.innerHTML;if(!e.includes("<svg"))return;const o=new Blob([e],{type:"image/svg+xml"}),n=URL.createObjectURL(o),a=document.createElement("a");a.href=n,a.download="diagram.svg",a.click(),URL.revokeObjectURL(n)},window.downloadPNG=()=>{const e=document.getElementById("diagram");e.innerHTML.includes("<svg")&&html2canvas(e,{backgroundColor:"#ffffff",scale:2,scrollX:0,scrollY:0,useCORS:!0}).then(o=>{const n=document.createElement("a");n.download="diagram.png",n.href=o.toDataURL("image/png"),n.click()})},r()}class z{constructor(t="System"){this.title=t,this.actors={},this.system=null,this.externalSystems={},this.usecases={},this.connections=[]}addActor(t,r){this.actors[t]=r||t}setSystem(t){this.system=t}addExternalSystem(t,r){this.externalSystems[t]=r||t}addUseCase(t,r){this.usecases[t]=r||t}addConnection(t,r,s){this.connections.push({from:t.trim(),type:r,to:s.trim()})}inferUseCases(){const t=new Set;this.connections.forEach(r=>{t.add(r.from),t.add(r.to)}),t.forEach(r=>{const s=this.actors.hasOwnProperty(r),e=this.externalSystems.hasOwnProperty(r),o=this.usecases.hasOwnProperty(r);!s&&!e&&!o&&this.addUseCase(r,r)})}}function O(i){const t=new z,r=i.split(`
`);let s=null;for(const e of r){const o=e.trim();if(!o||o==="useCase"||o==="usecaseDiagram"||o.startsWith("#"))continue;if(o.startsWith("system")){const a=o.match(/system\s+"(.+?)"/);a&&t.setSystem(a[1]);continue}if(o==="}"){s=null;continue}if(o.startsWith("actor")){s="actor",b(o.replace(/^actor/,""),t,"actor");continue}if(o.startsWith("usecase")){s="usecase",b(o.replace(/^usecase/,""),t,"usecase");continue}if(o.startsWith("external")){s="external",b(o.replace(/^external/,""),t,"external");continue}const n=/^(include|extend|generalization|dependency|realization|anchor|constraint|containment):/i;if(o.match(n)){const c=o.match(n)[1].toLowerCase();o.split(":")[1].split(";").forEach(f=>{if(f.includes("-->")){const[l,h]=f.split("-->").map(u=>u.trim());l&&h&&t.addConnection(l,c,h)}});continue}if(o.includes("..>")){const a=o.split("..>"),c=a[0].trim(),d=a[1].trim();let f,l="include";if(d.includes(":")){const h=d.split(":");f=h[0].trim(),h[1].toLowerCase().includes("extend")&&(l="extend")}else{const h=d.split(/\s+/);f=h[0].trim(),h[1]&&h[1].toLowerCase().includes("extend")&&(l="extend")}t.addConnection(c,l,f);continue}if(o.includes("-->")){const[a,c]=o.split("-->");c.split(";").forEach(d=>{const f=d.trim();f&&t.addConnection(a.trim(),"association",f)});continue}(s==="usecase"||s==="actor"||s==="external")&&b(o,t,s)}return t.inferUseCases(),t}function b(i,t,r){i.split(";").forEach(s=>{const e=s.trim();if(!e||e.includes("-->")||e.includes("..>"))return;const o=e.match(/"(.+?)"\s+as\s+(\w+)/);if(o){const[,n,a]=o;r==="actor"?t.addActor(a,n):r==="external"?t.addExternalSystem(a,n):t.addUseCase(a,n)}else{const n=e.split(/\s+/)[0];n&&(r==="actor"?t.addActor(n,n):r==="external"?t.addExternalSystem(n,n):t.addUseCase(n,n))}})}function H(i){const t=Object.keys(i.usecases),r=Object.keys(i.actors),s=Object.keys(i.externalSystems),e=800,o=e/2,n=220,a=o-n,c=o+n,d=80,f=70,l=70,h=d+f,u={};t.forEach((x,m)=>{u[x]={x:o,y:h+m*l}});const k=(x,m)=>{x.forEach((y,v)=>{const E=i.connections.filter($=>$.from===y||$.to===y).map($=>u[$.from===y?$.to:$.from]?.y).filter($=>$!==void 0);let S=E.length>0?E.reduce(($,M)=>$+M,0)/E.length:h+v*l;u[y]={x:m,y:S}})};k(r,a),k(s,c);const p=t.length*l+f,g=Math.max(d+p+60,600);return{positions:u,width:e,height:g,systemHeight:p,systemTop:d,boundaryWidth:280}}function X(i,t=140){const r=i.split(" ");let s="";const e=[];return r.forEach(o=>{const n=s+o+" ";n.length*7>t&&s.length>0?(e.push(s.trim()),s=o+" "):s=n}),s.trim().length>0&&e.push(s.trim()),e}const w={actor(i,t,r){return`
    <g class="actor">
      <circle cx="${i}" cy="${t-50}" r="6" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <line x1="${i}" y1="${t-44}" x2="${i}" y2="${t-20}" stroke="black" stroke-width="1"/>
      <line x1="${i-15}" y1="${t-35}" x2="${i+15}" y2="${t-35}" stroke="black" stroke-width="1"/>
      <line x1="${i}" y1="${t-20}" x2="${i-15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <line x1="${i}" y1="${t-20}" x2="${i+15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <text x="${i}" y="${t+15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${r}</text>
    </g>
    `},useCase(i,t,r){return`
    <g class="usecase">
      <ellipse cx="${i}" cy="${t}" rx="70" ry="25" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <text x="${i}" y="${t+5}" text-anchor="middle" font-size="11" font-family="Helvetica" font-weight="bold" fill="black">
        ${r}
      </text>
    </g>
    `},systemBoundary(i,t,r,s,e){return`
    <g class="system-boundary">
      <rect x="${i}" y="${t}" width="${r}" height="${s}" fill="#61c1ed" stroke="#000" stroke-width="2"/>
      <text x="${i+r/2}" y="${t+30}" text-anchor="middle" font-size="18" font-family="Helvetica" font-weight="bold">${e}</text>
    </g>
    `},note(i,t,r){return`
    <g class="note">
      <path d="M ${i} ${t} L ${i+80} ${t} L ${i+100} ${t+20} L ${i+100} ${t+60} L ${i} ${t+60} Z" fill="#61c1ed" stroke="black"/>
      <path d="M ${i+80} ${t} L ${i+80} ${t+20} L ${i+100} ${t+20} Z" fill="#ffffff" stroke="black"/>
      <text x="${i+50}" y="${t+35}" text-anchor="middle" font-size="10" font-family="Helvetica" font-weight="bold">${r}</text>
    </g>
    `},dashedOval(i,t,r){return`
    <g class="dashed-oval">
      <ellipse cx="${i}" cy="${t}" rx="70" ry="30" fill="#61c1ed" stroke="black" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="${i}" y="${t+5}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${r}</text>
    </g>
    `},externalSystem(i,t,r){const s=X(r,140),e=40+(s.length-1)*15;return`
  <g class="external-system">
    <rect x="${i}" y="${t}" width="160" height="${e}" fill="#61c1ed" stroke="black"/>
    ${s.map((o,n)=>`<text x="${i+80}" y="${t+20+n*15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${o}</text>`).join("")}
    </g>
    `},connector(i,t,r,s,e,o,n,a){const c=e==="include"||e==="extend",d=c||e==="dependency"||e==="realization"||e==="anchor",f=e==="constraint";if(e==="anchor"){const m=a.notes[o]||a.externalSystems?.[o],y=a.notes[n]||a.externalSystems?.[n];if(!m&&!y)return console.error("Anchor connection only allowed between System/External System and Notes"),""}if(e==="containment"){const m=a.systemBoundary?.id===o,y=a.usecases[n]||a.notes[n];if(!m||!y)return console.error("Containment only allowed from System Boundary to UseCase or Note"),""}let l="none";(c||e==="dependency")&&(l="arrow-open"),(e==="generalization"||e==="realization")&&(l="arrow-hollow"),e==="containment"&&(l="arrow-diamond");let h,u,k;if(c||["dependency","realization","generalization","containment","constraint"].includes(e)){const m=i+70,y=r+70,v=Math.max(m,y)+60,C=(t+s)/2;h=`M ${m} ${t} Q ${v} ${C} ${y} ${s}`,u=Math.max(m,y)+40,k=(t+s)/2}else{let m=i,y=r;i<r?(m=i,y=r-70):(m=i,y=r+70),h=`M ${m} ${t} L ${y} ${s}`}let g="";return d&&(g='stroke-dasharray="5,5"'),f&&(g='stroke-dasharray="2,2"'),`
      <g class="connector" data-type="${e}">
        <path d="${h}" stroke="black" stroke-width="1.2" fill="none" ${g} marker-end="url(#${l})"/>
        ${c?`
          <text x="${u}" y="${k}" text-anchor="start" font-size="10" font-family="Helvetica" font-style="italic" fill="#000" font-weight="bold">
            «${e}»
          </text>`:""}
      </g>
    `}};function P(i,t){const{positions:r,width:s,height:e,systemHeight:o,systemTop:n,boundaryWidth:a}=t,d=s/2-a/2,f=n;let l="",h="",u="";i.system&&(l+=w.systemBoundary(d,f,a,o,i.system)),i.connections.forEach(p=>{const g=r[p.from],x=r[p.to];!g||!x||(h+=w.connector(g.x,g.y,x.x,x.y,p.type,p.from,p.to,i))});const k=(p,g)=>{Object.keys(p).forEach(x=>{const m=r[x];m&&(g==="usecase"?u+=w.useCase(m.x,m.y,p[x]):g==="external"?u+=w.externalSystem(m.x,m.y,p[x]):g==="actor"&&(u+=w.actor(m.x,m.y,p[x])))})};return k(i.usecases,"usecase"),k(i.externalSystems,"external"),k(i.actors,"actor"),`<svg width="${s}" height="${e}" viewBox="0 0 ${s} ${e}" xmlns="http://www.w3.org/2000/svg">
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
    ${l} ${h} ${u}
  </svg>`}class T{constructor(){this.activities={}}addActivity(t,r,s=[]){this.activities[t]={id:t,duration:parseFloat(r)||0,predecessors:s.filter(e=>e&&e!=="_"&&e!==""),successors:[],es:0,ef:0,ls:0,lf:0,slack:0,isCritical:!1}}getSortedNodes(){const t=Object.values(this.activities),r=[],s=new Set,e=o=>{if(s.has(o))return;const n=this.activities[o];n&&(n.predecessors.forEach(a=>e(a)),s.add(o),r.push(n))};return t.forEach(o=>e(o.id)),r}calculate(){const t=this.getSortedNodes();t.forEach(s=>{s.successors=[],s.predecessors.forEach(e=>{this.activities[e]&&this.activities[e].successors.push(s.id)})}),t.forEach(s=>{s.predecessors.length===0?s.es=0:s.es=Math.max(...s.predecessors.map(e=>this.activities[e]?.ef||0)),s.ef=s.es+s.duration});const r=t.length>0?Math.max(...t.map(s=>s.ef)):0;[...t].reverse().forEach(s=>{s.successors.length===0?s.lf=r:s.lf=Math.min(...s.successors.map(e=>this.activities[e]?.ls||r)),s.ls=s.lf-s.duration,s.slack=s.lf-s.ef,s.isCritical=Math.abs(s.slack)<.001})}}function U(i){const t=new T,r=i.split(`
`).map(n=>n.trim()).filter(n=>n&&!n.startsWith("#"));let s=[],e=[],o=[];if(r.forEach(n=>{n.startsWith("activity:")?s=n.replace("activity:","").split(",").map(a=>a.trim()):n.startsWith("duration:")?e=n.replace("duration:","").split(",").map(a=>a.trim()):n.startsWith("predecessor:")&&(o=n.replace("predecessor:","").split(",").map(a=>a.trim()))}),s.length!==e.length)throw new Error("Mismatched activity and duration counts!");return s.forEach((n,a)=>{const c=o[a]?o[a].split(";").map(d=>d.trim()):[];t.addActivity(n,e[a],c)}),t.calculate(),t}function D(i){const t={},r={},s={};i.getSortedNodes().forEach(f=>{let l=0;f.predecessors.length>0&&(l=Math.max(...f.predecessors.map(h=>(s[h]??0)+1))),s[f.id]=l,r[l]||(r[l]=[]),r[l].push(f.id)});const o=220,n=160,a=80,c=80;let d=0;return Object.keys(r).forEach(f=>{const l=r[f];d=Math.max(d,l.length),l.forEach((h,u)=>{t[h]={x:a+f*o,y:c+u*n}})}),{positions:t,width:Object.keys(r).length*o+a*2,height:d*n+c*2}}function Y(i,t){const{positions:r,width:s,height:e}=t,o=Object.values(i.activities);let n="",a="";return o.forEach(c=>{c.successors.forEach(d=>{const f=r[c.id],l=r[d];if(!f||!l)return;const h=f.x+120,u=f.y+50,k=l.x,p=l.y+50,g=c.isCritical&&i.activities[d].isCritical;n+=`
        <g class="connector">
          <path d="M ${h} ${u} L ${k} ${p}" 
                stroke="${g?"#ff4d4d":"#4b5563"}" 
                stroke-width="${g?"2.5":"1.5"}" 
                fill="none" 
                marker-end="url(#arrowhead-${g?"critical":"normal"})" />
        </g>`})}),o.forEach(c=>{const d=r[c.id],f=c.isCritical?"#ff4d4d":"#000",l=c.isCritical?"2":"1";a+=`
    <g class="cpm-node" transform="translate(${d.x}, ${d.y})">
      <rect x="0" y="0" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <rect x="40" y="0" width="40" height="30" fill="#e2e8f0" stroke="black" stroke-width="1"/>
      <rect x="80" y="0" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <text x="20" y="20" text-anchor="middle" font-size="11" font-family="monospace">${c.es}</text>
      <text x="60" y="20" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold">${c.duration}</text>
      <text x="100" y="20" text-anchor="middle" font-size="11" font-family="monospace">${c.ef}</text>

      <rect x="0" y="30" width="120" height="40" fill="white" stroke="${f}" stroke-width="${l}"/>
      <text x="60" y="55" text-anchor="middle" font-size="13" font-family="sans-serif" font-weight="800">${c.id}</text>

      <rect x="0" y="70" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <rect x="40" y="70" width="40" height="30" fill="${c.isCritical?"#fee2e2":"#f1f5f9"}" stroke="black" stroke-width="1"/>
      <rect x="80" y="70" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <text x="20" y="90" text-anchor="middle" font-size="11" font-family="monospace">${c.ls}</text>
      <text x="60" y="90" text-anchor="middle" font-size="11" font-family="monospace" fill="${c.isCritical?"red":"black"}">${c.slack}</text>
      <text x="100" y="90" text-anchor="middle" font-size="11" font-family="monospace">${c.lf}</text>
    </g>`}),`
    <svg width="${s}" height="${e}" viewBox="0 0 ${s} ${e}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowhead-normal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
        </marker>
        <marker id="arrowhead-critical" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ff4d4d" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="white" />
      ${n}
      ${a}
    </svg>`}async function j(i){const t=i.trim();try{if(t.startsWith("cpm")){const r=U(t),s=D(r);return Y(r,s)}if(t.startsWith("useCase")||t.startsWith("usecase")){const r=O(t),s=H(r);return P(r,s)}return L("Please start your diagram with 'useCase' or 'cpm'")}catch(r){return console.error("Diagram Rendering failed:",r),L(`Syntax Error: ${r.message}`)}}function L(i){return`
    <svg width="500" height="150" viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fff5f5" stroke="#feb2b2" stroke-width="2" rx="8"/>
      <text x="250" y="75" fill="#c53030" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600" text-anchor="middle" dominant-baseline="middle">
        ⚠️ ${i}
      </text>
    </svg>`}W();
