// E:\rule-engine-js\services\RuleService.js

const RuleNode = require('../models/RuleNode');

// Create AST from rule string
const createRule = (ruleString) => {
    const parts = ruleString.split(' '); // Split rule string into parts

    // Check if rule has three parts (e.g., "age > 18")
    if (parts.length === 3) {
        return {
            type: "Comparison",
            operator: parts[1], // e.g., '>', '<', etc.
            left: { type: "Variable", name: parts[0] }, // e.g., 'age'
            right: { type: "Literal", value: Number(parts[2]) } // e.g., 18
        };
    }
    
    // Handle multiple conditions (e.g., "age > 18 AND income > 50000")
    const logicalParts = ruleString.split(/ (AND|OR) /);
    if (logicalParts.length > 1) {
        const asts = logicalParts.map((part, index) => {
            if (index % 2 === 0) { // Even index holds rule parts
                return createRule(part);
            }
        }).filter(Boolean); // Filter out undefined

        return asts.reduce((acc, curr) => ({
            type: logicalParts[1], // Logical operator (AND/OR)
            left: acc,
            right: curr
        }));
    }

    throw new Error("Invalid rule format");
};

// Combine multiple ASTs
const combineRules = (rules) => {
    if (rules.length < 2) {
        throw new Error("At least two rules are needed to combine");
    }
    const asts = rules.map(createRule); // Convert each rule string to AST
    // Combine all rules into an AND expression
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
                // You can add more operators as needed (e.g., '<', '==', etc.)
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












