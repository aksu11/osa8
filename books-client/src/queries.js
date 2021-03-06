import { gql  } from '@apollo/client'

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String){
    allBooks(author: $author, genre: $genre)  {
      id
      title
      published
      author{
        name
        born
        bookCount
      }
      genres
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`
export const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      id
      title
      author{
        id
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
