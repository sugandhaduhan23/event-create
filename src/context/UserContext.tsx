import { User } from "../models/user.model";
import { createContext, ReactNode, useReducer } from "react";

enum UserActionTypes {
  SAVE_USERS = "SAVE_USERS",
  ADD_USER = "ADD_USER",
  EDIT_USER = "EDIT_USER",
  DELETE_USER = "DELETE_USER",
}

export interface UserContextType {
  users: User[];
  saveUsers: (user: User[]) => void;
  addUser: (user: User) => void;
  editUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

const UserContext = createContext<UserContextType>({
  users: [],
  saveUsers: () => {},
  addUser: (user: User) => user,
  editUser: (user: User) => user,
  deleteUser: () => {},
});

const initialState: User[] = [];

type UserAction =
  | { type: UserActionTypes.SAVE_USERS; payload: User[] }
  | { type: UserActionTypes.ADD_USER; payload: User }
  | { type: UserActionTypes.EDIT_USER; payload: User }
  | { type: UserActionTypes.DELETE_USER; payload: string };

const userReducer = (state: User[], action: UserAction): User[] => {
  switch (action.type) {
    case UserActionTypes.SAVE_USERS:
      return [...action.payload];
    case UserActionTypes.ADD_USER:
      return [action.payload, ...state]
    case UserActionTypes.EDIT_USER:
      return state.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    case UserActionTypes.DELETE_USER:
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [users, dispatch] = useReducer(userReducer, initialState);

  const saveUsers = (users: User[]) => {
    dispatch({
      type: UserActionTypes.SAVE_USERS,
      payload: users,
    });
  };

  const addUser = (user: User) => {
    dispatch({
      type: UserActionTypes.ADD_USER,
      payload: user,
    });
  };

  const editUser = (user: User) => {
    dispatch({
      type: UserActionTypes.EDIT_USER,
      payload: user,
    });
  };

  const deleteUser = (id: string) => {
    dispatch({
      type: UserActionTypes.DELETE_USER,
      payload: id,
    });
  };

  const contextValue = {
    users,
    saveUsers,
    addUser,
    editUser,
    deleteUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export default UserContext;
