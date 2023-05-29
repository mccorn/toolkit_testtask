import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import store from './app/redux/store'
import './index.css'
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const token = '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';

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
