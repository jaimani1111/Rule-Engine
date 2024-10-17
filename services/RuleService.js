

const RuleNode = require('../models/RuleNode');


const createRule = (ruleString) => {
    const parts = ruleString.split(' '); //split rule 

    //  if rule has three parts 
    if (parts.length === 3) {
        return {
            type: "Comparison",
            operator: parts[1], 
            left: { type: "Variable", name: parts[0] }, 
            right: { type: "Literal", value: Number(parts[2]) } 
        };
    }
    
    // Handle multiple conditions (e.g., "age > 18 AND income > 50000")
    const logicalParts = ruleString.split(/ (AND|OR) /);
    if (logicalParts.length > 1) {
        const asts = logicalParts.map((part, index) => {
            if (index % 2 === 0) { 
                return createRule(part);
            }
        }).filter(Boolean); 

        return asts.reduce((acc, curr) => ({
            type: logicalParts[1], // logical operator (AND/OR)
            left: acc,
            right: curr
        }));
    }

    throw new Error("Invalid rule format");
};

//combining ASTs
const combineRules = (rules) => {
    if (rules.length < 2) {
        throw new Error("At least two rules are needed to combine");
    }
    const asts = rules.map(createRule); //convert each rule string to AST
 
    return asts.reduce((acc, curr) => ({
        type: 'AND',
        left: acc,
        right: curr
    }));
};

function evaluateRule(ast, data) {
    switch (ast.type) {
        case 'Comparison':
            const leftValue = data[ast.left.name];
            const rightValue = ast.right.value;
            switch (ast.operator) {
                case '>':
                    return leftValue > rightValue;
               
                default:
                    throw new Error(`Unsupported operator: ${ast.operator}`);
            }
        case 'AND':
            return evaluateRule(ast.left, data) && evaluateRule(ast.right, data);
        case 'OR':
            return evaluateRule(ast.left, data) || evaluateRule(ast.right, data);
        default:
            throw new Error(`Unsupported AST node type: ${ast.type}`);
    }
}

module.exports = {
    createRule,
    combineRules,
    evaluateRule,
};












