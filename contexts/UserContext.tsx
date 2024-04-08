import React, {useState } from 'react';
import createDataContext from './createDataContext';

export const UserContext = createDataContext();

const UserReducer = (state:any,action:any) => {

  switch (action.type){
    case "addUser":
      console.log(action.payload);
      state.users = [...state.users, action.payload]  
      console.log(state.users);
      return state;
  }


};

const addUser = (dispatch:any) => (request:any) => {
  dispatch({ type: "addUser", payload: { request: request } });
};

export const { Context, Provider:UserProvider } = createDataContext(
  UserReducer,
  {
   addUser
  },
  {
    users:[{}]
  }
);