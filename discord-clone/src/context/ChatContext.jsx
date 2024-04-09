import {
    createContext,
    useContext,
    useReducer,
  } from "react";
  import { useAuthState } from 'react-firebase-hooks/auth';
  import { auth, db } from '../firebase';
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const [currentUser] = useAuthState(auth);
    const INITIAL_STATE = {
      chatId: null,
      user: null,
      chats: []
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          // Make sure we have both currentUser and the payload before creating a chatId
      if (currentUser?.uid && action.payload?.uid) {
        return {
          ...state,
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid
            ? currentUser.uid + action.payload.uid
            : action.payload.uid + currentUser.uid,
        };
      } else {
        return state; // Return the current state if we don't have valid uids
      }
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };