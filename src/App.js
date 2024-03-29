import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducer from './reducer';
import TodoList from './TodoList';
import Login from './Login';
import { addList } from './actions';
import './App.css';

// Store
const store = createStore(reducer);
const createList = async function (token, title) {
  const r = await fetch("http://localhost:3000/todo-lists/", {
    method: "POST",
    body: JSON.stringify({title}),
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    }
  })

  const data = await r.json()

  console.log(data)

  return data
}
// App Component
const AppComponent = ({ token, lists, addList }) => {
  let input;

  return (
    <>
    <title>Todo List</title>
      {token ? (
        <div>
          <h2>Todo List - Create a list</h2>
          <input ref={node => (input = node)} />
          <button onClick={ async () => addList( await createList(token, input.value))}>
            Add List
          </button>
          {lists.map(list => <TodoList key={list.id} listId={list.id} />)}
        </div>
      ) : (
        <Login />
      )}
    <footer>Ramandeep Singh Dehal</footer>
    </>
  );
};

// Map state to props
const mapStateToProps = state => ({ token: state.token, lists: state.lists });
const mapDispatchToProps = dispatch => ({
  addList: (data) => dispatch(addList(data))
});

// Connect component to Redux store
const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

// Provider
const AppProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppProvider;
