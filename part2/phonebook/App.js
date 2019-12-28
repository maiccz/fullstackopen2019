import React, { useState, useEffect } from 'react'
import personService from './services/persons' 

import Filter from './components/filter'
import PersonForm from './components/person_form'
import Persons from './components/persons'
import Notification from './components/notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newMessage, setNewMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName && p.number === newNumber)){
      alert(`${newName} is already added to phonebook`)
    } else if (persons.some(p => p.name === newName)){
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) 
      ? updatePerson(newName, newNumber)
      : console.log(false)
    } else {
      createPerson(newName, newNumber)
    }
  }

  const createPerson = (name, number) => {
    const personObject = {
      name: name,
      number: number,
      id: Math.max(...(persons.map(p => p.id))) + 1
    }

    personService
    .create(personObject)
    .then(data => {
      setPersons(persons.concat(data))
      setNewMessage(
        `Added '${data.name}'`
      )
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    })
    setNewName('')
    setNewNumber('')
  }

  const updatePerson = (name, newNumber) => {
    const person = persons.find(p => p.name === name)
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.name !== name ? person : returnedPerson))
        setNewMessage(
          `${returnedPerson.name} number updated` 
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 5000)
      })
      .catch(error => {
        alert(
          `the person '${person.content}' was already deleted from server`
        )
        setPersons(persons.filter(n => n.name !== name))
      })
    setNewName('')
    setNewNumber('')
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
      <Notification message={newMessage} />
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