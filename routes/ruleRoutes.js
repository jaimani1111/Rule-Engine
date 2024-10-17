// E:\rule-engine-js\routes\ruleRoutes.js

const express = require('express');
const router = express.Router();
const RuleController = require('../controllers/RuleController');

// for creating a rule
router.post('/create', RuleController.createRule);

//for combining rules
router.post('/combine', RuleController.combineRules);

// for evaluating rule
router.post('/evaluate', RuleController.evaluateRule);

module.exports = router;





