import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = (newFilter.length > 0)
  ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  : persons

  const rows = () => personsToShow.map(person =>
    <li key={person.id}>{person.name} {person.number}</li>
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input 
          value={newFilter}
          onChange={handleFilterChange}/>
      </div>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}/>
      </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {rows()}
        </ul>
    </div>
  )
}

export default App