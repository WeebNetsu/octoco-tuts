import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';

// new imports
import { startGraphQLClient } from 'meteor/quave:graphql/client';
import { ApolloProvider } from '@apollo/react-hooks';

// below will allow us to connect to dev tools w/apollo exension
// https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm/related
// Using it: https://react-tutorial.meteor.com/simple-todos-graphql/01-graphql-setup.html#1-4-See-Apollo-Dev-Tools-working
const apolloClient = startGraphQLClient({ connectToDevTools: true });

/* 
Example query
query MyQuery {
    loggedUser {
        _id
        username
    }
}
*/

Meteor.startup(() => {
  render(
    // below code will now include apollo in application
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
    , document.getElementById('react-target'));
});
