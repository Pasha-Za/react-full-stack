import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import App from './App'
import store from './store/store'

//gql
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

//context
import { StateProvider } from './context/contextState';
import { initialState, mainReducer } from './context/reducers';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <StateProvider reducer={mainReducer} initialState={initialState}>
        <App />
      </StateProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);