import { safeEvaluate } from './evaluator.js';

const displayEl = document.getElementById('display');
const historyEl = document.getElementById('history');
let expr = '';

function setExpr(value){
  expr = value;
  displayEl.value = expr || '0';
}

function appendValue(v){
  if(expr === '0' && /[0-9]/.test(v)) expr = v;
  else expr += v;
  setExpr(expr);
}

function clearAll(){ expr = ''; historyEl.textContent = ''; setExpr(''); }

function backspace(){ expr = expr.slice(0,-1); setExpr(expr); }

function calculate(){
  if(!expr) return;
  try{
    const result = safeEvaluate(expr);
    historyEl.textContent = expr + ' = ' + result;
    setExpr(String(result));
  }catch(e){
    setExpr('Error');
    setTimeout(()=> setExpr(''), 800);
  }
}

document.querySelectorAll('button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const v = btn.getAttribute('data-value');
    const action = btn.getAttribute('data-action');
    if(action === 'clear'){ clearAll(); return }
    if(action === 'back'){ backspace(); return }
    if(action === 'percent'){ appendValue('%'); return }
    if(action === 'equals'){ calculate(); return }
    if(v) appendValue(v);
  });
});

// keyboard support
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') { clearAll(); e.preventDefault(); return }
  if(e.key === 'Backspace') { backspace(); e.preventDefault(); return }
  if(e.key === 'Enter' || e.key === '=') { calculate(); e.preventDefault(); return }
  const allowed = '0123456789+-*/().%';
  if(allowed.includes(e.key)){
    appendValue(e.key);
    e.preventDefault();
  }
});

// initialize
setExpr('');
