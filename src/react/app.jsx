import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { MemoryRouter, BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/login.jsx'
import Issues from './components/issues.jsx'
import Group from './components/group.jsx'

const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' })
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
});
const link = authLink.concat(httpLink)
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <MemoryRouter initialEntries={['/login']}>
            <Switch>
              <Route exact path="/" component={Group} />
              <Route path="/login" component={Login} />
              <Route path="/issue" component={Issues} />
              <Route render={() => <p>Not Found</p>} />
            </Switch>
          </MemoryRouter>
        </div>
      </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('main_container')
)
