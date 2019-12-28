import React from 'react'

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

export default PersonForm