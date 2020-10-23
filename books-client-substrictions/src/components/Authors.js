import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from '../queries'
import { isNumber } from 'util'

const Authors = () => {
	const [dropdown, setDropdown] = useState(undefined)
	const [year, setYear] = useState('')

	const result = useQuery(ALL_AUTHORS)
	const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS}, {query: ALL_BOOKS} ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
	})
	
  if (result.loading) return (<div>loading...</div>)
	
	const handleDropdown = (event) => {
		event.preventDefault()
		setDropdown(event.target.value)
	}

	const handleYear = (event) => {
		event.preventDefault()
		setYear(event.target.value)
	}

	const submit = (event) => {
    event.preventDefault()
    console.log(dropdown)
    console.log(isNumber(year))
    if(dropdown && year !== '') {
      editAuthor({ variables: {name: dropdown, setBornTo: parseInt(year)} })
      setDropdown('')
      setYear('')
    }
	}

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allAuthors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>Select writer: </div>
				<select value={dropdown} onChange={handleDropdown} >
          <option label=" "></option>
					{result.data.allAuthors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
				</select>
				<div>Year: </div>
				<input type='text' value={year} onChange={handleYear}/>
				<button type='submit'>Update writer</button>
      </form>
    </div>
  )
}

export default Authors