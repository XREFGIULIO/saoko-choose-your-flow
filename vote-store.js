/* Local beta ballot ledger. No seeded votes, and no cross-device claims. */
(() => {
 const KEY='saoko.geneve.ballots.preview.v2',LEGACY='saoko.geneve.design-choice.preview.v1';
 const valid=b=>b&&typeof b.id==='string'&&Number.isInteger(b.design)&&b.design>=1&&b.design<=5&&typeof b.confirmedAt==='string';
 function read(storage){
  const raw=storage.getItem(KEY);
  if(raw){const ledger=JSON.parse(raw);if(ledger.version!==2||!Array.isArray(ledger.ballots)||!ledger.ballots.every(valid))throw Error('Invalid ballot ledger');return ledger;}
  const old=JSON.parse(storage.getItem(LEGACY)||'null');
  const ballots=old?.version===1&&Number.isInteger(old.design)&&old.design>=1&&old.design<=5&&typeof old.confirmedAt==='string'?[{id:'legacy:'+old.confirmedAt,design:old.design,confirmedAt:old.confirmedAt}]:[];
  return {version:2,ballots};
 }
 function append(storage,ballot){
  if(!valid(ballot))throw Error('Invalid ballot');
  const ledger=read(storage);
  if(!ledger.ballots.some(b=>b.id===ballot.id))ledger.ballots.push(ballot);
  storage.setItem(KEY,JSON.stringify(ledger));
  return read(storage);
 }
 const counts=ledger=>ledger.ballots.reduce((totals,b)=>(totals[b.design-1]++,totals),[0,0,0,0,0]);
 globalThis.SAOKO_VOTES={KEY,read,append,counts};
})();
