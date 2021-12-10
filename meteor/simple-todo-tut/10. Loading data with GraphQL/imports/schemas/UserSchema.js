import gql from 'graphql-tag';
// we can define graphql types like below
const UserSchema = gql`
  type Query { # type of query
    loggedUser: User # this returns a user object
  } 
  
  type User { # everything a user object contains
    _id: ID!
    username: String
  }
`;

export default UserSchema;