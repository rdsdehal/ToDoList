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

// App Component
const AppComponent = ({ user, lists, addList }) => {
  let input;

  return (
    <div>
      {user ? (
        <div>
          <h2>Todo List - Create a list</h2>
          <input ref={node => (input = node)} />
          <button onClick={() => addList(input.value)}>
            Add List
          </button>
          {lists.map(list => <TodoList key={list.id} listId={list.id} />)}
        </div>
      ) : (
        <Login />
      )}
    <footer>Ramandeep Singh Dehal</footer>
    </div>
  );
};

// Map state to props
const mapStateToProps = state => ({ user: state.user, lists: state.lists });
const mapDispatchToProps = dispatch => ({
  addList: title => dispatch(addList(title))
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
