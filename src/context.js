import React, {useState, useContext, useReducer, useEffect} from 'react';
import cartItems from './data';
import reducer from './reducer';

const AppContext = React.createContext()

const initialState ={
  cart: cartItems,
  amount:0,
  total:0
}
const AppProvider =({ children }) =>{
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearCart =()=>{
    dispatch({type: 'CLEAR_CART'})
  }
  const remove =(id)=>{
    dispatch({type: 'REMOVE', payload: id})
  }
  const increase =(id)=>{
    dispatch({type: 'INCREASE', payload: id})
  }
  const decrease =(id)=>{
   dispatch({ type: 'DECREASE', payload: id})
  }
  useEffect(()=>{
    dispatch({type:'GET_TOTALS'})
  }, [state.cart])
  return(
    <AppContext.Provider
    value ={{
     ...state,
     clearCart,
     remove,
     increase,
     decrease
    }}
    >
    {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext =()=>{
  return useContext(AppContext)
}

export { AppProvider, AppContext}