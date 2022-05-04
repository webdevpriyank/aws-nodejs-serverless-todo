const { v4 } = require('uuid');
const AWS = require('aws-sdk');


const updateTodo = async (event) => { 
  
  const dynamodb = new AWS.DynamoDB.DocumentClient(); // create dynamodb client
  
  
  const { completed } = JSON.parse(event.body); // get todo from request body
  const { id } = event.pathParameters; // get id from path parameters


  await dynamodb.update({ // update todo in dynamodb
    
    TableName: "TodoTable", // set table name
    Key: {id}, // set id as key
    UpdateExpression: "set completed = :completed", // set update expression
    ExpressionAttributeValues: { // set expression attribute values
      ":completed": completed // set completed to completed
    },
    ReturnValues: "ALL_NEW" // return updated todo

  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      "Msg: ": "Todo updated successfully"
    }),
  };

};

module.exports = {
  handler: updateTodo
};


