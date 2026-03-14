(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();function $(){const s=document.getElementById("diagram"),t=document.getElementById("codeInput");if(!s||!t){console.error("Editor elements not found");return}async function o(){const e=t.value.trim();if(!e.startsWith("useCase")){s.innerHTML="<div style='color: #666; font-family: sans-serif;'>Waiting for diagram (Start with 'usecaseDiagram')...</div>";return}try{const n=await w(e);s.innerHTML=n;const c=s.querySelector("svg");c&&(c.style.width="100%",c.style.height="auto",c.style.maxWidth="1000px")}catch{}}let r;t.addEventListener("input",()=>{clearTimeout(r),r=setTimeout(o,400)}),t.addEventListener("keydown",e=>{if(e.key==="Tab"){e.preventDefault();const n=t.selectionStart,c=t.selectionEnd,i=t.value;if(e.shiftKey){const a=i.lastIndexOf(`
`,n-1)+1;i.substring(a,a+1)==="	"&&(t.value=i.substring(0,a)+i.substring(a+1),t.selectionStart=Math.max(a,n-1),t.selectionEnd=Math.max(a,c-1))}else t.value=i.substring(0,n)+"	"+i.substring(c),t.selectionStart=t.selectionEnd=n+1}}),window.downloadSVG=()=>{const e=s.innerHTML,n=new Blob([e],{type:"image/svg+xml"}),c=URL.createObjectURL(n),i=document.createElement("a");i.href=c,i.download="diagram.svg",i.click(),URL.revokeObjectURL(c)},window.downloadPNG=()=>{const e=document.getElementById("diagram");if(typeof html2canvas>"u"){alert("html2canvas not loaded");return}html2canvas(e,{backgroundColor:"#ffffff",scale:2}).then(n=>{const c=document.createElement("a");c.download="diagram.png",c.href=n.toDataURL("image/png"),c.click()})},o()}class y{constructor(t="System"){this.title=t,this.actors={},this.system=null,this.usecases={},this.connections=[]}addActor(t,o){this.actors[t]=o||t}setSystem(t){this.system=t}addUseCase(t,o){this.usecases[t]=o||t}addConnection(t,o,r){this.connections.push({from:t,type:o,to:r})}inferUseCases(){const t=new Set;this.connections.forEach(o=>{t.add(o.from),t.add(o.to)}),t.forEach(o=>{this.actors[o]||this.usecases[o]||this.addUseCase(o,o)})}}function p(s){const t=new y,o=s.split(`
`);let r=null;for(const e of o){const n=e.trim();if(!(!n||n==="useCase"||n==="usecaseDiagram")){if(n.startsWith("system")){const c=n.match(/system\s+"(.+?)"/);c&&t.setSystem(c[1]);continue}if(n==="}"){r=null;continue}if(n.startsWith("actor")){r="actor";const c=n.replace(/^actor/,"").split(";");for(const i of c){const a=i.trim();if(!a)continue;const l=a.match(/"(.+?)"\s+as\s+(\w+)/);if(l){const[,d,f]=l;t.addActor(f,d)}}continue}if(n.startsWith("usecase")){r="usecase";const c=n.replace(/^usecase/,"").split(";");for(const i of c){const a=i.trim();if(!a)continue;const l=a.match(/"(.+?)"\s+as\s+(\w+)/);if(l){const[,d,f]=l;t.addUseCase(f,d)}}continue}if(r==="usecase"){const c=n.split(";");for(const i of c){const a=i.trim();if(!a)continue;const l=a.match(/"(.+?)"\s+as\s+(\w+)/);if(l){const[,d,f]=l;t.addUseCase(f,d)}}continue}if(n.includes("..>")){const[c,i]=n.split("..>"),a=i.split(":"),l=a[0].trim();let d="include";a[1]&&(d=a[1].replace(/<<|>>/g,"").trim()),t.addConnection(c.trim(),d,l);continue}if(n.includes("-->")){const[c,i]=n.split("-->");t.addConnection(c.trim(),"association",i.trim());continue}}}return t.inferUseCases(),t}function b(s){const t={};let e=150;return Object.keys(s.actors).forEach((n,c)=>{t[n]={x:120,y:e+c*150}}),Object.keys(s.usecases).forEach((n,c)=>{t[n]={x:450,y:e+c*120}}),t}function x(s,t=140){const o=s.split(" ");let r="";const e=[];return o.forEach(n=>{const c=r+n+" ";c.length*7>t&&r.length>0?(e.push(r.trim()),r=n+" "):r=c}),r.trim().length>0&&e.push(r.trim()),e}const u={actor(s,t,o){return`
    <g class="actor">
      <circle cx="${s}" cy="${t-50}" r="6" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <line x1="${s}" y1="${t-44}" x2="${s}" y2="${t-20}" stroke="black" stroke-width="1"/>
      <line x1="${s-15}" y1="${t-35}" x2="${s+15}" y2="${t-35}" stroke="black" stroke-width="1"/>
      <line x1="${s}" y1="${t-20}" x2="${s-15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <line x1="${s}" y1="${t-20}" x2="${s+15}" y2="${t-5}" stroke="black" stroke-width="1"/>
      <text x="${s}" y="${t+15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${o}</text>
    </g>
    `},useCase(s,t,o){return`
    <g class="usecase">
      <ellipse cx="${s}" cy="${t}" rx="${120/2+20}" ry="35" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <text x="${s}" y="${t+5}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold" fill="black" style="pointer-events:none;">
        ${o}
      </text>
    </g>
    `},systemBoundary(s,t,o,r,e){return`
    <g class="system-boundary">
      <rect x="${s}" y="${t}" width="${o}" height="${r}" fill="#61c1ed" stroke="#000"/>
      <text x="${s+o/2}" y="${t+25}" text-anchor="middle" font-size="16" font-family="Helvetica" font-weight="bold">${e}</text>
    </g>
    `},note(s,t,o){return`
    <g class="note">
      <path d="M ${s} ${t} L ${s+80} ${t} L ${s+100} ${t+20} L ${s+100} ${t+60} L ${s} ${t+60} Z" fill="#61c1ed" stroke="black"/>
      <path d="M ${s+80} ${t} L ${s+80} ${t+20} L ${s+100} ${t+20} Z" fill="#ffffff" stroke="black"/>
      <text x="${s+50}" y="${t+35}" text-anchor="middle" font-size="10" font-family="Helvetica" font-weight="bold">${o}</text>
    </g>
    `},dashedOval(s,t,o){return`
    <g class="dashed-oval">
      <ellipse cx="${s}" cy="${t}" rx="70" ry="30" fill="#61c1ed" stroke="black" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="${s}" y="${t+5}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${o}</text>
    </g>
    `},externalSystem(s,t,o){const r=x(o,140),e=40+(r.length-1)*15;return`
  <g class="external-system">
    <rect x="${s}" y="${t}" width="160" height="${e}" fill="#61c1ed" stroke="black"/>
    ${r.map((n,c)=>`<text x="${s+80}" y="${t+20+c*15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${n}</text>`).join("")}
    </g>
    `},connector(s,t,o,r,e){const n=(s+o)/2,c=(t+r)/2,i=o-s,a=r-t,l=Math.sqrt(i*i+a*a),d=25,f=n-a/l*d,m=c+i/l*d,h=e?`&laquo;${e}&raquo;`:"";return`
      <g class="connector">
        <line x1="${s}" y1="${t}" x2="${o}" y2="${r}" stroke="black" stroke-width="2" ${e==="include"||e==="extend"?'stroke-dasharray="5,5"':""} marker-end="url(#arrowhead)"/>
        ${h?`<text x="${f}" y="${m}" text-anchor="middle" font-size="12" font-weight="bold" fill="black">${h}</text>`:""}
      </g>
    `}};function k(s,t){let o="";return s.system&&(o+=u.systemBoundary(300,80,400,350,s.system)),Object.keys(s.usecases).forEach(r=>{const e=t[r];e&&(o+=u.useCase(e.x,e.y,s.usecases[r]))}),Object.keys(s.actors).forEach(r=>{const e=t[r];e&&(o+=u.actor(e.x,e.y,s.actors[r]))}),s.connections.forEach(r=>{const e=t[r.from],n=t[r.to];if(!e||!n)return;const c=n.x-e.x,i=n.y-e.y,a=Math.sqrt(c*c+i*i),l=80,d=35,f=e.x+c/a*l,m=e.y+i/a*d,h=n.x-c/a*l,g=n.y-i/a*d;o+=u.connector(f,m,h,g,r.type)}),Object.keys(s.usecases).forEach(r=>{const e=t[r];e&&(o+=u.useCase(e.x,e.y,s.usecases[r]))}),Object.keys(s.actors).forEach(r=>{const e=t[r];e&&(o+=u.actor(e.x,e.y,s.actors[r]))}),`<svg width="900" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7"/>
      </marker>
    </defs>
    ${o}
  </svg>`}async function w(s){try{const t=p(s),o=b(t);return k(t,o)}catch(t){return console.error("Diagram Rendering failed:",t),`<svg width="300" height="100">
      <text x="10" y="50" fill="red" font-family="sans-serif">
      Invalid Diagram Syntax
      </text>
    </svg>`}}$();
