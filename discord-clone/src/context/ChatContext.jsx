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
          if (currentUser?.uid && action.payload?.uid && currentUser.uid !== action.payload.uid) {
            const chatId = currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid;
            return {
              ...state,
              user: action.payload,
              chatId: chatId,
            };
          }
          return {
            ...state,
            user: null,
            chatId: null,
          };
        // ... other actions
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };