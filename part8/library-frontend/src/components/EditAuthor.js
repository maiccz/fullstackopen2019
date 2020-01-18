import React, { useState } from 'react'

const EditAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    console.log(props)

    await props.editAuthor({
      variables: { name, setBornTo: born }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <select value={name}  onChange={({ target }) => setName(target.value)}>
          {props.authors.map( author => 
            <option value={author.name}>{author.name}</option>
          )}
        </select>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditAuthor