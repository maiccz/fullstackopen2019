import React from 'react'
import EditAuthor from './EditAuthor'

const Authors = (props) => {
  
  const authors = props.result.data.allAuthors
  
  if (props.result.loading) {
    return <div>loading...</div>
  }


  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
          <h2>Ser birthday</h2>
          <EditAuthor authors={authors} editAuthor={props.editAuthor}/>
        </tbody>
      </table>

    </div>
  )
}

export default Authors