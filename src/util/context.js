import React, { useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'

const AppContext = React.createContext()

const getItemsFromLS = () => {
  let habitList = localStorage.getItem('habitList')
  if (habitList) {
    return (habitList = JSON.parse(localStorage.getItem('habitList')))
  } else {
    return []
  }
}

const initialState = {
  habitList: getItemsFromLS(),
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    localStorage.setItem('habitList', JSON.stringify(state.habitList))
  }, [state])

  const addHabit = (item) => {
    dispatch({ type: 'ADD_HABIT', payload: item })
  }

  const setArray = (id, array) => {
    dispatch({ type: 'SET_ARRAY', payload: { id, array } })
  }
  const completeDay = ({ id, date, day }) => {
    dispatch({ type: 'COMPLETE_DAY', payload: { id, date, day } })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        addHabit,
        completeDay,
        setArray,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
