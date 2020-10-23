import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import AddBook from './components/AddBook'
import Login from './components/Login'
import Recommended from './components/Recommended'

function App() {
  const [view, setView] = useState(window.localStorage.getItem('view'))
  const [token, setToken] = useState(window.localStorage.getItem('books-user-token'))
  const client = useApolloClient()

  const changeView = (view) => {
    window.localStorage.setItem('view', view)
    setView(view)
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    window.location.href = '/'
  }

  return (
    <div>
      <div>
        <button onClick={() => changeView('authors')}>Authors</button>
        <button onClick={() => changeView('books')}>Books</button>
        {!token ? <button onClick={() => changeView('login')}>Login</button> : null }
        {token ? <button onClick={() => changeView('add')}>Add book</button> : null }
        {token ? <button onClick={() => changeView('recommended')}>Recommended</button>: null }
        {token ? <button onClick={logout}>Log out</button> : null }
      </div>
      {
      view === 'add' ? <AddBook /> : view === 'books' ? <Books /> : view === 'authors' ? <Authors /> :
      view === 'recommended' ? <Recommended /> : <Login setToken={setToken}/>
      }
    </div>
  )
}

export default App
