import React from 'react' //, { lazy, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getT } from '../../actions/posts';
import { CButton } from '@coreui/react'
import { store } from '../../index';

const fetchTodos = (dispatch, getState) => {
  const stateAfter = store.getState()
  console.log('Todos after dispatch: ', stateAfter)
}

const Ticker = (e) => {
  const dispatch = useDispatch();
  
  const getServer = async (e) => {
    console.log("START");
    dispatch(getT());
    console.log("FINISH");
  };

  return (
    <>
      <CButton onClick={getServer}>Click This</CButton>
      <CButton onClick={fetchTodos}>Click This</CButton>

      {/* <Items></Items> */}
    </>
  )
}

export default Ticker
