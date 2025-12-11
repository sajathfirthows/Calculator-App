export function safeEvaluate(input){
  const clean = String(input).replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
  if(!/^[0-9+\-*/().%\s]+$/.test(clean)) throw new Error('Invalid characters');
  const withPercent = clean.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
  try{
    // evaluate inside a Function to provide an isolated scope
    const result = Function('return ('+withPercent+')')();
    if(typeof result === 'number' && isFinite(result)) return result;
    throw new Error('Invalid expression');
  }catch(e){
    throw new Error('Evaluation error');
  }
}
