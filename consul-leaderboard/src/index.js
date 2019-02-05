import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';


const httpLink = createHttpLink({
  uri: 'https://consul.beta.gccollab.ca/graphql',
  credentials: 'include'
});


const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": "emvNBM+jupuHD+QjZpMHZ81YQ2gSEaNEgIW+8gzPhctL9ap/CIz4ZSzMb/RYyTuHBdxx9IADWvwyM1AepMeieg=="
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
