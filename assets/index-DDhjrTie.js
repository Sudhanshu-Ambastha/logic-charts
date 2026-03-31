(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();function O(){const o=document.getElementById("diagram"),t=document.getElementById("codeInput");if(!o||!t){console.error("Editor elements not found");return}async function e(){const i=t.value.trim(),s=i.toLowerCase().startsWith("usecase"),n=i.startsWith("cpm"),a=i.startsWith("pert");if(!s&&!n&&!a){o.innerHTML=`
        <div style='color: #8b949e; font-family: "Plus Jakarta Sans", sans-serif; padding: 40px; text-align: center;'>
          <p style='font-weight: 800; font-size: 1.2rem; margin-bottom: 8px;'>🏗️ Sovereign Architect Editor</p>
          <p style='font-size: 0.9em; opacity: 0.7;'>Waiting for valid input (Start with <code>useCase</code>, <code>cpm</code>, or <code>pert</code>)...</p>
        </div>`;return}try{const c=await F(i);o.innerHTML=c;const l=o.querySelector("svg");l&&(l.style.width="100%",l.style.height="auto",l.style.display="block")}catch(c){console.error("Render error:",c),o.innerHTML=`
        <div style="color: #ff4d4d; padding: 20px; font-family: monospace; background: rgba(255,0,0,0.05); border-radius: 8px;">
          <strong>⚠️ Render Error:</strong><br/>
          ${c.message}
        </div>`}}let r;t.addEventListener("input",()=>{clearTimeout(r),r=setTimeout(e,400)}),t.addEventListener("keydown",i=>{if(i.key==="Tab"){i.preventDefault();const s=t.selectionStart,n=t.selectionEnd,a=t.value;t.value=a.substring(0,s)+"	"+a.substring(n),t.selectionStart=t.selectionEnd=s+1}}),window.downloadSVG=()=>{const i=o.innerHTML;if(!i.includes("<svg"))return;const s=new Blob([i],{type:"image/svg+xml"}),n=URL.createObjectURL(s),a=document.createElement("a");a.href=n,a.download="diagram.svg",a.click(),URL.revokeObjectURL(n)},window.downloadPNG=()=>{const i=document.getElementById("diagram");i.innerHTML.includes("<svg")&&html2canvas(i,{backgroundColor:"#ffffff",scale:2,scrollX:0,scrollY:0,useCORS:!0}).then(s=>{const n=document.createElement("a");n.download="diagram.png",n.href=s.toDataURL("image/png"),n.click()})},e()}class z{constructor(t="System"){this.title=t,this.actors={},this.system=null,this.externalSystems={},this.usecases={},this.connections=[]}addActor(t,e){this.actors[t]=e||t}setSystem(t){this.system=t}addExternalSystem(t,e){this.externalSystems[t]=e||t}addUseCase(t,e){this.usecases[t]=e||t}addConnection(t,e,r){this.connections.push({from:t.trim(),type:e,to:r.trim()})}inferUseCases(){const t=new Set;this.connections.forEach(e=>{t.add(e.from),t.add(e.to)}),t.forEach(e=>{const r=this.actors.hasOwnProperty(e),i=this.externalSystems.hasOwnProperty(e),s=this.usecases.hasOwnProperty(e);!r&&!i&&!s&&this.addUseCase(e,e)})}}function H(o){const t=new z,e=o.split(`
`);let r=null;for(const i of e){const s=i.trim();if(!s||s==="useCase"||s==="usecaseDiagram"||s.startsWith("#"))continue;if(s.startsWith("system")){const a=s.match(/system\s+"(.+?)"/);a&&t.setSystem(a[1]);continue}if(s==="}"){r=null;continue}if(s.startsWith("actor")){r="actor",v(s.replace(/^actor/,""),t,"actor");continue}if(s.startsWith("usecase")){r="usecase",v(s.replace(/^usecase/,""),t,"usecase");continue}if(s.startsWith("external")){r="external",v(s.replace(/^external/,""),t,"external");continue}const n=/^(include|extend|generalization|dependency|realization|anchor|constraint|containment):/i;if(s.match(n)){const c=s.match(n)[1].toLowerCase();s.split(":")[1].split(";").forEach(f=>{if(f.includes("-->")){const[h,d]=f.split("-->").map(m=>m.trim());h&&d&&t.addConnection(h,c,d)}});continue}if(s.includes("..>")){const a=s.split("..>"),c=a[0].trim(),l=a[1].trim();let f,h="include";if(l.includes(":")){const d=l.split(":");f=d[0].trim(),d[1].toLowerCase().includes("extend")&&(h="extend")}else{const d=l.split(/\s+/);f=d[0].trim(),d[1]&&d[1].toLowerCase().includes("extend")&&(h="extend")}t.addConnection(c,h,f);continue}if(s.includes("-->")){const[a,c]=s.split("-->");c.split(";").forEach(l=>{const f=l.trim();f&&t.addConnection(a.trim(),"association",f)});continue}(r==="usecase"||r==="actor"||r==="external")&&v(s,t,r)}return t.inferUseCases(),t}function v(o,t,e){o.split(";").forEach(r=>{const i=r.trim();if(!i||i.includes("-->")||i.includes("..>"))return;const s=i.match(/"(.+?)"\s+as\s+(\w+)/);if(s){const[,n,a]=s;e==="actor"?t.addActor(a,n):e==="external"?t.addExternalSystem(a,n):t.addUseCase(a,n)}else{const n=i.split(/\s+/)[0];n&&(e==="actor"?t.addActor(n,n):e==="external"?t.addExternalSystem(n,n):t.addUseCase(n,n))}})}function X(o){const t=Object.keys(o.usecases),e=Object.keys(o.actors),r=Object.keys(o.externalSystems),i=800,s=i/2,n=220,a=s-n,c=s+n,l=80,f=70,h=70,d=l+f,m={};t.forEach((k,u)=>{m[k]={x:s,y:d+u*h}});const y=(k,u)=>{k.forEach((x,b)=>{const E=o.connections.filter(w=>w.from===x||w.to===x).map(w=>m[w.from===x?w.to:w.from]?.y).filter(w=>w!==void 0);let S=E.length>0?E.reduce((w,W)=>w+W,0)/E.length:d+b*h;m[x]={x:u,y:S}})};y(e,a),y(r,c);const g=t.length*h+f,p=Math.max(l+g+60,600);return{positions:m,width:i,height:p,systemHeight:g,systemTop:l,boundaryWidth:280}}function P(o,t=140){const e=o.split(" ");let r="";const i=[];return e.forEach(s=>{const n=r+s+" ";n.length*7>t&&r.length>0?(i.push(r.trim()),r=s+" "):r=n}),r.trim().length>0&&i.push(r.trim()),i}const $={actor(o,t,e){return`
    <g class="actor">
      <circle cx="${o}" cy="${t-50}" r="6" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <line x1="${o}" y1="${t-44}" x2="${o}" y2="${t-20}" stroke="black" stroke-width="1"/>
      <line x1="${o-15}" y1="${t-35}" x2="${o+15}" y2="${t-35}" stroke="black" stroke-width="1"/>
      <line x1="${o}" y1="${t-20}" x2="${o-15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <line x1="${o}" y1="${t-20}" x2="${o+15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <text x="${o}" y="${t+15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${e}</text>
    </g>
    `},useCase(o,t,e){return`
    <g class="usecase">
      <ellipse cx="${o}" cy="${t}" rx="70" ry="25" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <text x="${o}" y="${t+5}" text-anchor="middle" font-size="11" font-family="Helvetica" font-weight="bold" fill="black">
        ${e}
      </text>
    </g>
    `},systemBoundary(o,t,e,r,i){return`
    <g class="system-boundary">
      <rect x="${o}" y="${t}" width="${e}" height="${r}" fill="#61c1ed" stroke="#000" stroke-width="2"/>
      <text x="${o+e/2}" y="${t+30}" text-anchor="middle" font-size="18" font-family="Helvetica" font-weight="bold">${i}</text>
    </g>
    `},note(o,t,e){return`
    <g class="note">
      <path d="M ${o} ${t} L ${o+80} ${t} L ${o+100} ${t+20} L ${o+100} ${t+60} L ${o} ${t+60} Z" fill="#61c1ed" stroke="black"/>
      <path d="M ${o+80} ${t} L ${o+80} ${t+20} L ${o+100} ${t+20} Z" fill="#ffffff" stroke="black"/>
      <text x="${o+50}" y="${t+35}" text-anchor="middle" font-size="10" font-family="Helvetica" font-weight="bold">${e}</text>
    </g>
    `},dashedOval(o,t,e){return`
    <g class="dashed-oval">
      <ellipse cx="${o}" cy="${t}" rx="70" ry="30" fill="#61c1ed" stroke="black" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="${o}" y="${t+5}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${e}</text>
    </g>
    `},externalSystem(o,t,e){const r=P(e,140),i=40+(r.length-1)*15;return`
  <g class="external-system">
    <rect x="${o}" y="${t}" width="160" height="${i}" fill="#61c1ed" stroke="black"/>
    ${r.map((s,n)=>`<text x="${o+80}" y="${t+20+n*15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${s}</text>`).join("")}
    </g>
    `},connector(o,t,e,r,i,s,n,a){const c=i==="include"||i==="extend",l=c||i==="dependency"||i==="realization"||i==="anchor",f=i==="constraint";if(i==="anchor"){const u=a.notes[s]||a.externalSystems?.[s],x=a.notes[n]||a.externalSystems?.[n];if(!u&&!x)return console.error("Anchor connection only allowed between System/External System and Notes"),""}if(i==="containment"){const u=a.systemBoundary?.id===s,x=a.usecases[n]||a.notes[n];if(!u||!x)return console.error("Containment only allowed from System Boundary to UseCase or Note"),""}let h="none";(c||i==="dependency")&&(h="arrow-open"),(i==="generalization"||i==="realization")&&(h="arrow-hollow"),i==="containment"&&(h="arrow-diamond");let d,m,y;if(c||["dependency","realization","generalization","containment","constraint"].includes(i)){const u=o+70,x=e+70,b=Math.max(u,x)+60,C=(t+r)/2;d=`M ${u} ${t} Q ${b} ${C} ${x} ${r}`,m=Math.max(u,x)+40,y=(t+r)/2}else{let u=o,x=e;o<e?(u=o,x=e-70):(u=o,x=e+70),d=`M ${u} ${t} L ${x} ${r}`}let p="";return l&&(p='stroke-dasharray="5,5"'),f&&(p='stroke-dasharray="2,2"'),`
      <g class="connector" data-type="${i}">
        <path d="${d}" stroke="black" stroke-width="1.2" fill="none" ${p} marker-end="url(#${h})"/>
        ${c?`
          <text x="${m}" y="${y}" text-anchor="start" font-size="10" font-family="Helvetica" font-style="italic" fill="#000" font-weight="bold">
            «${i}»
          </text>`:""}
      </g>
    `}};function T(o,t){const{positions:e,width:r,height:i,systemHeight:s,systemTop:n,boundaryWidth:a}=t,l=r/2-a/2,f=n;let h="",d="",m="";o.system&&(h+=$.systemBoundary(l,f,a,s,o.system)),o.connections.forEach(g=>{const p=e[g.from],k=e[g.to];!p||!k||(d+=$.connector(p.x,p.y,k.x,k.y,g.type,g.from,g.to,o))});const y=(g,p)=>{Object.keys(g).forEach(k=>{const u=e[k];u&&(p==="usecase"?m+=$.useCase(u.x,u.y,g[k]):p==="external"?m+=$.externalSystem(u.x,u.y,g[k]):p==="actor"&&(m+=$.actor(u.x,u.y,g[k])))})};return y(o.usecases,"usecase"),y(o.externalSystems,"external"),y(o.actors,"actor"),`<svg width="${r}" height="${i}" viewBox="0 0 ${r} ${i}" xmlns="http://www.w3.org/2000/svg">
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
    ${h} ${d} ${m}
  </svg>`}class j{constructor(){this.activities={}}addActivity(t,e,r=[]){this.activities[t]={id:t,duration:parseFloat(e)||0,predecessors:r.filter(i=>i&&i!=="_"&&i!==""),successors:[],es:0,ef:0,ls:0,lf:0,slack:0,isCritical:!1}}getSortedNodes(){const t=Object.values(this.activities),e=[],r=new Set,i=s=>{if(r.has(s))return;const n=this.activities[s];n&&(n.predecessors.forEach(a=>i(a)),r.add(s),e.push(n))};return t.forEach(s=>i(s.id)),e}calculate(){const t=this.getSortedNodes();t.forEach(r=>{r.successors=[],r.predecessors.forEach(i=>{this.activities[i]&&this.activities[i].successors.push(r.id)})}),t.forEach(r=>{r.predecessors.length===0?r.es=0:r.es=Math.max(...r.predecessors.map(i=>this.activities[i]?.ef||0)),r.ef=r.es+r.duration});const e=t.length>0?Math.max(...t.map(r=>r.ef)):0;[...t].reverse().forEach(r=>{r.successors.length===0?r.lf=e:r.lf=Math.min(...r.successors.map(i=>this.activities[i]?.ls||e)),r.ls=r.lf-r.duration,r.slack=r.lf-r.ef,r.isCritical=Math.abs(r.slack)<.001})}}function Y(o){const t=new j,e=o.split(`
`).map(n=>n.trim()).filter(n=>n&&!n.startsWith("#"));let r=[],i=[],s=[];if(e.forEach(n=>{n.startsWith("activity:")?r=n.replace("activity:","").split(",").map(a=>a.trim()):n.startsWith("duration:")?i=n.replace("duration:","").split(",").map(a=>a.trim()):n.startsWith("predecessor:")&&(s=n.replace("predecessor:","").split(",").map(a=>a.trim()))}),r.length!==i.length)throw new Error("Mismatched activity and duration counts!");return r.forEach((n,a)=>{const c=s[a]?s[a].split(";").map(l=>l.trim()):[];t.addActivity(n,i[a],c)}),t.calculate(),t}function U(o){const t={},e={},r={};o.getSortedNodes().forEach(f=>{let h=0;f.predecessors.length>0&&(h=Math.max(...f.predecessors.map(d=>(r[d]??0)+1))),r[f.id]=h,e[h]||(e[h]=[]),e[h].push(f.id)});const s=220,n=160,a=80,c=80;let l=0;return Object.keys(e).forEach(f=>{const h=e[f];l=Math.max(l,h.length),h.forEach((d,m)=>{t[d]={x:a+f*s,y:c+m*n}})}),{positions:t,width:Object.keys(e).length*s+a*2,height:l*n+c*2}}function D(o,t){const{positions:e,width:r,height:i}=t,s=Object.values(o.activities);let n="",a="";return s.forEach(c=>{c.successors.forEach(l=>{const f=e[c.id],h=e[l];if(!f||!h)return;const d=f.x+120,m=f.y+50,y=h.x,g=h.y+50,p=c.isCritical&&o.activities[l].isCritical;n+=`
        <g class="connector">
          <path d="M ${d} ${m} L ${y} ${g}" 
                stroke="${p?"#ff4d4d":"#4b5563"}" 
                stroke-width="${p?"2.5":"1.5"}" 
                fill="none" 
                marker-end="url(#arrowhead-${p?"critical":"normal"})" />
        </g>`})}),s.forEach(c=>{const l=e[c.id],f=c.isCritical?"#ff4d4d":"#000",h=c.isCritical?"2":"1";a+=`
    <g class="cpm-node" transform="translate(${l.x}, ${l.y})">
      <rect x="0" y="0" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <rect x="40" y="0" width="40" height="30" fill="#e2e8f0" stroke="black" stroke-width="1"/>
      <rect x="80" y="0" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <text x="20" y="20" text-anchor="middle" font-size="11" font-family="monospace">${c.es}</text>
      <text x="60" y="20" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold">${c.duration}</text>
      <text x="100" y="20" text-anchor="middle" font-size="11" font-family="monospace">${c.ef}</text>

      <rect x="0" y="30" width="120" height="40" fill="white" stroke="${f}" stroke-width="${h}"/>
      <text x="60" y="55" text-anchor="middle" font-size="13" font-family="sans-serif" font-weight="800">${c.id}</text>

      <rect x="0" y="70" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <rect x="40" y="70" width="40" height="30" fill="${c.isCritical?"#fee2e2":"#f1f5f9"}" stroke="black" stroke-width="1"/>
      <rect x="80" y="70" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <text x="20" y="90" text-anchor="middle" font-size="11" font-family="monospace">${c.ls}</text>
      <text x="60" y="90" text-anchor="middle" font-size="11" font-family="monospace" fill="${c.isCritical?"red":"black"}">${c.slack}</text>
      <text x="100" y="90" text-anchor="middle" font-size="11" font-family="monospace">${c.lf}</text>
    </g>`}),`
    <svg width="${r}" height="${i}" viewBox="0 0 ${r} ${i}" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`}class N{constructor(){this.events={},this.activities=[]}addActivity(t,e,r,i,s){const n=(r+4*i+s)/6,a=Math.pow((s-r)/6,2);this.activities.push({from:t,to:e,te:n,variance:a}),[t,e].forEach(c=>{this.events[c]||(this.events[c]={id:c,e:0,l:1/0,successors:[],predecessors:[]})}),this.events[t].successors.push({to:e,te:n}),this.events[e].predecessors.push({from:t,te:n})}calculate(){const t=Object.keys(this.events).sort((i,s)=>i-s);t.forEach(i=>{const s=this.events[i];s.predecessors.length===0?s.e=0:s.e=Math.max(...s.predecessors.map(n=>this.events[n.from].e+n.te))});const e=t[t.length-1],r=this.events[e].e;[...t].reverse().forEach(i=>{const s=this.events[i];s.successors.length===0?s.l=r:s.l=Math.min(...s.successors.map(n=>this.events[n.to].l-n.te))})}}function R(o){const t=new N,e=o.split(`
`).map(a=>a.trim()).filter(a=>a&&!a.startsWith("#"));let r=[],i=[],s=[],n=[];return e.forEach(a=>{const c=l=>a.replace(l,"").split(",").map(f=>f.trim());a.startsWith("activity:")?r=c("activity:"):a.startsWith("optimistic:")?i=c("optimistic:"):a.startsWith("likely:")?s=c("likely:"):a.startsWith("pessimistic:")&&(n=c("pessimistic:"))}),r.forEach((a,c)=>{const l=a.split("-").map(f=>f.trim());l.length===2&&t.addActivity(l[0],l[1],parseFloat(i[c]||0),parseFloat(s[c]||0),parseFloat(n[c]||0))}),t.calculate(),t}function B(o){const t={},e={},r={};Object.keys(o.events).sort((f,h)=>parseInt(f)-parseInt(h)).forEach(f=>{const h=o.events[f];let d=0;h.predecessors.length>0&&(d=Math.max(...h.predecessors.map(m=>(r[m.from]??0)+1))),r[f]=d,e[d]||(e[d]=[]),e[d].push(f)});const s=250,n=180,a=100,c=150;let l=0;return Object.keys(e).forEach(f=>{const h=e[f];l=Math.max(l,h.length),h.forEach((d,m)=>{const y=(h.length-1)*n,g=c+l*n/2-y/2;t[d]={x:a+f*s,y:h.length>1?g+m*n:c+l*n/2}})}),{positions:t,width:Object.keys(e).length*s+a*2,height:l*n+c*2}}const L={eventNode:(o,t,e)=>`
    <g class="event-node" transform="translate(${t.x}, ${t.y})">
      <circle cx="0" cy="0" r="${e}" fill="black" stroke="black" stroke-width="2"/>
      <text x="0" y="7" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="sans-serif">${o.id}</text>

      <g transform="translate(-17.5, -85)"> 
        <rect x="0" y="0" width="35" height="25" fill="white" stroke="black" stroke-width="1.5"/>
        <text x="17.5" y="18" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold">${o.e}</text>
        
        <rect x="0" y="25" width="35" height="25" fill="white" stroke="black" stroke-width="1.5"/>
        <text x="17.5" y="43" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold">${o.l}</text>
      </g>
    </g>`,activity:(o,t,e,r,i,s,n,a)=>`
      <g class="activity">
        <path d="M ${o} ${t} L ${e} ${r}" 
              stroke="${s?"#ff4d4d":"#000"}" 
              stroke-width="${s?"3":"1.5"}" 
              fill="none" 
              marker-end="${s?"url(#arrow-pert-crit)":"url(#arrow-pert-norm)"}" />
        <text x="${n}" y="${a}" text-anchor="middle" font-size="14" font-weight="bold" font-family="sans-serif">${i.toFixed(1)}</text>
      </g>`};function A(o,t){const{positions:e,width:r,height:i}=t,s=30;let n="",a="";return o.activities.forEach(c=>{const l=e[c.from],f=e[c.to];if(!l||!f)return;const h=Math.atan2(f.y-l.y,f.x-l.x),d=l.x+s*Math.cos(h),m=l.y+s*Math.sin(h),y=f.x-s*Math.cos(h),g=f.y-s*Math.sin(h),p=Math.abs(o.events[c.from].e+c.te-o.events[c.to].e)<.1&&Math.abs(o.events[c.from].l+c.te-o.events[c.to].l)<.1;n+=L.activity(d,m,y,g,c.te,p,(d+y)/2,(m+g)/2-10)}),Object.values(o.events).forEach(c=>{a+=L.eventNode(c,e[c.id],s)}),`
    <svg width="${r}" height="${i}" viewBox="0 0 ${r} ${i}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-pert-norm" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
        <marker id="arrow-pert-crit" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ff4d4d" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="white" />
      ${n}
      ${a}
    </svg>`}async function F(o){const t=o.trim();try{if(t.startsWith("cpm")){const e=Y(t),r=U(e);return D(e,r)}if(t.startsWith("pert")){const e=R(t),r=B(e);return A(e,r)}if(t.toLowerCase().startsWith("usecase")){const e=H(t),r=X(e);return T(e,r)}return M("Supported types: 'useCase', 'cpm', or 'pert'")}catch(e){return console.error("Rendering failed:",e),M(`Syntax Error: ${e.message}`)}}function M(o){return`
    <svg width="600" height="100" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fff5f5" stroke="#feb2b2" stroke-width="2" rx="8"/>
      <text x="50%" y="50%" fill="#c53030" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle" dominant-baseline="middle">
        ⚠️ ${o}
      </text>
    </svg>`}O();
