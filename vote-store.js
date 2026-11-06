/* Shared poll: browser storage holds only an anonymous receipt key, never totals. */
(() => {
 const KEY='saoko.geneve.public-poll.v1', API=window.SAOKO_POLL_API || (location.hostname==='127.0.0.1'||location.hostname==='localhost'?'http://127.0.0.1:5184/api/poll':'https://saoko-geneve-your-flow.downysunflower1.chatgpt.site/api/poll');
 let creating;
 function token(){
  const local=localStorage.getItem(KEY), cookie=document.cookie.split('; ').find(s=>s.startsWith('saoko_poll='))?.split('=')[1];
  const value=local||cookie;
  return /^[a-f0-9]{64}$/.test(value||'')?value:null;
 }
 async function request(action,body={},key=token()){
  const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),20000);
  try{
   const response=await fetch(API+'/'+action,{method:'POST',headers:{'Content-Type':'application/json',...(key?{Authorization:'Bearer '+key}:{})},body:JSON.stringify(body),cache:'no-store',signal:controller.signal});
   const data=await response.json();
   if(!response.ok)throw Error(data.error||'Voting is temporarily unavailable. Please try again.');
   return data;
  }catch(error){
   if(error.name==='AbortError'||error instanceof TypeError)throw Error('The ballot box is taking a moment. Check your connection and try again. Your vote will never be counted twice.');
   throw error;
  }finally{clearTimeout(timer);}
 }
 async function session(){
  if(token())return token();
  localStorage.setItem(KEY+'.check','ok');localStorage.removeItem(KEY+'.check');
  const create=async()=>{
   if(token())return token();
   const data=await request('session',{},null);
   localStorage.setItem(KEY,data.token);
   document.cookie='saoko_poll='+data.token+'; Max-Age=31536000; Path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');
   return data.token;
  };
  return navigator.locks?navigator.locks.request(KEY,create):create();
 }
 async function vote(design){
  creating ||= session().finally(()=>{creating=null;});
  const key=await creating;
  return request('vote',{design},key);
 }
 const status=async()=>token()?request('status'):{receipt:null};
 window.SAOKO_VOTES={KEY,status,vote};
})();
