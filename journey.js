await window.SAOKO_ART.ready;
const artwork=window.SAOKO_ART;
const asset=name=>{const v={'logo.png':'logo','brand-otafuku.png':'ota','brand-fisherman.png':'fish','brand-kanji.png':'kanji'};if(v[name])return artwork.brand(v[name]);if(name==='brand-slogan.png')return artwork.slogan();if(name==='brand-strip.png')return artwork.strip();return window.SAOKO_ASSETS?.[`${name}`]||`${name}`;};
document.querySelectorAll('img[src^=""],img[data-artwork]').forEach(im=>{if(!im.classList.contains('architecture'))im.src=asset(im.dataset.artwork||im.getAttribute('src').split('/').pop());});
const designs=[
 {id:1,name:'Cream & yellow',tag:'The classic, with a little sunshine.',colors:['#eae2be','#f9d317','#df1017','#141412'],bg:'#f5f0da',tile:'#f9d317',ink:'#141412',accent:'#eae2be',symbol:'brand-fisherman.png',card:1,desc:'The fisherman takes centre stage on the yellow front. The bowl-holding character greets you on the cream door. Multicoloured food panels set the rhythm above the counter.',details:[['Counter front','Yellow, with a large fisherman illustration.'],['Main sign','Black wordmark on wood.'],['Food panels','Multicoloured printed panels.']],note:'The brand’s illustration duo comes into its own, with a warm base and confident pops of colour.'},
 {id:2,name:'Pink & blue',tag:'A little softness. Plenty of character.',colors:['#f784a3','#1b8dec','#f9d317','#eae2be'],bg:'#f5eeea',tile:'#1b8dec',ink:'#141412',accent:'#f784a3',symbol:'brand-fisherman.png',card:2,desc:'A broad pink front, a blue door and illustrated medallions. Bowl photos stand out inside coloured frames, with food information on white panels.',details:[['Counter front','Pink, with medallions and a large wordmark.'],['Main sign','Blue wordmark on wood.'],['Food panels','Coloured frames, white information strip.']],note:'The characters become small recurring emblems, connecting the different surfaces just as they do in the brand system.'},
 {id:3,name:'Cream & green',tag:'The easy-going flow.',colors:['#eae2be','#00744e','#141412'],bg:'#eef0e5',tile:'#00744e',ink:'#eae2be',accent:'#eae2be',symbol:'brand-otafuku.png',card:3,desc:'A cream front gives the wordmark and fisherman room to breathe. The green door and frames bring the stand together in a more restrained palette.',details:[['Counter front','Cream, with the wordmark and fisherman.'],['Main sign','Green wordmark on wood.'],['Food panels','Green frames, cream information panels.']],note:'The same rich illustrations, with a calmer contrast. Green connects the door, main sign and food panels.'},
 {id:4,name:'Red & cream',tag:'The one you can’t miss.',colors:['#df1017','#eae2be','#141412'],bg:'#f5eae0',tile:'#df1017',ink:'#eae2be',accent:'#eae2be',symbol:'brand-otafuku.png',card:4,desc:'A cream wordmark sits across the red front. The Nikkei signature takes over the door, while the printed food panels echo the brand’s red graphic band.',details:[['Counter front','Red, with a cream wordmark and black illustration.'],['Main sign','Red wordmark on wood.'],['Food panels','Cream printed panels with red accents.']],note:'Confident blocks of colour and a clear visual hierarchy put the wordmark and graphic symbols at the heart of the design.'},
 {id:5,name:'Blue & pop',tag:'The flow that goes around the bowl.',colors:['#1b8dec','#f9d317','#f784a3','#141412'],bg:'#eaf0ef',tile:'#f9d317',ink:'#141412',accent:'#1b8dec',symbol:'brand-strip.png',card:5,desc:'An illustrated yellow band runs across a blue front. The yellow door and multicoloured frames keep the contrast going, with food information on white panels.',details:[['Counter front','Blue, with a yellow band and medallions.'],['Main sign','Black wordmark on wood.'],['Food panels','Coloured frames, white information strip.']],note:'The brand’s bands and medallions become one continuous graphic line across the counter.'}
];
const cardCrops=[[682,306,92,123],[679,332,98,114],[710,344,89,105],[704,317,90,117],[701,310,93,116]];
const q=s=>document.querySelector(s);
const shortNumber=n=>String(n).padStart(2,'0');
q('#alternatives').innerHTML=designs.map(d=>`<article id="flow-${d.id}" class="alternative" style="--section-bg:${d.bg};--tile:${d.tile};--tile-ink:${d.ink};--accent:${d.accent}" aria-labelledby="flow-title-${d.id}"><div class="page-width"><header class="alternative-head reveal"><div class="alternative-title"><span class="alternative-number">${shortNumber(d.id)}</span><div><h3 id="flow-title-${d.id}">${d.name}</h3><p class="alternative-subtitle">${d.tag}</p></div></div><div class="alternative-swatches" aria-label="Design colour palette">${d.colors.map(c=>`<i style="--c:${c}" aria-hidden="true"></i>`).join('')}</div></header><div class="proposal-grid"><figure class="proposal-render reveal"><img src="${artwork.render(d.id)}" alt="Design render with high-resolution artwork, option ${shortNumber(d.id)}, ${d.name}" loading="lazy" width="1448" height="1086"><figcaption><span>The stand · Design ${shortNumber(d.id)}</span><span>Design render</span></figcaption></figure><aside class="graphic-board reveal" aria-label="Connection to the graphic identity"><p class="board-label">The graphics behind the design</p><div class="graphic-art">${d.id===5?`<img src="${asset(d.symbol)}" alt="Original SAOKO band with fisherman medallions">`:`<span class="art-mask" role="img" aria-label="Original illustration from the new brand" style="--symbol:url('${asset(d.symbol)}')"></span>`}</div><div class="board-detail"><div class="mini-poster"><img src="${artwork.card(d.id,d.id===1?2:1)}" alt="Original food photo and sharp artwork for design ${d.id}" loading="lazy"></div><div class="mini-wordmark"><img src="${asset('logo.png')}" alt="Original SAOKO wordmark" loading="lazy"></div></div><ul class="design-details">${d.details.map(([t,s])=>`<li><b>${t}</b>${s}</li>`).join('')}</ul></aside></div><div class="alternative-bottom reveal"><p>${d.desc}</p><button type="button" class="text-link choose-design" data-choose="${d.id}">This could be my flow <span aria-hidden="true">↗</span></button></div><p class="design-note">${d.note}</p></div></article>`).join('');
q('#vote-options').innerHTML=designs.map(d=>`<label class="vote-option"><input type="radio" name="design" value="${d.id}" aria-label="Design ${shortNumber(d.id)}, ${d.name}"><span class="vote-card"><img src="${artwork.render(d.id)}" alt="" loading="lazy" width="1448" height="1086"><span class="vote-card-title"><span>${shortNumber(d.id)} · ${d.name}</span><span class="vote-check" aria-hidden="true"></span></span><small>${d.tag}</small></span></label>`).join('');

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion&&'IntersectionObserver'in window){
 document.body.classList.add('motion-ready');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.06,rootMargin:'0px 0px -15px 0px'});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
const scrollToVote=()=>q('#ton-vote').scrollIntoView({behavior:reducedMotion?'instant':'smooth',block:'start'});
let selected=null,confirmed=null,pendingChoice=null,saving=false,checking=true;
const votes=window.SAOKO_VOTES,STORAGE_KEY=votes.KEY;
const dialog=q('#confirm-dialog');
function updateSelection(){
 selected=Number(q('input[name="design"]:checked')?.value)||null;
 q('#review-vote').disabled=!selected||!!confirmed||checking;
 q('#selection-label').textContent=confirmed?`Your choice is saved: ${shortNumber(confirmed.design)} · ${designs[confirmed.design-1].name}.`:selected?`Your favourite: ${shortNumber(selected)} · ${designs[selected-1].name}.`:'Trust your gut. Pick a flow.';
}
q('#vote-form').addEventListener('change',updateSelection);
document.querySelectorAll('[data-choose]').forEach(button=>button.addEventListener('click',()=>{
 if(!confirmed){q(`input[name="design"][value="${button.dataset.choose}"]`).checked=true;updateSelection();}
 scrollToVote();
}));
function revealResults(data,focus=false){
 const receipt=data.receipt;
 confirmed=receipt;selected=receipt.design;q(`input[name="design"][value="${selected}"]`).checked=true;
 q('#vote-fieldset').disabled=true;q('#review-vote').disabled=true;q('#review-vote').textContent='Vote saved ✓';updateSelection();
 q('#receipt-text').textContent=`You chose ${shortNumber(selected)} · ${designs[selected-1].name}. Got it.`;
 const {counts,total}=data;
 q('#results-bars').innerHTML=designs.map((d,i)=>{const percent=Math.round(counts[i]/Math.max(total,1)*100);return `<div class="result-row"><div class="result-name">${shortNumber(d.id)} · ${d.name}${d.id===selected?'<small>Your flow ✓</small>':''}</div><div class="result-track"><div class="result-fill" style="--percent:${percent}%;--bar:${d.colors[d.id===1?1:0]}"></div></div><div class="result-value">${percent}%<small>${counts[i]} vote${counts[i]===1?'':'s'}</small></div></div>`;}).join('');
 q('#results-total').textContent=total+' vote'+(total===1?'':'s')+' from the SAOKO community · Updated '+new Date(data.updatedAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})+'.';
 q('#vote-results').hidden=false;
 if(focus){q('#vote-results').focus({preventScroll:true});q('#vote-results').scrollIntoView({behavior:reducedMotion?'instant':'smooth',block:'start'});}
}
function closeDialog(){if(saving)return;dialog.close();q('#review-vote').focus({preventScroll:true});}
q('.dialog-close').addEventListener('click',closeDialog);q('#edit-vote').addEventListener('click',closeDialog);
dialog.addEventListener('cancel',e=>{if(saving)e.preventDefault();});
q('#vote-form').addEventListener('submit',e=>{
 e.preventDefault();if(!selected||confirmed)return;pendingChoice=selected;
 const d=designs[pendingChoice-1];q('#confirm-choice').textContent=`${shortNumber(d.id)} · ${d.name}`;q('#confirm-image').src=artwork.render(d.id);q('#confirm-image').alt=`Design ${d.id} : ${d.name}`;q('#confirm-error').hidden=true;dialog.showModal();q('#edit-vote').focus();
});
q('#confirm-vote').addEventListener('click',async()=>{
 if(saving||!pendingChoice)return;saving=true;q('#confirm-vote').disabled=true;q('#edit-vote').disabled=true;
 try{
  const saved=await votes.vote(pendingChoice);
  dialog.close();revealResults(saved,true);q('#vote-error').hidden=true;
 }catch(e){q('#confirm-error').hidden=false;q('#confirm-error').textContent=e.message||'We could not save your vote. Please try again.';}

 finally{saving=false;q('#confirm-vote').disabled=false;q('#edit-vote').disabled=false;}
});
// A returning visitor keeps the same confirmed choice; only server totals are shown.
async function refreshResults(){
 try{
  const data=await votes.status();
  if(data.receipt)revealResults(data);
  q('#vote-error').hidden=true;
 }catch(error){q('#vote-error').textContent=error.message;q('#vote-error').hidden=false;}
 finally{checking=false;updateSelection();}
}
await refreshResults();
setInterval(()=>{if(confirmed&&!document.hidden)refreshResults();},30000);
window.addEventListener('focus',()=>{if(confirmed)refreshResults();});
window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY)refreshResults();});
q('#share-invitation').addEventListener('click',async()=>{
 const publicURL=location.protocol==='https:'&&!['localhost','127.0.0.1'].includes(location.hostname)?`\n${location.origin+location.pathname}`:'';
 const text=`Your turn. Your flow. Help choose SAOKO’s next look in Geneva! Five designs, one vote. The design with the most votes in the public poll is the one we’ll bring to life. Find your favourite and pass the flow on.${publicURL}`;
 try{await navigator.clipboard.writeText(text);q('#share-status').textContent=publicURL?'Invitation copied. Your turn to pass the flow on!':'Invitation copied. Add the public presentation link before sharing it.';}catch(e){q('#share-status').textContent=text;}
});
q('#replay').addEventListener('click',()=>document.dispatchEvent(new CustomEvent('saoko:replay')));
