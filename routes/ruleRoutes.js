// E:\rule-engine-js\routes\ruleRoutes.js

const express = require('express');
const router = express.Router();
const RuleController = require('../controllers/RuleController');

// Route for creating a rule
router.post('/create', RuleController.createRule);

// Route for combining rules
router.post('/combine', RuleController.combineRules);

// Route for evaluating rule
router.post('/evaluate', RuleController.evaluateRule);

module.exports = router;





