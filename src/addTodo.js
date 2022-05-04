const { v4 } = require('uuid');
const AWS = require('aws-sdk');


const addTodo = async (event) => { 
  
  const dynamodb = new AWS.DynamoDB.DocumentClient(); // create dynamodb client
  
  
  const { todo } = JSON.parse(event.body); // get todo from request body
  const createdAt = new Date().toISOString(); // get current date
  const id = v4(); // generate id

  console.log("This is an ID : ", id);
  
  const newTodo = { // create new todo object
    id,
    todo,
    createdAt,
    completed: false
  }

  await dynamodb.put({ // put new todo into dynamodb
    TableName: "TodoTable", // set table name
    Item: newTodo // put new todo object into dynamodb
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: addTodo
};


