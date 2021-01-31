import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-client';
 import { InMemoryCache } from 'apollo-cache-inmemory';
 import { HttpLink } from 'apollo-link-http';
 import { ApolloProvider } from '@apollo/react-hooks';
import reportWebVitals from './reportWebVitals';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://api.spacex.land/graphql/'
    }),
    cache: new InMemoryCache(),
  });
 };

 const client = createApolloClient();

ReactDOM.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
