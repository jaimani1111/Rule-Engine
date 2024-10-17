const { createRule, combineRules, evaluateRule } = require('../services/RuleService');

// create a rule from the given string
exports.createRule = (req, res) => {
    try {
        const ruleString = req.body.rule;
        if (!ruleString) {
            return res.status(400).json({ error: 'Rule string is required' });
        }

        const ruleAST = createRule(ruleString); // convert rule to AST
        res.json({ ast: ruleAST });
    } catch (error) {
        res.status(400).json({ error: 'Invalid rule string: ' + error.message });
    }
};

// combine two rules into one
exports.combineRules = (req, res) => {
    try {
        const rules = req.body.rules;
        if (!Array.isArray(rules) || rules.length !== 2) {
            return res.status(400).json({ error: 'Exactly two rules are required for combination' });
        }

        const combinedAST = combineRules(rules); // merge two rule ASTs
        res.json({ ast: combinedAST });
    } catch (error) {
        res.status(400).json({ error: 'Failed to combine rules: ' + error.message });
    }
};

// evaluate a rule against provided data
exports.evaluateRule = (req, res) => {
    try {
        const { ruleAST, data } = req.body;
        if (!ruleAST || !data) {
            return res.status(400).json({ error: 'Both ruleAST and data are required' });
        }

        const result = evaluateRule(ruleAST, data); // run the rule on data
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: 'Failed to evaluate rule: ' + error.message });
    }
};





