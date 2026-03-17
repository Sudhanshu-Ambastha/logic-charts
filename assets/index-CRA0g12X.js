(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function C(){const e=document.getElementById("diagram"),t=document.getElementById("codeInput");if(!e||!t){console.error("Editor elements not found");return}async function n(){const o=t.value.trim();if(!o.startsWith("useCase")){e.innerHTML="<div style='color: #666; font-family: sans-serif; padding: 20px;'>Waiting for valid input (Start with 'useCase')...</div>";return}try{const s=await U(o);e.innerHTML=s;const r=e.querySelector("svg");r&&(r.style.width="100%",r.style.height="auto",r.style.display="block")}catch(s){console.error("Render error:",s)}}let i;t.addEventListener("input",()=>{clearTimeout(i),i=setTimeout(n,400)}),t.addEventListener("keydown",o=>{if(o.key==="Tab"){o.preventDefault();const s=t.selectionStart,r=t.selectionEnd,a=t.value;t.value=a.substring(0,s)+"	"+a.substring(r),t.selectionStart=t.selectionEnd=s+1}}),window.downloadSVG=()=>{const o=e.innerHTML,s=new Blob([o],{type:"image/svg+xml"}),r=URL.createObjectURL(s),a=document.createElement("a");a.href=r,a.download="diagram.svg",a.click(),URL.revokeObjectURL(r)},window.downloadPNG=()=>{const o=document.getElementById("diagram");html2canvas(o,{backgroundColor:"#ffffff",scale:2,scrollX:0,scrollY:0}).then(s=>{const r=document.createElement("a");r.download="diagram.png",r.href=s.toDataURL("image/png"),r.click()})},n()}class H{constructor(t="System"){this.title=t,this.actors={},this.system=null,this.externalSystems={},this.usecases={},this.connections=[]}addActor(t,n){this.actors[t]=n||t}setSystem(t){this.system=t}addExternalSystem(t,n){this.externalSystems[t]=n||t}addUseCase(t,n){this.usecases[t]=n||t}addConnection(t,n,i){this.connections.push({from:t.trim(),type:n,to:i.trim()})}inferUseCases(){const t=new Set;this.connections.forEach(n=>{t.add(n.from),t.add(n.to)}),t.forEach(n=>{const i=this.actors.hasOwnProperty(n),o=this.externalSystems.hasOwnProperty(n),s=this.usecases.hasOwnProperty(n);!i&&!o&&!s&&this.addUseCase(n,n)})}}function O(e){const t=new H,n=e.split(`
`);let i=null;for(const o of n){const s=o.trim();if(!(!s||s==="useCase"||s==="usecaseDiagram"||s.startsWith("#"))){if(s.startsWith("system")){const r=s.match(/system\s+"(.+?)"/);r&&t.setSystem(r[1]);continue}if(s==="}"){i=null;continue}if(s.startsWith("actor")){i="actor",b(s.replace(/^actor/,""),t,"actor");continue}if(s.startsWith("usecase")){i="usecase",b(s.replace(/^usecase/,""),t,"usecase");continue}if(s.startsWith("external")){i="external",b(s.replace(/^external/,""),t,"external");continue}if(s.match(/^(include|extend|generalization):/i)){const a=s.match(/^(include|extend|generalization):/i)[1].toLowerCase();s.split(":")[1].split(";").forEach(c=>{if(c.includes("-->")){const[h,l]=c.split("-->").map(f=>f.trim());h&&l&&t.addConnection(h,a,l)}});continue}if(s.includes("..>")){const r=s.split("..>"),a=r[0].trim(),u=r[1].trim();let c,h="include";if(u.includes(":")){const l=u.split(":");c=l[0].trim(),l[1].toLowerCase().includes("extend")&&(h="extend")}else{const l=u.split(/\s+/);c=l[0].trim(),l[1]&&l[1].toLowerCase().includes("extend")&&(h="extend")}t.addConnection(a,h,c);continue}if(s.includes("-->")){const[r,a]=s.split("-->");a.split(";").forEach(u=>{const c=u.trim();c&&t.addConnection(r.trim(),"association",c)});continue}(i==="usecase"||i==="actor"||i==="external")&&b(s,t,i)}}return t.inferUseCases(),t}function b(e,t,n){e.split(";").forEach(i=>{const o=i.trim();if(!o||o.includes("-->")||o.includes("..>"))return;const s=o.match(/"(.+?)"\s+as\s+(\w+)/);if(s){const[,r,a]=s;n==="actor"?t.addActor(a,r):n==="external"?t.addExternalSystem(a,r):t.addUseCase(a,r)}else{const r=o.split(/\s+/)[0];r&&(n==="actor"?t.addActor(r,r):n==="external"?t.addExternalSystem(r,r):t.addUseCase(r,r))}})}function M(e){const t=Object.keys(e.usecases),n=Object.keys(e.actors),i=Object.keys(e.externalSystems),o=800,s=o/2,r=220,a=s-r,u=s+r,c=80,h=70,l=70,f=c+h,d={};t.forEach((g,$)=>{d[g]={x:s,y:f+$*l}});const x=(g,$)=>{g.forEach((k,L)=>{const v=e.connections.filter(y=>y.from===k||y.to===k).map(y=>d[y.from===k?y.to:y.from]?.y).filter(y=>y!==void 0);let E=v.length>0?v.reduce((y,S)=>y+S,0)/v.length:f+L*l;d[k]={x:$,y:E}})};x(n,a),x(i,u);const m=t.length*l+h,p=Math.max(c+m+60,600);return{positions:d,width:o,height:p,systemHeight:m,systemTop:c,boundaryWidth:280}}function X(e,t=140){const n=e.split(" ");let i="";const o=[];return n.forEach(s=>{const r=i+s+" ";r.length*7>t&&i.length>0?(o.push(i.trim()),i=s+" "):i=r}),i.trim().length>0&&o.push(i.trim()),o}const w={actor(e,t,n){return`
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
    `},systemBoundary(e,t,n,i,o){return`
    <g class="system-boundary">
      <rect x="${e}" y="${t}" width="${n}" height="${i}" fill="#61c1ed" stroke="#000" stroke-width="2"/>
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
    `},externalSystem(e,t,n){const i=X(n,140),o=40+(i.length-1)*15;return`
  <g class="external-system">
    <rect x="${e}" y="${t}" width="160" height="${o}" fill="#61c1ed" stroke="black"/>
    ${i.map((s,r)=>`<text x="${e+80}" y="${t+20+r*15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${s}</text>`).join("")}
    </g>
    `},connector(e,t,n,i,o){const s=o==="include"||o==="extend",r=o==="generalization";let a="none";(s||o==="dependency")&&(a="arrow-open"),r&&(a="arrow-hollow");let u,c,h;if(s){const f=e+70,d=n+70,x=Math.max(f,d)+60,m=(t+i)/2;u=`M ${f} ${t} Q ${x} ${m} ${d} ${i}`,c=Math.max(f,d)+40,h=(t+i)/2}else{let f=e,d=n;e<n?(f=e,d=n-70):(f=e,d=n+70),u=`M ${f} ${t} L ${d} ${i}`}return`
      <g class="connector">
        <path d="${u}" stroke="black" stroke-width="1.2" fill="none" ${s||o==="dependency"?'stroke-dasharray="5,5"':""} marker-end="url(#${a})"/>
        ${s?`
          <text x="${c}" y="${h}" text-anchor="start" font-size="10" font-family="Helvetica" font-style="italic" fill="#000" font-weight="bold">
            «${o}»
          </text>`:""}
      </g>
    `}};function W(e,t){const{positions:n,width:i,height:o,systemHeight:s,systemTop:r,boundaryWidth:a}=t,c=i/2-a/2,h=r;let l="",f="",d="";e.system&&(l+=w.systemBoundary(c,h,a,s,e.system)),e.connections.forEach(m=>{const p=n[m.from],g=n[m.to];!p||!g||(f+=w.connector(p.x,p.y,g.x,g.y,m.type))});const x=(m,p)=>{Object.keys(m).forEach(g=>{const $=n[g];$&&(p==="usecase"?d+=w.useCase($.x,$.y,m[g]):p==="external"?d+=w.externalSystem($.x,$.y,m[g]):p==="actor"&&(d+=w.actor($.x,$.y,m[g])))})};return x(e.usecases,"usecase"),x(e.externalSystems,"external"),x(e.actors,"actor"),`<svg width="${i}" height="${o}" viewBox="0 0 ${i} ${o}" xmlns="http://www.w3.org/2000/svg">
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
    </defs>
    ${l} ${f} ${d}
  </svg>`}async function U(e){try{const t=O(e),n=M(t);return W(t,n)}catch(t){return console.error("Diagram Rendering failed:",t),`<svg width="400" height="150" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8fafc" rx="5"/>
      <text x="200" y="75" fill="#ef4444" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">
        Invalid Diagram Syntax: Check your DSL formatting
      </text>
    </svg>`}}C();
