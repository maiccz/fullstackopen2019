import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => {
  return(
    <div>
      find countries <input 
        value={value}
        onChange={onChange}/>
    </div>
  )
}

const Countries = ({ countries }) => {
  const [showDetails, setShowDetails] = useState()
  
  if (countries.length===0) {
    return(
      <>
        No countries to show, specify another filter
      </>
    )
  } else if (countries.length===1) {
    return(
      <Details 
        countries={countries} 
        id={countries.map(country => country.alpha3Code).join()} 
      />
    )
  } else if (countries.length<10) { 
    return(
      <>
        {countries.map(country =>
          <li key={country.alpha3Code}>
          {country.name}
          <button onClick={() => setShowDetails(country.alpha3Code)}>show</button>
          </li>
        )}
        {showDetails ? <Details countries={countries} id={showDetails}/> : '' }
      </>
    )
  }
  return(
    <>
      Too many matches, specify another filter
    </>
  )
}

const Details = ({ countries, id }) => {
  return(
    <>
      {countries
        .filter(country => country.alpha3Code === id)
        .map(country =>
          <div key={country.alpha3Code}>
            <h2>{country.name}</h2>
            capital {country.capital}
            <br></br>
            population {country.population}
            <h3>languages</h3>
            <ul>
              {country.languages.map(language => 
                  <li key={language.iso639_1}>{language.name}</li>
              )}
            </ul>
            <img src={country.flag} alt="country.flag" height="100" width="100"></img>
            <br></br>
          </div>
        )
      }
    </>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = (newFilter.length > 0)
  ? countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  : []

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
} 

export default App