const initialState = 0

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      console.log('filter', action.filter)
      return action.filter
    default:
      console.log('initialState', initialState)
      return initialState
  }
}

export const filterChange = filter => {
  console.log('filter', filter)
  console.log('initialState', initialState)
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer