//E:\rule-engine-js\models\RuleNode.js
const mongoose = require('mongoose');

const RuleNodeSchema = new mongoose.Schema({
    type: { type: String, required: true }, // operator (AND/OR) or operand (age, department, etc.)
    left: { type: mongoose.Schema.Types.Mixed }, // Left child node
    right: { type: mongoose.Schema.Types.Mixed }, // Right child node
    value: { type: mongoose.Schema.Types.Mixed }, // Optional for operand nodes
});

module.exports = mongoose.model('RuleNode', RuleNodeSchema);






