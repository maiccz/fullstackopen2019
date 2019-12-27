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
  if (countries.length===0) {
    return(
      <>
        No countries to show, specify another filter
      </>
    )
  } else if (countries.length===1) {
    return(
      <>
        {countries.map(country =>
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
          </div>
        )}
      </>
    )
  } else if (countries.length<10) {
    return(
      <>
        {countries.map(country =>
          <li key={country.alpha3Code}>{country.name}</li>
        )}
      </>
    )
  }
  return(
    <>
      Too many matches, specify another filter
    </>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

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