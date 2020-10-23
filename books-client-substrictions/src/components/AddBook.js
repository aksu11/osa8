import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, CREATE_BOOK, ALL_AUTHORS } from '../queries'

const AddBook = ({updateCacheWith}) => {
  const [title, setTitle] = useState(window.localStorage.getItem('title') || '')
  const [author, setAuthor] = useState(window.localStorage.getItem('author') || '')
  const [year, setYear] = useState(window.localStorage.getItem('year') || '')
  const [genre, setGenre] = useState(window.localStorage.getItem('genre') || '')
  const [genres, setGenres] = useState(window.localStorage.getItem('genres') ? 
    JSON.parse(window.localStorage.getItem('genres')) : [] )

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ {query: ALL_BOOKS}, {query: ALL_AUTHORS} ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  const handleFieldChange = (event) => {
    event.preventDefault()
    if (event.target.name === 'title') {
      setTitle(event.target.value)
      window.localStorage.setItem('title', event.target.value)
    } else if (event.target.name === 'author') {
      setAuthor(event.target.value)
      window.localStorage.setItem('author', event.target.value)
    } else if (event.target.name === 'year') {
      setYear(event.target.value)
      window.localStorage.setItem('year', event.target.value)
    } else if (event.target.name === 'genre') {
      setGenre(event.target.value)
      window.localStorage.setItem('genre', event.target.value)
    } 
  }

  const addGenre = (event) => {
    event.preventDefault()
    const newGenres = genres.concat(genre)
    setGenres(newGenres)
    window.localStorage.setItem('genres', JSON.stringify(newGenres))
    setGenre('')
  }

  const submit = (event) => {
    event.preventDefault()
    const published = parseInt(year)
    createBook({ variables: { title, author, published, genres } })
    setTitle('')
    setAuthor('')
    setYear('')
    setGenre('')
    setGenres([])
    window.localStorage.setItem('title', '')
    window.localStorage.setItem('author', '')
    window.localStorage.setItem('year', '')
    window.localStorage.setItem('genre', '')
    window.localStorage.setItem('genres', [])
    window.localStorage.setItem('view', 'books')
    setTimeout(() => {
      window.location.href = '/'
    }, 2000);
  }

  return(
    <form onSubmit={submit}>
      <div>Title: <input type='text' name='title' value={title} onChange={handleFieldChange}/></div>
      <div>Author: <input type='text' name='author' value={author} onChange={handleFieldChange}/></div>
      <div>Published: <input type='text' name='year' value={year} onChange={handleFieldChange}/></div>
      <div>
        <input type='text' name='genre' value={genre} onChange={handleFieldChange}/>
        <button onClick={addGenre}>Add genre</button>
      </div>
      <div>Genres : {genres.join(', ')}</div>
      <button type='submit'>Create book</button>
    </form>
  )
}

export default AddBook