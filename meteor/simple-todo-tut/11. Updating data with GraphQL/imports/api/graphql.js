// meteor npm install graphql-tag
import { Meteor } from 'meteor/meteor';
import { startGraphQLServer } from 'meteor/quave:graphql/server';
import { TaskCollection } from "/imports/db/TaskCollection";
import UserSchema from '/imports/schemas/UserSchema';
import TaskSchema from '/imports/schemas/TaskSchema';
import TaskResolvers from '/imports/resolvers/TaskResolver';
import UserResolvers from '/imports/resolvers/UserResolver';

const log = error => console.error('GraphQL server error', error);

// below will start up the server
startGraphQLServer({ typeDefs: [UserSchema, TaskSchema], resolvers: [TaskResolvers, UserResolvers], log });