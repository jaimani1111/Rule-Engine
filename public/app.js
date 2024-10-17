//public/app.js
// Handle Create Rule form submission
// Handle Create Rule form submission
document.getElementById('createRuleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const ruleString = document.getElementById('ruleString').value; // Get the rule string from input
    
    try {
        const response = await fetch('/api/rules/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rule: ruleString }) // Send the rule string as JSON
        });
        
        const data = await response.json(); // Parse the JSON response
        if (response.ok) {
            // Display the generated AST
            document.getElementById('results').innerText = `AST: ${JSON.stringify(data.ast, null, 2)}`;
        } else {
            // Handle any errors returned from the server
            document.getElementById('results').innerText = `Error: ${data.error}`;
        }
    } catch (err) {
        console.error('Error creating rule:', err); // Log any network errors
        document.getElementById('results').innerText = `Network Error: ${err.message}`;
    }
});

// Handle Combine Rules form submission
document.getElementById('combineRulesForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const rule1 = document.getElementById('rule1').value;
    const rule2 = document.getElementById('rule2').value;

    try {
        const response = await fetch('/api/rules/combine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rules: [rule1, rule2] })
        });
        
        const data = await response.json();
        if (response.ok) {
            document.getElementById('results').innerText = `Combined AST: ${JSON.stringify(data.ast, null, 2)}`;
        } else {
            document.getElementById('results').innerText = `Error: ${data.error}`;
        }
    } catch (err) {
        console.error('Error combining rules:', err);
    }
});

// Handle Evaluate Rule form submission
document.getElementById('evaluateRuleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const jsonData = document.getElementById('jsonData').value;
    const ruleAST = document.getElementById('ruleAST').value;

    try {
        const response = await fetch('/api/rules/evaluate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: JSON.parse(jsonData), ruleAST: JSON.parse(ruleAST) })
        });
        
        const data = await response.json();
        if (response.ok) {
            document.getElementById('results').innerText = `Evaluation Result: ${data.result}`;
        } else {
            document.getElementById('results').innerText = `Error: ${data.error}`;
        }
    } catch (err) {
        console.error('Error evaluating rule:', err);
    }
});

