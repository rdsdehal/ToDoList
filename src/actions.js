// Action Types
export const ADD_LIST = 'ADD_LIST';
export const ADD_TASK = 'ADD_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const addList = data => ({ type: ADD_LIST, title: data.title, id: data._id });
export const addTask = (listId, task) => ({ type: ADD_TASK, listId, task });
export const toggleTask = (listId, taskId) => ({ type: TOGGLE_TASK, listId, taskId });
export const deleteTask = (listId, taskId) => ({ type: DELETE_TASK, listId, taskId });
export const login = data => ({ type: LOGIN, token: data.token, lists: data.lists.map(list => ({ id: list._id, title: list.title, 
    tasks: list.tasks.map(task => ({ id: task._id, text: task.text, completed: task.completed })) }))});
export const logout = () => ({ type: LOGOUT });
