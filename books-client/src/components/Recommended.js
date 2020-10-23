import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = () => {
  const [books, setBooks] = useState([])
  const user = useQuery(ME)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if(user.data) {
      getBooks({ variables: {genre: user.data.me.favoriteGenre }})
    }
  }, [user, getBooks])

  useEffect(() => {
    if(result.data) setBooks(result.data.allBooks)
  }, [result.data])

  if (user.loading || result.loading)  {
    return <div>loading...</div>
  } else {
    console.log(books)
  }

  return (
    <div>
      <h2>Recommended</h2>
      <h4>Books in your favourite genre patterns: </h4>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {
          books.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )

}

export default Recommended

// {"allBooks":
// [{"__typename":"Book","id":"5f68c8cb1ba1fe619e0b3d46","title":"Crime and punishment","published":1866,"author":{"__typename":"Author","name":"Fyodor Dostoevsky","born":1821,"bookCount":2},"genres":["classic","crime"]},
// {"__typename":"Book","id":"5f68dd1952c56a79a2fe33a7","title":"Tappajan tyttöystävä: ja muita rikoksia","published":2018,"author":{"__typename":"Author","name":"Leena Lehtolainen","born":1964,"bookCount":1},"genres":["crime"]},
// {"__typename":"Book","id":"5f6dbec42ff050275731050d","title":"Hirtettyjen kettujen metsä","published":1983,"author":{"__typename":"Author","name":"Arto Paasilinna","born":1942,"bookCount":7},"genres":["humor","crime"]}]}