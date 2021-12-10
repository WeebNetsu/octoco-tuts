import gql from 'graphql-tag';
// create schema for tasks
const TaskSchema = gql`
  type Query {
    tasks: [Task]
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