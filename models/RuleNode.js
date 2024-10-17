//E:\rule-engine-js\models\RuleNode.js
const mongoose = require('mongoose');

const RuleNodeSchema = new mongoose.Schema({
    type: { type: String, required: true }, // operator (AND/OR) 
    left: { type: mongoose.Schema.Types.Mixed }, 
    right: { type: mongoose.Schema.Types.Mixed }, 
    value: { type: mongoose.Schema.Types.Mixed }, 
});

module.exports = mongoose.model('RuleNode', RuleNodeSchema);






