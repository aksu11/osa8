import React, { useState } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import AddBook from './components/AddBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

function App() {
  const [view, setView] = useState(window.localStorage.getItem('view'))
  const [token, setToken] = useState(window.localStorage.getItem('books-user-token'))
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

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
      view === 'add' ? <AddBook updateCacheWith={updateCacheWith} /> : view === 'books' ? <Books /> : view === 'authors' ? <Authors /> :
      view === 'recommended' ? <Recommended /> : <Login setToken={setToken}/>
      }
    </div>
  )
}

export default App
