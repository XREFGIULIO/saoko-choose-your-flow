/* Shared poll: one anonymous ballot per page opening; totals stay on the server. */
(() => {
 const API=window.SAOKO_POLL_API || (location.hostname==='127.0.0.1'||location.hostname==='localhost'?'http://127.0.0.1:5184/api/poll':'https://saoko-geneve-your-flow.downysunflower1.chatgpt.site/api/poll');
 // Keep the receipt key only in this document. Reloads and new tabs get a fresh ballot.
 // Retain it after a failed request so a retry cannot count the same ballot twice.
 let currentToken=null,creating;
 async function request(action,body={},key=currentToken){
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
  if(currentToken)return currentToken;
  const data=await request('session',{},null);
  currentToken=data.token;
  return currentToken;
 }
 async function vote(design){
  creating ||= session().finally(()=>{creating=null;});
  const key=await creating;
  return request('vote',{design},key);
 }
 const status=async()=>currentToken?request('status'):{receipt:null};
 window.SAOKO_VOTES={status,vote};
 // A history-restored page is another opening, too; avoid restoring its old ballot.
 window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
})();
