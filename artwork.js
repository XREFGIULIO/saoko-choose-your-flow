/* Original photos + scalable artwork. Rendering and slot use the same source. */
(() => {
 const D=window.SAOKO_VECTOR_DATA;
 const C={cream:'#eae2be',yellow:'#f9d317',pink:'#f784a3',blue:'#1b8dec',green:'#00744e',red:'#df1017',black:'#141412'};
 const names=['ACEBICHADO','NIKKEI','SAOKO','COLIFLOR','DON POLLITO','YODARE DON'];
 const palette=[['cream','yellow','green','pink','blue','cream'],['pink','blue','yellow','green','pink','blue'],Array(6).fill('green'),Array(6).fill('cream'),['yellow','pink','blue','yellow','pink','blue']];
 const logoColors=['black','blue','green','red','black'];
 const refs=[
  {sign:[514,149,421,97],door:[134,605,312,337],front:[458,605,869,337],menu:[474,296,185,292],xs:[682,786,889,993,1097,1201],cy:306,cw:92,ch:123},
  {sign:[516,185,416,89],door:[139,649,300,314],front:[451,650,886,314],menu:[462,322,187,310],xs:[679,784,891,995,1101,1206],cy:332,cw:98,ch:114},
  {sign:[519,204,406,87],door:[163,639,286,318],front:[461,641,839,308],menu:[481,328,189,307],xs:[710,805,901,997,1093,1189],cy:344,cw:89,ch:105},
  {sign:[533,181,378,83],door:[120,614,325,346],front:[458,614,885,345],menu:[479,309,180,289],xs:[704,804,904,1004,1104,1205],cy:317,cw:90,ch:117},
  {sign:[519,170,405,86],door:[134,615,284,317],front:[433,615,885,317],menu:[477,304,177,293],xs:[701,802,904,1006,1107,1208],cy:310,cw:93,ch:116}
 ];
 const assets={},cache=new Map();
 const assetNames=['stand-wide.webp','food-original-6.jpg',...Array.from({length:5},(_,i)=>`render-${i+1}.webp`),...Array.from({length:5},(_,i)=>`food-original-${i+1}.webp`),...Array.from({length:5},(_,i)=>`menu-master-${i+1}.png`)];
 async function dataAsset(n){
  const url=`${n}`;if(window.SAOKO_ASSETS?.[url])return assets[n]=window.SAOKO_ASSETS[url];
  const r=await fetch(url);if(!r.ok)throw Error(`Artwork unavailable: ${n}`);
  const b=await r.blob();return assets[n]=await new Promise((res,rej)=>{const reader=new FileReader();reader.onload=()=>res(reader.result);reader.onerror=rej;reader.readAsDataURL(b);});
 }
 const defs=()=>`<defs>${Object.entries(D).map(([n,d])=>`<path id="a-${n}" fill-rule="evenodd" d="${d.path}"/>`).join('')}<linearGradient id="light" x2=".3" y2="1"><stop stop-color="#fff5d9" stop-opacity=".14"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#201b12" stop-opacity=".07"/></linearGradient><linearGradient id="acrylic" x2=".7" y2="1"><stop stop-color="#fff" stop-opacity=".32"/><stop offset=".18" stop-color="#fff" stop-opacity="0"/><stop offset=".85" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient><linearGradient id="silver" x2="1"><stop stop-color="#696b64"/><stop offset=".35" stop-color="#f4edce"/><stop offset=".6" stop-color="#85877c"/><stop offset="1" stop-color="#d8d4b8"/></linearGradient></defs>`;
 const xml=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
 function art(n,x,y,w,h,color=C.black){const d=D[n],f=Math.min(w/d.w,h/d.h);return `<use href="#a-${n}" transform="translate(${x+(w-d.w*f)/2} ${y+(h-d.h*f)/2}) scale(${f})" fill="${color}"/>`;}
 function text(s,x,y,size,color=C.black,weight=700,anchor='middle',spacing=0){return `<text x="${x}" y="${y}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${spacing}" fill="${color}">${xml(s)}</text>`;}
 const rect=(x,y,w,h,color,rx=0)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${color}"/>`;
 function image(n,x,y,w,h,fit='xMidYMid meet'){return `<image href="${assets[n]}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${fit}"/>`;}
 function svg(body,w,h,view=`0 0 ${w} ${h}`,scale=1){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w*scale}" height="${h*scale}" viewBox="${view}">${defs()}${body}</svg>`;}
 function url(key,make){if(!cache.has(key))cache.set(key,URL.createObjectURL(new Blob([make()],{type:'image/svg+xml'})));return cache.get(key);}
 function nest(body,x,y,w,h,vw,vh){return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="none">${body}</svg>`;}
 function medallion(n,x,y,d,bg,fg=C.black){return `<circle cx="${x+d/2}" cy="${y+d/2}" r="${d/2}" fill="${bg}"/>`+art(n,x+d*.12,y+d*.12,d*.76,d*.76,fg);}
 function slogan(x,y,w,h){return nest(`<path d="M0 50Q0 8 42 8Q74 -8 108 8Q145 -8 180 8Q215 -8 246 8Q288 0 300 50Q300 92 255 92Q220 108 184 92Q146 108 112 92Q73 108 41 92Q0 98 0 50Z" fill="${C.red}"/>${text('PONLE FLOW,',150,46,25)}${text('PONLE SAOKO',150,75,25)}`,x,y,w,h,300,100);}
 function tag(x,y,w,h,color=C.black){return art('tag',x,y,w,h,color);}
 function front(k){
  let s='';const W=2378,H=1053;
  if(k===1)s=rect(0,0,W,H,C.yellow)+art('fish',115,130,1160,790)+slogan(1320,310,950,360)+tag(1640,727,300,155);
  if(k===2){s=rect(0,0,W,H,C.pink)+art('logo',930,110,1230,300)+tag(1310,520,410,220)+text('MY FLAVOR VACATION',1570,950,69);['ota','fish','ota'].forEach((n,i)=>s+=medallion(n,135,70+i*310,245,i===1?C.yellow:C.cream));}
  if(k===3)s=rect(0,0,W,H,C.cream)+art('logo',220,230,1070,280)+tag(540,625,340,185)+art('fish',1390,210,840,650);
  if(k===4)s=rect(0,0,W,H,C.red)+art('logo',150,220,1210,310,C.cream)+tag(530,650,330,190,C.cream)+art('ota',1510,95,710,850);
  if(k===5){s=rect(0,0,W,H,C.blue)+rect(100,315,2178,340,C.yellow);for(let i=0;i<3;i++)s+=medallion('fish',145+i*245,345,218,C.pink);s+=art('logo',1215,350,1010,260)+text('N B',1150,387,28)+text('I O',1150,430,28)+text('K W',1150,473,28)+text('K L',1150,516,28)+text('E S',1150,559,28)+text('I',1141,602,28)+text('THE MEETING OF TWO WORLDS',1189,875,72);}
  return s+rect(0,0,W,H,'url(#light)');
 }
 function door(k){const W=808,H=1053;let s='';
  if(k===1)s=rect(0,0,W,H,C.cream)+art('ota',72,195,664,735)+art('kanji',57,55,65,145)+rect(693,57,54,182,C.red,25)+['N','I','K','K','E','I'].map((c,i)=>text(c,720,80+i*27,21)).join('');
  if(k===2)s=rect(0,0,W,H,C.blue)+art('logo',115,90,600,145)+art('fish',45,335,720,590);
  if(k===3)s=rect(0,0,W,H,C.green)+art('ota',75,165,675,800,C.cream);
  if(k===4)s=rect(0,0,W,H,C.cream)+art('kanji',200,140,408,670)+text('NIKKEI',404,965,62);
  if(k===5)s=rect(0,0,W,H,C.yellow)+art('ota',75,125,658,780);
  return s+rect(0,0,W,H,'url(#light)');
 }
 function wood(w,h){return `<svg width="${w}" height="${h}" viewBox="575 50 518 84" preserveAspectRatio="none">${image('stand-wide.webp',0,0,1672,941)}</svg>`;}
 function sign(k,w=421,h=97){return wood(w,h)+art('logo',w*.09,h*.1,w*.82,h*.8,C[logoColors[k-1]]);}
 function food(j,x,y,d){
  const id=`dish-${j}-${x}-${y}`;
  if(j===6){
   return `<clipPath id="${id}"><circle cx="${x+d/2}" cy="${y+d/2}" r="${d/2}"/></clipPath><g clip-path="url(#${id})"><svg x="${x}" y="${y}" width="${d}" height="${d}" viewBox="520 20 2960 2960">${image('food-original-6.jpg',0,0,4000,3000)}</svg></g>`;
  }
  return `<clipPath id="${id}"><circle cx="${x+d/2}" cy="${y+d/2}" r="${d/2}"/></clipPath><g clip-path="url(#${id})">${image(`food-original-${j}.webp`,x,y,d,d)}</g>`;
 }
 function card(k,j){
  const poster=k===1||k===4,H=poster?330:300,col=C[palette[k-1][j-1]],ink=col===C.green?C.cream:C.black;
  let s=rect(0,0,250,H,poster?col:(k===3?C.cream:'#fff'),poster?5:12.5);
  if(poster){
   s+=art('logo',25,18,200,47,ink);
   if(k===4)s+=rect(0,77,36,204,C.red)+art('kanji',7,140,22,65,C.black);
   s+=food(j,k===4?48:25,k===4?92:87,k===4?190:200);
   s+=text(names[j-1],k===4?139:125,309,18.5,ink,700);
  }else{
   s+=rect(0,0,250,250,col,12.5)+`<circle cx="125" cy="125" r="116.6667" fill="#fdfbf0"/>`+food(j,14,14,222);
   s+=rect(0,0,250,250,'url(#acrylic)',12.5);
   s+=`<circle cx="23" cy="274" r="15.5" fill="${k===3?C.green:C.black}"/>`+text(j,23,281,21,'#fff',700)+text(names[j-1],144,281,18,k===3?C.green:C.black,700);
  }
  s+=rect(0,0,250,H,'url(#light)',poster?5:12.5);
  for(const x of [12.5,237.5])s+=`<circle cx="${x}" cy="12.5" r="2.5" fill="#292a24" stroke="#d4d3bb" stroke-width=".8"/>`;
  return s;
 }
 const bodyCache={};
 function renderBody(k){if(bodyCache[k])return bodyCache[k];const r=refs[k-1];let s=image(`render-${k}.webp`,0,0,1448,1086);
  s+=nest(sign(k,r.sign[2],r.sign[3]),...r.sign,r.sign[2],r.sign[3]);
  s+=nest(door(k),...r.door,808,1053)+nest(front(k),...r.front,2378,1053);
  // Keep the original door hardware, its dimensions and position.
  const handle={2:[425,674,38],3:[425,664,39],5:[398,637,0]}[k];
  if(handle){const [x,y,l]=handle;s+=`<ellipse cx="${x}" cy="${y+1}" rx="8" ry="9" fill="#181a16" opacity=".22"/><ellipse cx="${x}" cy="${y}" rx="6.5" ry="8" fill="url(#silver)" stroke="#53564e" stroke-width=".7"/>`;if(l)s+=`<path d="M${x} ${y}h-${l}" stroke="#44493e" stroke-width="6" stroke-linecap="round"/><path d="M${x} ${y-1}h-${l}" stroke="url(#silver)" stroke-width="4" stroke-linecap="round"/>`;}
  s+=image(`menu-master-${k}.png`,...r.menu,'none');
  for(let j=1;j<=6;j++)s+=nest(card(k,j),r.xs[j-1],r.cy,r.cw,r.ch,250,k===1||k===4?330:300);
  return bodyCache[k]=s;
 }
 function cropped(k,box,w,h){return svg(renderBody(k),w,h,box.join(' '));}
 const API={refs,ready:Promise.all(assetNames.map(dataAsset)),
  render:k=>url(`render${k}`,()=>svg(renderBody(k),1448,1086,'0 0 1448 1086',3)),
  card:(k,j=1)=>url(`card${k}-${j}`,()=>svg(card(k,j),750,k===1||k===4?990:900,`0 0 250 ${k===1||k===4?330:300}`)),
  brand:(n,color=C.black)=>url(`brand${n}${color}`,()=>svg(art(n,0,0,D[n].w,D[n].h,color),D[n].w,D[n].h)),
  slogan:()=>url('slogan',()=>svg(slogan(0,0,900,300),900,300)),
  strip:()=>url('strip',()=>svg(front(5),2378,340,'0 315 2378 340')),
  slot:(k,slot)=>{const r=refs[k-1];if(slot.name==='sign')return url(`sign${k}`,()=>svg(sign(k,536,95),1536,272,'0 0 536 95'));
   const box=slot.name==='card'?[r.xs[slot.card-1],r.cy,r.cw,r.ch]:r[slot.name];
   return url(`crop${k}-${slot.name}-${slot.card||0}`,()=>{
    let s='';
    if(slot.name==='card')s=nest(card(k,slot.card),0,0,box[2],box[3],250,k===1||k===4?330:300);
    else if(slot.name==='front')s=nest(front(k),0,0,box[2],box[3],2378,1053);
    else if(slot.name==='door')s=nest(door(k),0,0,box[2],box[3],808,1053);
    else s=image(`menu-master-${k}.png`,0,0,box[2],box[3],'none');
    return svg(s,box[2]*5,box[3]*5,`0 0 ${box[2]} ${box[3]}`);
   });
  },
  rest:(k,slots)=>{const r=refs[k-1];let s=`<defs><g id="rest-source">${renderBody(k)}</g></defs>`;
   for(const slot of slots){if(slot.name==='sign'){s+=nest(sign(k,536,95),slot.x,slot.y,slot.w,slot.h,536,95);continue;}
    const b=slot.name==='card'?[r.xs[slot.card-1],r.cy,r.cw,r.ch]:r[slot.name];
    const f=Math.min(slot.w/b[2],slot.h/b[3]),w=b[2]*f,h=b[3]*f,x=slot.x+(slot.w-w)/2,y=slot.y+(slot.name==='card'?0:(slot.h-h)/2);
    s+=`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${b.join(' ')}"><use href="#rest-source"/></svg>`;
   }return svg(s,1672,941);
  }
 };
 // Intro geometry uses the measured front elevation, independent of render crop ratios.
 function fit(body,w,h,vw,vh){return `<svg width="${w}" height="${h}" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="xMidYMid meet">${body}</svg>`;}
 function slotBody(k,slot){
  const w=slot.w,h=slot.h;
  if(slot.name==='sign')return `<svg width="${w}" height="${h}" viewBox="551 31 570 128" preserveAspectRatio="none">${image('stand-wide.webp',0,0,1672,941)}</svg>`+art('logo',w*.11,h*.17,w*.78,h*.66,C[logoColors[k-1]]);
  if(slot.name==='card')return `<svg width="${w}" height="${h}" viewBox="0 0 250 330">${card(k,slot.card)}</svg>`;
  if(slot.name==='menu')return image(`menu-master-${k}.png`,0,0,w,h);
  const bg=slot.name==='door'?[C.cream,C.blue,C.green,C.cream,C.yellow][k-1]:[C.yellow,C.pink,C.cream,C.red,C.blue][k-1];
  return rect(0,0,w,h,bg)+fit(slot.name==='door'?door(k):front(k),w,h,slot.name==='door'?808:2378,1053);
 }
 API.architecture=()=>url('architecture-measured',()=>{
  let s=rect(0,0,1920,1080,'#8e7c68');
  const crop=(box,x,y,w,h)=>`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${box.join(' ')}" preserveAspectRatio="none">${image('stand-wide.webp',0,0,1672,941)}</svg>`;
  // Reframe the blank architectural surfaces; preserve print/food geometry separately.
  s+=`<defs><linearGradient id="wall-tone"><stop stop-color="#726457"/><stop offset=".5" stop-color="#94816c"/><stop offset="1" stop-color="#726457"/></linearGradient><filter id="wall-grain"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs>`+rect(0,0,1920,1032,'url(#wall-tone)')+`<rect width="1920" height="1032" filter="url(#wall-grain)" opacity=".055"/>`;
  s+=crop([0,900,149,41],0,1032,295,48);
  s+=crop([149,900,1378,41],295,1032,1340,48);
  s+=crop([1527,900,145,41],1635,1032,285,48);
  s+=crop([149,174,400,339],295,222,371,334);
  s+=crop([549,174,213,339],666,222,200,334);
  s+=crop([762,174,765,339],866,222,769,334);
  s+=crop([149,494,1378,19],295,541,1340,15);
  s+=crop([149,513,15,340],295,556,15,434);
  s+=crop([164,513,358,340],310,556,336,434);
  s+=crop([522,513,10,340],646,556,10,434);
  s+=crop([532,513,990,340],656,556,964,434);
  s+=crop([1522,513,5,340],1620,556,15,434);
  s+=crop([149,853,1378,47],295,990,1340,42);
  s+=crop([648,0,386,32],817,34,296,25);
  return svg(s,3840,2160,'0 0 1920 1080');
 });
 API.slot=(k,slot)=>url(`measured-${k}-${slot.name}-${slot.card||0}`,()=>svg(slotBody(k,slot),slot.w*4,slot.h*4,`0 0 ${slot.w} ${slot.h}`));
 API.rest=(k,slots)=>svg(slots.map(slot=>`<svg data-part="${slot.name}" x="${slot.x}" y="${slot.y}" width="${slot.w}" height="${slot.h}" viewBox="0 0 ${slot.w} ${slot.h}">${slotBody(k,slot)}</svg>`).join(''),1920,1080);
 window.SAOKO_ART=API;
})();
