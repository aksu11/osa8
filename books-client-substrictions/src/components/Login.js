import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, LOGIN} from '../queries'

const Login = ({setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    refetchQueries: [ {query: ALL_AUTHORS}, {query: ALL_BOOKS} ]
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      localStorage.setItem('books-user-token', token)
      localStorage.setItem('view', 'books')
      setToken(token)
      window.location.href = '/'
    }
  }, [result.data]) // eslint-disable-line

  const handleFieldChange = (event) => {
    if(event.target.name === 'username') setUsername(event.target.value)
    else if (event.target.name === 'password') setPassword(event.target.value)
  }

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return(
    <form onSubmit={submit}>
      <div>Username: </div>
      <div><input type ='text' value={username} name='username' onChange={handleFieldChange} /></div>
      <div>Password: </div>
      <div><input type='text' value={password} name='password' onChange={handleFieldChange} /></div>
      <button type='submit'>Login</button>
    </form>
  )

 }

 export default Login

