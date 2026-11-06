const $=s=>document.querySelector(s);
const scene=$('#scene'),canvas=$('#reels'),loading=$('#loading');
const environment=document.createElement('div');environment.id='stage-environment';environment.setAttribute('aria-hidden','true');environment.innerHTML='<div class=stage-wall></div><div class=stage-floor></div>';document.querySelector('#experience').prepend(environment);
const glass=document.createElement('div');glass.id='slot-glass';glass.setAttribute('aria-hidden','true');scene.appendChild(glass);
const restArtwork=document.createElement('div');restArtwork.id='rest-artwork';restArtwork.setAttribute('aria-hidden','true');scene.appendChild(restArtwork);
function showRest(k){restArtwork.innerHTML=window.SAOKO_ART.rest(k,slots);restArtwork.hidden=false;}

const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const W=1920,H=1080;
const titles=['Cream & yellow','Pink & blue','Cream & green','Red & cream','Blue & pop'];
const logoColors=['#141412','#1b8dec','#00744e','#df1017','#141412'];
// Exact pixel bounds from the five approved renders; artwork is never stretched.
// One uniform scale: 0.4 px/mm. Printed artwork is never stretched.
const slots=[
 {name:'sign',x:729,y:72,w:472,h:112,aw:1888,ah:448},
 {name:'door',x:310,y:556,w:336,h:434,aw:1008,ah:1302},
 {name:'front',x:656,y:556,w:964,h:434,aw:2892,ah:1302},
 {name:'menu',x:666,y:222,w:200,h:334,aw:800,ah:1336},
 ...[890,1006,1122,1238,1354,1470].map((x,i)=>({name:'card',card:i+1,x,y:250,w:100,h:132,aw:750,ah:990}))
].map((r,i)=>({...r,phase:0,velocity:0,texture:null,delay:i<4?[140,60,180,100][i]:((i-4)%3)*65,duration:i<4?[6100,5350,5850,5550][i]:4400+(i-4)*235}));
// Curved glazing is a fixed, sharp optical layer, independent of moving artwork.
function mountGlazing(){
 glass.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="3840" height="2160" viewBox="0 0 1920 1080"><defs>
 <linearGradient id="glass-depth" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#211b13" stop-opacity=".29"/><stop offset=".075" stop-color="#fff" stop-opacity=".06"/><stop offset=".25" stop-color="#fff" stop-opacity="0"/><stop offset=".72" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#261e13" stop-opacity=".27"/></linearGradient>
 <linearGradient id="glass-side"><stop stop-color="#292317" stop-opacity=".22"/><stop offset=".035" stop-color="#fff1d2" stop-opacity=".4"/><stop offset=".085" stop-color="#fff" stop-opacity=".03"/><stop offset=".86" stop-color="#fff" stop-opacity="0"/><stop offset=".97" stop-color="#ffebc6" stop-opacity=".24"/><stop offset="1" stop-color="#241d13" stop-opacity=".3"/></linearGradient>
 <linearGradient id="glass-glint" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".38"/><stop offset=".5" stop-color="#fff4de" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
 <linearGradient id="bezel" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#272925"/><stop offset=".13" stop-color="#e5e7db"/><stop offset=".32" stop-color="#77776c"/><stop offset=".7" stop-color="#343a39"/><stop offset=".86" stop-color="#e2e4dc"/><stop offset="1" stop-color="#53584f"/></linearGradient>
 </defs>${slots.map((r,i)=>{
 const w=r.w,h=r.h,rx=r.name==='card'?2.3:1.6;
 return `<g transform="translate(${r.x} ${r.y})"><defs><clipPath id="pane-${i}"><rect x="1" y="1" width="${w-2}" height="${h-2}" rx="${rx}"/></clipPath></defs><g clip-path="url(#pane-${i})"><rect width="${w}" height="${h}" fill="url(#glass-depth)"/><rect width="${w}" height="${h}" fill="url(#glass-side)"/><path d="M0 ${h*.085}Q${w*.5} ${-h*.025} ${w} ${h*.085}L${w} ${h*.19}Q${w*.5} ${h*.035} 0 ${h*.19}Z" fill="url(#glass-glint)"/><path d="M${w*.16} 0Q${w*.065} ${h*.5} ${w*.15} ${h}L${w*.19} ${h}Q${w*.11} ${h*.5} ${w*.21} 0Z" fill="#fff3da" opacity=".105"/><path d="M${w*.87} 0Q${w*.93} ${h*.5} ${w*.87} ${h}" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="${Math.max(.65,w*.002)}"/></g><rect x=".8" y=".8" width="${w-1.6}" height="${h-1.6}" rx="${rx}" fill="none" stroke="#172023" stroke-opacity=".6" stroke-width="2.8"/><rect x="1.2" y="1.2" width="${w-2.4}" height="${h-2.4}" rx="${rx}" fill="none" stroke="url(#bezel)" stroke-width="1.7"/><path d="M3 ${h*.045}Q${w*.5} 1.5 ${w-3} ${h*.045}" fill="none" stroke="#fff2d5" stroke-opacity=".55" stroke-width=".8"/><path d="M3 ${h-3}Q${w*.5} ${h-1} ${w-3} ${h-3}" fill="none" stroke="#e8d5af" stroke-opacity=".35" stroke-width=".7"/></g>`;
 }).join('')}</svg>`;
}
function alignEnvironment(){
 const host=document.querySelector('#experience').getBoundingClientRect(),r=scene.getBoundingClientRect();
 const portrait=matchMedia('(max-width:760px) and (orientation:portrait)').matches;
 const top=portrait?r.top-host.top:0;
 environment.style.top=top+'px';environment.style.height=(portrait?r.height:host.height)+'px';
 environment.style.setProperty('--floor-line',(r.top-host.top-top+r.height*1032/1080)+'px');
 environment.style.setProperty('--counter-left',(r.left-host.left+r.width*295/1920)+'px');environment.style.setProperty('--counter-width',(r.width*1340/1920)+'px');
}
new ResizeObserver(alignEnvironment).observe(document.querySelector('#experience'));
window.addEventListener('resize',alignEnvironment);
mountGlazing();alignEnvironment();
let ready=false,busy=false,activeIndex=0,targetIndex=0,animationStart=0,lastFrame=0,raf=0;
let wheelSum=0,lastWheel=-Infinity,touchStart=null;
const presentation=document.querySelector('#presentation');
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.scrollTo({top:0,behavior:'instant'});
let journeyUnlocked=false,releaseAfter=0;
function unlockJourney(){
 if(!presentation)return;
 journeyUnlocked=true;releaseAfter=0;
 document.documentElement.classList.remove('slot-locked');
 document.body.classList.remove('intro-locked');presentation.inert=false;
 document.dispatchEvent(new CustomEvent('saoko:introcomplete'));
}
function replayJourney(){
 if(!presentation||!ready)return;cancelAnimationFrame(raf);raf=0;busy=false;activeIndex=0;targetIndex=0;journeyUnlocked=false;wheelSum=0;touchStart=null;
 slots.forEach(r=>{r.phase=0;r.velocity=0;});window.scrollTo({top:0,behavior:'instant'});document.documentElement.classList.add('slot-locked');document.body.classList.add('intro-locked');presentation.inert=true;draw();showRest(1);updateState();scene.focus({preventScroll:true});$('#status').textContent='Design 1 : Cream & yellow';
}
document.addEventListener('saoko:replay',replayJourney);
document.querySelector('.skip-link')?.addEventListener('click',()=>unlockJourney());
function followSectionLink(){
 const anchor=document.getElementById(location.hash.slice(1));
 if(anchor&&presentation.contains(anchor)){unlockJourney();requestAnimationFrame(()=>anchor.scrollIntoView({behavior:'instant'}));return true;}
 return false;
}
window.addEventListener('hashchange',followSectionLink);
const gl=canvas.getContext('webgl',{alpha:true,antialias:false,premultipliedAlpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
const shaderVS=`attribute vec2 aPosition;varying vec2 uv;void main(){uv=aPosition*.5+.5;gl_Position=vec4(aPosition,0.,1.);}`;
const shaderFS=`precision highp float;
varying vec2 uv;uniform sampler2D atlas;uniform float phase;uniform float speed;uniform vec2 resolution;
vec4 paper(float y){return texture2D(atlas,vec2(uv.x,fract(y)));}
void main(){
 float arc=.96;
 float a=asin(clamp((uv.y*2.-1.)*sin(arc),-.999,.999));
 float bend=smoothstep(.04,.8,abs(speed));
 float strip=phase+.5-mix(uv.y-.5,a/(2.*arc),bend);
 float local=fract(strip),row=mod(mod(floor(strip),5.)+5.,5.);
 float t=(row+local)/5.;
 float blur=min(abs(speed)*.00016,.0019);
 vec4 sampleInk=paper(t)*.4+(paper(t+blur)+paper(t-blur))*.24+(paper(t+blur*2.)+paper(t-blur*2.))*.06;
 vec3 ink=sampleInk.rgb;
 float shade=.75+.25*pow(cos(a),2.);
 float recess=1.-.22*pow(abs(uv.y*2.-1.),18.);
 float seam=smoothstep(0.,.003,local)*smoothstep(0.,.003,1.-local);
 ink*=mix(1.,shade*recess*(.79+.21*seam),bend);
 // Reflections are fixed on the convex glazing, separate from the rotating print.
 float x=uv.x+.018*sin(uv.y*3.14159);
 float reflection=exp(-pow((x-.145)/.045,2.))*.085;
 reflection+=exp(-pow((x-.83)/.09,2.))*.035;
 reflection+=exp(-pow((uv.y-.95)/.014,2.))*.13;
 reflection+=exp(-pow((uv.y-.09)/.022,2.))*.025;
 ink=mix(ink,vec3(1.,.94,.80),reflection*bend);
 vec2 d=min(uv,1.-uv)*resolution;
 float edge=min(d.x,d.y);
 // A narrow machined rim: dark gasket, brushed body and crisp reflected neon.
 float rim=(1.-smoothstep(4.,6.,edge))*bend;
 float grain=fract(sin(dot(floor(uv*resolution),vec2(12.9898,78.233)))*43758.5453);
 float steel=.25+.37*pow(.5+.5*cos(edge*2.7),2.);
 steel+=.2*uv.y+.018*grain;
 vec3 metal=vec3(steel*.98,steel,steel*1.01);
 metal=mix(metal,vec3(.12,.13,.12),smoothstep(3.8,4.8,edge));
 ink=mix(ink,metal,rim);
 gl_FragColor=vec4(ink,mix(sampleInk.a,1.,rim));
}`;
function showError(){restArtwork.hidden=true;loading.classList.add('ready');$('#error').hidden=false;$('#error').textContent='The reels could not start. Keep scrolling to explore the five designs below.';unlockJourney();}
function compile(type,code){const s=gl.createShader(type);gl.shaderSource(s,code);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
let program,uniforms;
function initGL(){
 if(!gl)throw Error('WebGL unavailable');
 program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,shaderVS));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,shaderFS));gl.linkProgram(program);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
 gl.useProgram(program);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 const a=gl.getAttribLocation(program,'aPosition');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
 uniforms={};for(const n of ['atlas','phase','speed','resolution'])uniforms[n]=gl.getUniformLocation(program,n);
 gl.uniform1i(uniforms.atlas,0);gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.clearColor(0,0,0,0);
 canvas.width=3840;canvas.height=2160;scene.dataset.renderSize='3840 × 2160';
}
const cache=new Map();
function image(url){if(!cache.has(url))cache.set(url,new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(Error('Image unavailable: '+url));im.src=window.SAOKO_ASSETS?.[url]||url;}));return cache.get(url);}
async function buildAtlas(slot){
 const max=gl.getParameter(gl.MAX_TEXTURE_SIZE);const scale=Math.min(1,max/(slot.ah*5),max/slot.aw);
 const w=Math.floor(slot.aw*scale),h=Math.floor(slot.ah*scale);
 const c=document.createElement('canvas');c.width=w;c.height=h*5;
 const ctx=c.getContext('2d',{alpha:true});ctx.imageSmoothingQuality='high';
 for(let k=1;k<=5;k++){
  ctx.save();ctx.translate(0,(k-1)*h);
  const im=await image(window.SAOKO_ART.slot(k,slot));
  const sw=im.width,sh=im.height,sx=0,sy=0;
  // Fit uniformly in screen space, then convert to atlas coordinates.
  const factor=Math.min(slot.w/sw,slot.h/sh),dw=sw*factor/slot.w*w,dh=sh*factor/slot.h*h;
  const dx=(w-dw)/2,dy=slot.name==='card'?0:(h-dh)/2;
  if(slot.name!=='card'){
   // Only the unprinted edge material fills surplus space; printed art retains its ratio.
   ctx.drawImage(im,sx+1,sy,1,sh,0,dy,dx+1,dh);
   ctx.drawImage(im,sx+sw-5,sy,1,sh,dx+dw-1,dy,w-dx-dw+1,dh);
   if(dy>0){ctx.drawImage(im,sx,sy,sw,1,0,0,w,dy+1);ctx.drawImage(im,sx,sy+sh-1,sw,1,0,dy+dh-1,w,h-dy-dh+1);}
  }
  ctx.drawImage(im,sx,sy,sw,sh,dx,dy,dw,dh);
  ctx.restore();
 }
 const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);slot.texture=tex;
}
function draw(){
 gl.disable(gl.SCISSOR_TEST);gl.viewport(0,0,canvas.width,canvas.height);gl.clear(gl.COLOR_BUFFER_BIT);gl.enable(gl.SCISSOR_TEST);gl.useProgram(program);
 for(const r of slots){
  const x=Math.round(r.x/W*canvas.width),y=Math.round((H-r.y-r.h)/H*canvas.height),w=Math.round(r.w/W*canvas.width),h=Math.round(r.h/H*canvas.height);
  gl.viewport(x,y,w,h);gl.scissor(x,y,w,h);gl.bindTexture(gl.TEXTURE_2D,r.texture);gl.uniform1f(uniforms.phase,r.phase);gl.uniform1f(uniforms.speed,r.velocity);gl.uniform2f(uniforms.resolution,w,h);gl.drawArrays(gl.TRIANGLES,0,6);
 }
}
// Integral of a motor curve: accelerate, cruise, then a long quadratic brake.
function motor(u){
 const a=.13,b=.25,c=.62,area=a/2+b+c/3;
 if(u<a)return u*u/(2*a)/area;
 if(u<a+b)return (a/2+u-a)/area;
 const s=(u-a-b)/c;return (a/2+b+c*(s-s*s+s*s*s/3))/area;
}
function updateState(){
 scene.dataset.option=String(activeIndex+1);scene.dataset.spinning=String(busy);
 window.saokoState={ready,busy,activeIndex,targetIndex,phases:slots.map(r=>r.phase),resolution:[canvas.width,canvas.height]};
}
function frame(now){
 raf=0;const dt=Math.max(.001,(now-lastFrame)/1000);lastFrame=now;let complete=true;
 for(const r of slots){
  const u=Math.min(1,Math.max(0,(now-animationStart-r.delay)/(reduced?280:r.duration)));
  const before=r.phase;r.phase=r.from+(r.to-r.from)*(reduced?u:motor(u));r.velocity=(r.phase-before)/dt;
  if(u<1)complete=false;else{r.phase=r.to;r.velocity=0;}
 }
 draw();
 if(complete){busy=false;activeIndex=targetIndex;showRest(activeIndex+1);$('#status').textContent=`Design ${activeIndex+1} : ${titles[activeIndex]}`;if(activeIndex===4&&!journeyUnlocked)unlockJourney();}
 updateState();if(!complete)raf=requestAnimationFrame(frame);
}
function advance(direction){
 if(!ready||busy)return false;
 const next=Math.max(0,Math.min(4,activeIndex+direction));if(next===activeIndex)return false;
 targetIndex=next;busy=true;restArtwork.hidden=true;wheelSum=0;animationStart=performance.now();lastFrame=animationStart;
 slots.forEach((r,i)=>{r.from=r.phase;r.to=r.phase+direction*(reduced?1:6+(i%3===0?5:0));});
 $('#status').textContent='The reels are spinning…';updateState();raf=requestAnimationFrame(frame);return true;
}
window.addEventListener('wheel',e=>{
 if(e.ctrlKey)return;const now=performance.now();
 // Once the fifth design settles, this listener must never cancel native scrolling.
 if(presentation&&journeyUnlocked)return;
 e.preventDefault();const quiet=now-lastWheel;lastWheel=now;
 if(busy||!ready){wheelSum=0;return;}
 if(quiet>320)wheelSum=0;
 const d=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
 if(Math.sign(d)!==Math.sign(wheelSum)&&wheelSum!==0)wheelSum=0;
 wheelSum+=d;if(Math.abs(wheelSum)>=32)advance(Math.sign(wheelSum));
},{passive:false});
window.addEventListener('keydown',e=>{
 if(e.repeat)return;
 if(e.target.closest('input,button,a,textarea,select,dialog')||e.target.isContentEditable)return;
 if(presentation&&journeyUnlocked)return;
 if(['ArrowDown','ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();advance(1);}
 if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();advance(-1);}
});
document.querySelector('#experience').addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;touchStart=e.clientY;document.querySelector('#experience').setPointerCapture(e.pointerId);});
document.querySelector('#experience').addEventListener('pointerup',e=>{if(!journeyUnlocked&&touchStart!==null&&Math.abs(touchStart-e.clientY)>35)advance(Math.sign(touchStart-e.clientY));touchStart=null;});
document.querySelector('#experience').addEventListener('pointercancel',()=>{touchStart=null;});
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(raf);busy=false;showError();});
try{
 await window.SAOKO_ART.ready;document.documentElement.style.setProperty('--saoko-wall',`url("${window.SAOKO_ART.material('wall')}")`);document.documentElement.style.setProperty('--saoko-floor',`url("${window.SAOKO_ART.material('floor')}")`);alignEnvironment();document.querySelector('.architecture').src=window.SAOKO_ART.architecture();initGL();await Promise.all(slots.map(buildAtlas));await image('stand-wide.webp');ready=true;draw();showRest(1);updateState();loading.classList.add('ready');$('#status').textContent='Design 1 : Cream & yellow';
 if(!followSectionLink())window.scrollTo({top:0,behavior:'instant'});
}catch(e){console.error(e);showError();}
