# Rule Engine APPLICATION -1



## Overview

The Rule Engine project is a dynamic system that allows users to create, combine, and evaluate rules based on user-defined criteria. It utilizes an Abstract Syntax Tree (AST) to represent rules, enabling flexible evaluations against incoming data.

## Features

- **Create Rules**: Users can define rules using a string-based syntax.
- **Combine Rules**: Users can combine multiple rules into a single logical expression (e.g., using AND/OR).
- **Evaluate Rules**: The system evaluates rules against JSON data, returning true or false based on the defined criteria.
- **MongoDB Integration**: Rules can be stored in a MongoDB database for persistence.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js to handle HTTP requests.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **dotenv**: Module for loading environment variables from a `.env` file.
- **Nodemon**: Development tool that automatically restarts the server on file changes.

## Architecture

The architecture of the Rule Engine consists of the following components:

- **Client**: Frontend interface where users can input rules and data.
- **API Layer**: Express.js handles HTTP requests and responses.
- **Service Layer**: Contains business logic for creating, combining, and evaluating rules.
- **Model Layer**: Mongoose models define the structure of rules stored in MongoDB.

## Installation



1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd rule-engine-js

Install Dependencies:

bash
Copy code
npm install

Set Up Environment Variables: Create a .env file in the root directory and add the following:

env
Copy code
MONGO_URI=mongodb://localhost:27017/ruleengine
Start MongoDB: Ensure that your MongoDB server is running. You can start it with:

bash
Copy code
mongod
Run the Application: Use Nodemon for automatic restarting during development:

bash
Copy code
npm run dev

## RUNNING ON LOCAL HOST PORT 5000

## USASGE
API Endpoints
The following endpoints are available:

Create Rule

URL: /api/rules/create
Method: POST
Body:
json
Copy code
{
  "ruleString": "age > 18 AND income > 50000"
}
Combine Rules

URL: /api/rules/combine
Method: POST
Body:
json
Copy code
{
  "rules": ["age > 18", "income > 50000"]
}
Evaluate Rule

URL: /api/rules/evaluate
Method: POST
Body:
json
Copy code
{
  "ruleAST": <AST object>,
  "data": {
    "age": 25,
    "income": 60000
  }
}
Example
Creating a Rule: Send a POST request to /api/rules/create with a rule string.

Combining Rules: Send a POST request to /api/rules/combine with an array of rule strings.

Evaluating a Rule: Send a POST request to /api/rules/evaluate with the AST generated from the combined rules and the input data.