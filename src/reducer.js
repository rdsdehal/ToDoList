import { ADD_LIST, ADD_TASK, TOGGLE_TASK, DELETE_TASK, LOGIN, LOGOUT } from './actions';

// Initial state
const initialState = {
  user: null,
  lists: []
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.token };
    case LOGOUT:
      return { ...state, user: null };
    case ADD_LIST:
      return { ...state, lists: [...state.lists, { id: action.id, title: action.title, tasks: [] }] };
    case ADD_TASK:
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.listId
            ? { ...list, tasks: [...list.tasks, action.task] }
            : list
        )
      };
    case TOGGLE_TASK:
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.listId
            ? { ...list, tasks: list.tasks.map(task => task.id === action.taskId ? { ...task, completed: !task.completed } : task) }
            : list
        )
      };
    case DELETE_TASK:
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.listId
            ? { ...list, tasks: list.tasks.filter(task => task.id !== action.taskId) }
            : list
        )
      };
    default:
      return state;
  }
};

export default reducer;
