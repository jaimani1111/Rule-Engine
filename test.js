//E:\rule-engine-js\test.js
const { createRule, combineRules, evaluateRule } = require('./services/RuleService'); // Correct path

try {
   
    const rule1 = createRule('age > 18');
    const rule2 = createRule('income > 50000');

  
    const combinedRule = combineRules(['age > 18', 'income > 50000']);

 
    const data = { age: 25, income: 70000 };
    const result = evaluateRule(combinedRule, data);
    
    console.log(`Evaluation Result: ${result}`); 
} catch (error) {
    console.error(`Error: ${error.message}`);
}

