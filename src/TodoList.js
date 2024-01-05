import React from 'react';
import { connect } from 'react-redux';
import { addTask, toggleTask, deleteTask } from './actions';

const TodoList = ({ token, list, addTask, toggleTask, deleteTask }) => {
  let input;
  const createTask = async function () {
    const r = await fetch("http://localhost:3000/todo-lists/"+list.id+"/tasks/", {
      method: "POST",
      body: JSON.stringify({text: input.value}),
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
  
    const data = await r.json()
  
    console.log(data)
    const item = data.tasks.pop();
    addTask(list.id, { id: item._id, text: item.text, completed: item.completed });
    input.value = '';
  }
  const changeTask = async function (task) {
    await fetch("http://localhost:3000/todo-lists/"+list.id+"/tasks/"+task.id, {
      method: "PUT",
      body: JSON.stringify({completed: !task.completed}),
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
    toggleTask(list.id, task.id);
  }
  const deletedTask = async function (task) {
    await fetch("http://localhost:3000/todo-lists/"+list.id+"/tasks/"+task.id, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
    deleteTask(list.id, task.id);
  }
  return (
    <div>
      <h1>Todo List:</h1>
      <h2>{list.title}</h2>
      <input ref={node => (input = node)} />
      <button onClick={createTask}>
        Add Task
      </button>
      <ul>
        {list.tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => changeTask(task)}>
              {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
            </button>
            <button onClick={() => deletedTask(task)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Map state and dispatch to props
const mapStateToProps = (state, ownProps) => ({ list: state.lists.find(list => list.id === ownProps.listId), token: state.token });
const mapDispatchToProps = dispatch => ({
  addTask: (listId, task) => dispatch(addTask(listId, task)),
  toggleTask: (listId, taskId) => dispatch(toggleTask(listId, taskId)),
  deleteTask: (listId, taskId) => dispatch(deleteTask(listId, taskId))
});

// Connect component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
