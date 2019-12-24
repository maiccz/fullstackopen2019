import React, { useState } from 'react'

const Filter = ({ value, onChange }) => {
  return(
    <div>
      filter shown with: <input 
        value={value}
        onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({ names, values, onChanges, onSubmit }) => {
  return(
    <form onSubmit={onSubmit}>
    {names.map((name, i) => 
      <div key={name}>
        {name}: <input 
        value={values[i]}
        onChange={onChanges[i]}
        />
    </div>
    )}
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
} 

const Persons = ({ persons }) => {
  return(
    <>
      {persons.map(person =>
        <li key={person.id}>{person.name} {person.number}</li>
      )}
    </>
  )
}

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add new</h2>
      <PersonForm 
        onSubmit={addPerson}
        names={['name', 'number']}
        values={[newName, newNumber]}
        onChanges={[handleNameChange, handleNumberChange]}
      />
      <h2>Numbers</h2>
        <Persons persons={personsToShow} />
    </div>
  )
} 

export default App