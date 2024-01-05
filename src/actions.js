// Action Types
export const ADD_LIST = 'ADD_LIST';
export const ADD_TASK = 'ADD_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const addList = title => ({ type: ADD_LIST, title });
export const addTask = (listId, task) => ({ type: ADD_TASK, listId, task });
export const toggleTask = (listId, taskId) => ({ type: TOGGLE_TASK, listId, taskId });
export const deleteTask = (listId, taskId) => ({ type: DELETE_TASK, listId, taskId });
export const login = user => ({ type: LOGIN, user });
export const logout = () => ({ type: LOGOUT });
