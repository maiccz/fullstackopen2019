import React, { useState, useEffect } from 'react'
import personService from './services/persons' 

import Filter from './components/filter'
import PersonForm from './components/person_form'
import Persons from './components/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

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

      personService
      .create(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = id => {

    personService
    .deleteOne(id)
    .then(data => {
      setPersons(persons.filter(person => person.id !== id))

    })
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
        <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
} 

export default App