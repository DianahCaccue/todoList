const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const pg = require('pg');
const cors = require('cors')

const app = express();
app.use(cors())
 
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
type todo {
    todo_id: Int
    description: String
  }
  type Query {
    getTodos:[todo],
    getTodo(todo_id:Int):todo
  }
  type Mutation{
    createTodo(description:String):Boolean
    updateTodo(todo_id:Int):Boolean
    deleteTodo(todo_id:Int):Boolean
  }
`);
const pool=require("./db")
 
// The root provides a resolver function for each API endpoint
const root = {
    getTodos: (args, req) =>
    pool(req, "SELECT * from todo").then((data) => data),
  getTodo: (args, req) =>
    pool(req, "SELECT * from todo WHERE todo_id = ?", [args.todo_id]).then(
      (data) => data[0]
    ),
  createTodo: (args, req) =>
    pool(req, "INSERT into todo SET description", args).then((data) => data),
  updateTodo: (args, req) =>
    pool(req, "UPDATE todo SET description WHERE todo_id = ?", [
      args.description,args.todo_id
    ]).then((data) => data),
  deleteTodo: (args, req) =>
    pool(req, "DELETE from todo WHERE todo_id = ?", [args.todo_id]).then(
      (data) => data
    ),
};
/*app.use((req, res, next) => {
    req.pgDb = pg.createConnection({
      host: "localhost",
      user: "postgres",
      password: "123456",
      database: "todolist",
      port: 5432,
    });
    req.pgDb.connect();
    next();
  });*/
 
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');