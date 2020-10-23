import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  // const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
      const genreArray = []
      result.data.allBooks.forEach( b => {
        b.genres.forEach( g => {
          if(!genreArray.includes(g)) genreArray.push(g)
        })
      })
      setGenres(genreArray)
    }
  }, [result])

  const filterByGenre = (genre) => {
    const booksByGenre = []
    result.data.allBooks.forEach( book => {
      if(book.genres.includes(genre)) booksByGenre.push(book)
    })
    setBooks(booksByGenre)
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Books</h2>
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
      <div>
        {
          genres.map( g => <button key={g} onClick={() => filterByGenre(g)}>{g}</button>)
        }
        <button onClick={() => setBooks(result.data.allBooks)}>Reset</button>
      </div>
    </div>
  )
}

export default Books