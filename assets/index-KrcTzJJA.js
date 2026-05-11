(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();function O(){const n=document.getElementById("diagram"),t=document.getElementById("codeInput");if(!n||!t){console.error("Editor elements not found");return}async function e(){const r=t.value.trim(),i=r.toLowerCase().startsWith("usecase"),o=r.startsWith("cpm"),a=r.startsWith("pert");if(!i&&!o&&!a){n.innerHTML=`
        <div style='color: #8b949e; font-family: "Plus Jakarta Sans", sans-serif; padding: 40px; text-align: center;'>
          <p style='font-weight: 800; font-size: 1.2rem; margin-bottom: 8px;'>🏗️ Sovereign Architect Editor</p>
          <p style='font-size: 0.9em; opacity: 0.7;'>Waiting for valid input (Start with <code>useCase</code>, <code>cpm</code>, or <code>pert</code>)...</p>
        </div>`;return}try{const c=await F(r);n.innerHTML=c;const f=n.querySelector("svg");f&&(f.style.width="100%",f.style.height="auto",f.style.display="block")}catch(c){console.error("Render error:",c),n.innerHTML=`
        <div style="color: #ff4d4d; padding: 20px; font-family: monospace; background: rgba(255,0,0,0.05); border-radius: 8px;">
          <strong>⚠️ Render Error:</strong><br/>
          ${c.message}
        </div>`}}let s;t.addEventListener("input",()=>{clearTimeout(s),s=setTimeout(e,400)}),t.addEventListener("keydown",r=>{if(r.key==="Tab"){r.preventDefault();const i=t.selectionStart,o=t.selectionEnd,a=t.value;t.value=a.substring(0,i)+"	"+a.substring(o),t.selectionStart=t.selectionEnd=i+1}}),window.downloadSVG=()=>{const r=n.innerHTML;if(!r.includes("<svg"))return;const i=new Blob([r],{type:"image/svg+xml"}),o=URL.createObjectURL(i),a=document.createElement("a");a.href=o,a.download="diagram.svg",a.click(),URL.revokeObjectURL(o)},window.downloadPNG=()=>{const r=document.getElementById("diagram");r.innerHTML.includes("<svg")&&html2canvas(r,{backgroundColor:"#ffffff",scale:2,scrollX:0,scrollY:0,useCORS:!0}).then(i=>{const o=document.createElement("a");o.download="diagram.png",o.href=i.toDataURL("image/png"),o.click()})},e()}class z{constructor(t="System"){this.title=t,this.actors={},this.system=null,this.externalSystems={},this.usecases={},this.connections=[]}addActor(t,e){this.actors[t]=e||t}setSystem(t){this.system=t}addExternalSystem(t,e){this.externalSystems[t]=e||t}addUseCase(t,e){this.usecases[t]=e||t}addConnection(t,e,s){this.connections.push({from:t.trim(),type:e,to:s.trim()})}inferUseCases(){const t=new Set;this.connections.forEach(e=>{t.add(e.from),t.add(e.to)}),t.forEach(e=>{const s=this.actors.hasOwnProperty(e),r=this.externalSystems.hasOwnProperty(e),i=this.usecases.hasOwnProperty(e);!s&&!r&&!i&&this.addUseCase(e,e)})}}function H(n){const t=new z,e=n.split(`
`);let s=null;for(const r of e){const i=r.trim();if(!i||i==="useCase"||i==="usecaseDiagram"||i.startsWith("#"))continue;if(i.startsWith("system")){const a=i.match(/system\s+"(.+?)"/);a&&t.setSystem(a[1]);continue}if(i==="}"){s=null;continue}if(i.startsWith("actor")){s="actor",v(i.replace(/^actor/,""),t,"actor");continue}if(i.startsWith("usecase")){s="usecase",v(i.replace(/^usecase/,""),t,"usecase");continue}if(i.startsWith("external")){s="external",v(i.replace(/^external/,""),t,"external");continue}const o=/^(include|extend|generalization|dependency|realization|anchor|constraint|containment):/i;if(i.match(o)){const c=i.match(o)[1].toLowerCase();i.split(":")[1].split(";").forEach(h=>{if(h.includes("-->")){const[l,d]=h.split("-->").map(u=>u.trim());l&&d&&t.addConnection(l,c,d)}});continue}if(i.includes("..>")){const a=i.split("..>"),c=a[0].trim(),f=a[1].trim();let h,l="include";if(f.includes(":")){const d=f.split(":");h=d[0].trim(),d[1].toLowerCase().includes("extend")&&(l="extend")}else{const d=f.split(/\s+/);h=d[0].trim(),d[1]&&d[1].toLowerCase().includes("extend")&&(l="extend")}t.addConnection(c,l,h);continue}if(i.includes("-->")){const[a,c]=i.split("-->");c.split(";").forEach(f=>{const h=f.trim();h&&t.addConnection(a.trim(),"association",h)});continue}(s==="usecase"||s==="actor"||s==="external")&&v(i,t,s)}return t.inferUseCases(),t}function v(n,t,e){n.split(";").forEach(s=>{const r=s.trim();if(!r||r.includes("-->")||r.includes("..>"))return;const i=r.match(/"(.+?)"\s+as\s+(\w+)/);if(i){const[,o,a]=i;e==="actor"?t.addActor(a,o):e==="external"?t.addExternalSystem(a,o):t.addUseCase(a,o)}else{const o=r.split(/\s+/)[0];o&&(e==="actor"?t.addActor(o,o):e==="external"?t.addExternalSystem(o,o):t.addUseCase(o,o))}})}function P(n){const t=Object.keys(n.usecases),e=Object.keys(n.actors),s=Object.keys(n.externalSystems),r=800,i=r/2,o=220,a=i-o,c=i+o,f=80,h=70,l=70,d=f+h,u={};t.forEach((x,m)=>{u[x]={x:i,y:d+m*l}});const y=(x,m)=>{x.forEach((k,b)=>{const E=n.connections.filter(w=>w.from===k||w.to===k).map(w=>u[w.from===k?w.to:w.from]?.y).filter(w=>w!==void 0);let S=E.length>0?E.reduce((w,W)=>w+W,0)/E.length:d+b*l;u[k]={x:m,y:S}})};y(e,a),y(s,c);const g=t.length*l+h,p=Math.max(f+g+60,600);return{positions:u,width:r,height:p,systemHeight:g,systemTop:f,boundaryWidth:280}}function X(n,t=140){const e=n.split(" ");let s="";const r=[];return e.forEach(i=>{const o=s+i+" ";o.length*7>t&&s.length>0?(r.push(s.trim()),s=i+" "):s=o}),s.trim().length>0&&r.push(s.trim()),r}const $={actor(n,t,e){return`
    <g class="actor">
      <circle cx="${n}" cy="${t-50}" r="6" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <line x1="${n}" y1="${t-44}" x2="${n}" y2="${t-20}" stroke="black" stroke-width="1"/>
      <line x1="${n-15}" y1="${t-35}" x2="${n+15}" y2="${t-35}" stroke="black" stroke-width="1"/>
      <line x1="${n}" y1="${t-20}" x2="${n-15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <line x1="${n}" y1="${t-20}" x2="${n+15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <text x="${n}" y="${t+15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${e}</text>
    </g>
    `},useCase(n,t,e){return`
    <g class="usecase">
      <ellipse cx="${n}" cy="${t}" rx="70" ry="25" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <text x="${n}" y="${t+5}" text-anchor="middle" font-size="11" font-family="Helvetica" font-weight="bold" fill="black">
        ${e}
      </text>
    </g>
    `},systemBoundary(n,t,e,s,r){return`
    <g class="system-boundary">
      <rect x="${n}" y="${t}" width="${e}" height="${s}" fill="#61c1ed" stroke="#000" stroke-width="2"/>
      <text x="${n+e/2}" y="${t+30}" text-anchor="middle" font-size="18" font-family="Helvetica" font-weight="bold">${r}</text>
    </g>
    `},note(n,t,e){return`
    <g class="note">
      <path d="M ${n} ${t} L ${n+80} ${t} L ${n+100} ${t+20} L ${n+100} ${t+60} L ${n} ${t+60} Z" fill="#61c1ed" stroke="black"/>
      <path d="M ${n+80} ${t} L ${n+80} ${t+20} L ${n+100} ${t+20} Z" fill="#ffffff" stroke="black"/>
      <text x="${n+50}" y="${t+35}" text-anchor="middle" font-size="10" font-family="Helvetica" font-weight="bold">${e}</text>
    </g>
    `},dashedOval(n,t,e){return`
    <g class="dashed-oval">
      <ellipse cx="${n}" cy="${t}" rx="70" ry="30" fill="#61c1ed" stroke="black" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="${n}" y="${t+5}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${e}</text>
    </g>
    `},externalSystem(n,t,e){const s=X(e,140),r=40+(s.length-1)*15;return`
  <g class="external-system">
    <rect x="${n}" y="${t}" width="160" height="${r}" fill="#61c1ed" stroke="black"/>
    ${s.map((i,o)=>`<text x="${n+80}" y="${t+20+o*15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${i}</text>`).join("")}
    </g>
    `},connector(n,t,e,s,r,i,o,a){const c=r==="include"||r==="extend",f=c||r==="dependency"||r==="realization"||r==="anchor",h=r==="constraint";if(r==="anchor"){const m=a.notes[i]||a.externalSystems?.[i],k=a.notes[o]||a.externalSystems?.[o];if(!m&&!k)return console.error("Anchor connection only allowed between System/External System and Notes"),""}if(r==="containment"){const m=a.systemBoundary?.id===i,k=a.usecases[o]||a.notes[o];if(!m||!k)return console.error("Containment only allowed from System Boundary to UseCase or Note"),""}let l="none";(c||r==="dependency")&&(l="arrow-open"),(r==="generalization"||r==="realization")&&(l="arrow-hollow"),r==="containment"&&(l="arrow-diamond");let d,u,y;if(c||["dependency","realization","generalization","containment","constraint"].includes(r)){const m=n+70,k=e+70,b=Math.max(m,k)+60,M=(t+s)/2;d=`M ${m} ${t} Q ${b} ${M} ${k} ${s}`,u=Math.max(m,k)+40,y=(t+s)/2}else{let m=n,k=e;n<e?(m=n,k=e-70):(m=n,k=e+70),d=`M ${m} ${t} L ${k} ${s}`}let p="";return f&&(p='stroke-dasharray="5,5"'),h&&(p='stroke-dasharray="2,2"'),`
      <g class="connector" data-type="${r}">
        <path d="${d}" stroke="black" stroke-width="1.2" fill="none" ${p} marker-end="url(#${l})"/>
        ${c?`
          <text x="${u}" y="${y}" text-anchor="start" font-size="10" font-family="Helvetica" font-style="italic" fill="#000" font-weight="bold">
            «${r}»
          </text>`:""}
      </g>
    `}};function T(n,t){const{positions:e,width:s,height:r,systemHeight:i,systemTop:o,boundaryWidth:a}=t,f=s/2-a/2,h=o;let l="",d="",u="";n.system&&(l+=$.systemBoundary(f,h,a,i,n.system)),n.connections.forEach(g=>{const p=e[g.from],x=e[g.to];!p||!x||(d+=$.connector(p.x,p.y,x.x,x.y,g.type,g.from,g.to,n))});const y=(g,p)=>{Object.keys(g).forEach(x=>{const m=e[x];m&&(p==="usecase"?u+=$.useCase(m.x,m.y,g[x]):p==="external"?u+=$.externalSystem(m.x,m.y,g[x]):p==="actor"&&(u+=$.actor(m.x,m.y,g[x])))})};return y(n.usecases,"usecase"),y(n.externalSystems,"external"),y(n.actors,"actor"),`<svg width="${s}" height="${r}" viewBox="0 0 ${s} ${r}" xmlns="http://www.w3.org/2000/svg">
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
    ${l} ${d} ${u}
  </svg>`}class j{constructor(){this.activities={}}addActivity(t,e,s=[]){this.activities[t]={id:t,duration:parseFloat(e)||0,predecessors:s.filter(r=>r&&r!=="_"&&r!==""),successors:[],es:0,ef:0,ls:0,lf:0,slack:0,isCritical:!1}}getSortedNodes(){const t=Object.values(this.activities),e=[],s=new Set,r=new Set,i=o=>{if(r.has(o))return;if(s.has(o))throw new Error(`Cycle detected at activity: ${o}`);const a=this.activities[o];a&&(s.add(o),a.predecessors.forEach(c=>{i(c)}),s.delete(o),r.add(o),e.push(a))};return t.forEach(o=>{r.has(o.id)||i(o.id)}),e}calculate(){const t=this.getSortedNodes();Object.values(this.activities).forEach(s=>s.successors=[]),t.forEach(s=>{s.predecessors.forEach(r=>{this.activities[r]&&(this.activities[r].successors.includes(s.id)||this.activities[r].successors.push(s.id))})}),t.forEach(s=>{s.predecessors.length===0?s.es=0:s.es=Math.max(...s.predecessors.map(r=>this.activities[r]?.ef||0)),s.ef=s.es+s.duration});const e=t.length>0?Math.max(...t.map(s=>s.ef)):0;[...t].reverse().forEach(s=>{s.successors.length===0?s.lf=e:s.lf=Math.min(...s.successors.map(r=>this.activities[r]?.ls??e)),s.ls=s.lf-s.duration,s.slack=s.lf-s.ef,s.isCritical=Math.abs(s.slack)<.001})}}function Y(n){const t=new j,e=n.split(`
`).map(o=>o.trim()).filter(o=>o&&!o.startsWith("#"));let s=[],r=[],i=[];if(e.forEach(o=>{o.startsWith("activity:")?s=o.replace("activity:","").split(",").map(a=>a.trim()):o.startsWith("duration:")?r=o.replace("duration:","").split(",").map(a=>a.trim()):o.startsWith("predecessor:")&&(i=o.replace("predecessor:","").split(",").map(a=>a.trim()))}),s.length!==r.length)throw new Error("Mismatched activity and duration counts!");return s.forEach((o,a)=>{const c=i[a]?i[a].split(";").map(f=>f.trim()):[];t.addActivity(o,r[a],c)}),t.calculate(),t}function N(n){const t={},e={},s={};n.getSortedNodes().forEach(h=>{let l=0;h.predecessors.length>0&&(l=Math.max(...h.predecessors.map(d=>(s[d]??0)+1))),s[h.id]=l,e[l]||(e[l]=[]),e[l].push(h.id)});const i=220,o=160,a=80,c=80;let f=0;return Object.keys(e).forEach(h=>{const l=e[h];f=Math.max(f,l.length),l.forEach((d,u)=>{t[d]={x:a+h*i,y:c+u*o}})}),{positions:t,width:Object.keys(e).length*i+a*2,height:f*o+c*2}}function U(n,t){const{positions:e,width:s,height:r}=t,i=Object.values(n.activities);let o="",a="";return i.forEach(c=>{c.successors.forEach(f=>{const h=e[c.id],l=e[f];if(!h||!l)return;const d=h.x+120,u=h.y+50,y=l.x,g=l.y+50,p=c.isCritical&&n.activities[f].isCritical;o+=`
        <g class="connector">
          <path d="M ${d} ${u} L ${y} ${g}" 
                stroke="${p?"#ff4d4d":"#4b5563"}" 
                stroke-width="${p?"2.5":"1.5"}" 
                fill="none" 
                marker-end="url(#arrowhead-${p?"critical":"normal"})" />
        </g>`})}),i.forEach(c=>{const f=e[c.id],h=c.isCritical?"#ff4d4d":"#000",l=c.isCritical?"2":"1";a+=`
    <g class="cpm-node" transform="translate(${f.x}, ${f.y})">
      <rect x="0" y="0" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <rect x="40" y="0" width="40" height="30" fill="#e2e8f0" stroke="black" stroke-width="1"/>
      <rect x="80" y="0" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <text x="20" y="20" text-anchor="middle" font-size="11" font-family="monospace">${c.es}</text>
      <text x="60" y="20" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold">${c.duration}</text>
      <text x="100" y="20" text-anchor="middle" font-size="11" font-family="monospace">${c.ef}</text>

      <rect x="0" y="30" width="120" height="40" fill="white" stroke="${h}" stroke-width="${l}"/>
      <text x="60" y="55" text-anchor="middle" font-size="13" font-family="sans-serif" font-weight="800">${c.id}</text>

      <rect x="0" y="70" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <rect x="40" y="70" width="40" height="30" fill="${c.isCritical?"#fee2e2":"#f1f5f9"}" stroke="black" stroke-width="1"/>
      <rect x="80" y="70" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <text x="20" y="90" text-anchor="middle" font-size="11" font-family="monospace">${c.ls}</text>
      <text x="60" y="90" text-anchor="middle" font-size="11" font-family="monospace" fill="${c.isCritical?"red":"black"}">${c.slack}</text>
      <text x="100" y="90" text-anchor="middle" font-size="11" font-family="monospace">${c.lf}</text>
    </g>`}),`
    <svg width="${s}" height="${r}" viewBox="0 0 ${s} ${r}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowhead-normal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
        </marker>
        <marker id="arrowhead-critical" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ff4d4d" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="white" />
      ${o}
      ${a}
    </svg>`}class D{constructor(){this.events={},this.activities=[]}addActivity(t,e,s,r,i){const o=(s+4*r+i)/6,a=Math.pow((i-s)/6,2);this.activities.push({from:t,to:e,te:o,variance:a}),[t,e].forEach(c=>{this.events[c]||(this.events[c]={id:c,e:0,l:1/0,successors:[],predecessors:[]})}),this.events[t].successors.push({to:e,te:o}),this.events[e].predecessors.push({from:t,te:o})}calculate(){const t=Object.keys(this.events).sort((r,i)=>r-i);t.forEach(r=>{const i=this.events[r];i.predecessors.length===0?i.e=0:i.e=Math.max(...i.predecessors.map(o=>this.events[o.from].e+o.te))});const e=t[t.length-1],s=this.events[e].e;[...t].reverse().forEach(r=>{const i=this.events[r];i.successors.length===0?i.l=s:i.l=Math.min(...i.successors.map(o=>this.events[o.to].l-o.te))})}}function R(n){const t=new D,e=n.split(`
`).map(a=>a.trim()).filter(a=>a&&!a.startsWith("#"));let s=[],r=[],i=[],o=[];return e.forEach(a=>{const c=f=>a.replace(f,"").split(",").map(h=>h.trim());a.startsWith("activity:")?s=c("activity:"):a.startsWith("optimistic:")?r=c("optimistic:"):a.startsWith("likely:")?i=c("likely:"):a.startsWith("pessimistic:")&&(o=c("pessimistic:"))}),s.forEach((a,c)=>{const f=a.split("-").map(h=>h.trim());f.length===2&&t.addActivity(f[0],f[1],parseFloat(r[c]||0),parseFloat(i[c]||0),parseFloat(o[c]||0))}),t.calculate(),t}function B(n){const t={},e={},s={};Object.keys(n.events).sort((h,l)=>parseInt(h)-parseInt(l)).forEach(h=>{const l=n.events[h];let d=0;l.predecessors.length>0&&(d=Math.max(...l.predecessors.map(u=>(s[u.from]??0)+1))),s[h]=d,e[d]||(e[d]=[]),e[d].push(h)});const i=250,o=180,a=100,c=150;let f=0;return Object.keys(e).forEach(h=>{const l=e[h];f=Math.max(f,l.length),l.forEach((d,u)=>{const y=(l.length-1)*o,g=c+f*o/2-y/2;t[d]={x:a+h*i,y:l.length>1?g+u*o:c+f*o/2}})}),{positions:t,width:Object.keys(e).length*i+a*2,height:f*o+c*2}}const C={eventNode:(n,t,e)=>`
    <g class="event-node" transform="translate(${t.x}, ${t.y})">
      <circle cx="0" cy="0" r="${e}" fill="black" stroke="black" stroke-width="2"/>
      <text x="0" y="7" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="sans-serif">${n.id}</text>

      <g transform="translate(-17.5, -85)"> 
        <rect x="0" y="0" width="35" height="25" fill="white" stroke="black" stroke-width="1.5"/>
        <text x="17.5" y="18" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold">${Math.round(n.l)}</text>
        
        <rect x="0" y="25" width="35" height="25" fill="white" stroke="black" stroke-width="1.5"/>
        <text x="17.5" y="43" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold">${Math.round(n.e)}</text>
      </g>
    </g>`,activity:(n,t,e,s,r,i,o,a)=>{const c=i?"#ff4d4d":"#000";return`
      <g class="activity">
        <path d="M ${n} ${t} L ${e} ${s}" stroke="${c}" stroke-width="${i?"3":"1.5"}" fill="none" marker-end="${i?"url(#arrow-pert-crit)":"url(#arrow-pert-norm)"}" />
        <text x="${o}" y="${a}" text-anchor="middle" font-size="14" font-weight="bold" font-family="sans-serif" fill="${c}">${r.toFixed(1)}</text>
      </g>`}};function A(n,t){const{positions:e,width:s,height:r}=t,i=30;let o="",a="";return n.activities.forEach(c=>{const f=n.events[c.from],h=n.events[c.to],l=e[c.from],d=e[c.to];if(!l||!d)return;const u=Math.abs(f.e-f.l)<.1&&Math.abs(h.e-h.l)<.1&&Math.abs(f.e+c.te-h.e)<.1,y=Math.atan2(d.y-l.y,d.x-l.x),g=l.x+i*Math.cos(y),p=l.y+i*Math.sin(y),x=d.x-i*Math.cos(y),m=d.y-i*Math.sin(y);o+=C.activity(g,p,x,m,c.te,u,(g+x)/2,(p+m)/2-12)}),Object.values(n.events).forEach(c=>{a+=C.eventNode(c,e[c.id],i)}),`
    <svg width="${s}" height="${r}" viewBox="0 0 ${s} ${r}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-pert-norm" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
        <marker id="arrow-pert-crit" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ff4d4d" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="white" />
      ${o}
      ${a}
    </svg>`}async function F(n){const t=n.trim();try{if(t.startsWith("cpm")){const e=Y(t),s=N(e);return U(e,s)}if(t.startsWith("pert")){const e=R(t),s=B(e);return A(e,s)}if(t.toLowerCase().startsWith("usecase")){const e=H(t),s=P(e);return T(e,s)}return L("Supported types: 'useCase', 'cpm', or 'pert'")}catch(e){return console.error("Rendering failed:",e),L(`Syntax Error: ${e.message}`)}}function L(n){return`
    <svg width="600" height="100" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fff5f5" stroke="#feb2b2" stroke-width="2" rx="8"/>
      <text x="50%" y="50%" fill="#c53030" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle" dominant-baseline="middle">
        ⚠️ ${n}
      </text>
    </svg>`}O();
