import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import store from './app/redux/store'
import './index.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    // authorization: `Bearer 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`,
    authorization: `Bearer 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 `,
    // authorization: `Bearer ${document.process.env.GRAPHQL_API_KEY}`,
  },
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
