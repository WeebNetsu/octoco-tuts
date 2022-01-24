/* 
meteor update (update to meteor 2.5.1 recommended)

meteor add quave:graphql

meteor npm install graphql@^15.0.0 graphql-tools graphql-load apollo-client apollo-cache-inmemory apollo-link-error apollo-link-ddp @apollo/react-hooks
*/

import { Meteor } from 'meteor/meteor';
import { startGraphQLServer } from 'meteor/quave:graphql/server';

const log = error => console.error('GraphQL server error', error);

// we can define graphql types like below
const UserSchema = `
  type Query { # type of query
    loggedUser: User # this returns a user object
  } 
  
  type User { # everything a user object contains
    _id: ID!
    username: String
  }
`;

const UserResolvers = { // create resulver
  Query: {
    //   resolver takes in 4 arguments
    // args -> if argument passed in, eg: loggedUser(id: String): User
    async loggedUser(root, args, context, info) {
      if (!context.userId) { // check if user ID exists in context
        return null;
      }
    //   returns user
      return Meteor.users.findOne(context.userId);
    },
  },
};

// below will start up the server
startGraphQLServer({ typeDefs: [UserSchema], resolvers: [UserResolvers], log });