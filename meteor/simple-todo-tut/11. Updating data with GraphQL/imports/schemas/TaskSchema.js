import gql from 'graphql-tag';
// create schema for tasks
const TaskSchema = gql`
  type Query {
    tasks: [Task]
  } 

  type Mutation {
    addTask(text: String!): Task
    # the return type is nullable, so we do not have to
    # return the Task
    updateTask(isChecked: Boolean, taskId: ID!): Task
    deleteTask(taskId: ID): Task
  }
  
  type Task {
    _id: ID!
    text: String
    createdAt: String
    isChecked: Boolean
    user: User
  }
`;

export default TaskSchema;