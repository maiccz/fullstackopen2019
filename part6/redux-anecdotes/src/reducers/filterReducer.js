const initialState = 0

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return initialState
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer