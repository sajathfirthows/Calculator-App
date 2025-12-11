import { strict as assert } from 'assert';
import { safeEvaluate } from '../evaluator.js';

// basic arithmetic
assert.equal(safeEvaluate('1+2'), 3);
assert.equal(safeEvaluate('10-4'), 6);
assert.equal(safeEvaluate('3*5'), 15);
assert.equal(safeEvaluate('20/4'), 5);

// decimals and parentheses
assert.equal(safeEvaluate('2.5+0.5'), 3);
assert.equal(safeEvaluate('(2+3)*4'), 20);

// percent
assert.equal(safeEvaluate('50%'), 0.5);
assert.equal(safeEvaluate('200*10%'), 20);

console.log('All evaluator tests passed');
