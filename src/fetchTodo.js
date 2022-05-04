const AWS = require("aws-sdk");

const fetchTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient(); // create dynamodb client
  const { id } = event.pathParameters; // get id from path parameters

  let todo;

  try {
    const result = await dynamodb
      .get({
        TableName: "TodoTable",
        Key: {id}
      })
      .promise();

    todo = result.Item;

  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: fetchTodo,
};
