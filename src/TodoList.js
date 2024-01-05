import React from 'react';
import { connect } from 'react-redux';
import { addTask, toggleTask, deleteTask } from './actions';

const TodoList = ({ list, addTask, toggleTask, deleteTask }) => {
  let input;
  const handleAddTask = () => {
    addTask(list.id, { id: Date.now(), text: input.value, completed: false });
    input.value = ''; 
  };
  return (
    <div>
      <h1>Todo List:</h1>
      <h2>{list.title}</h2>
      <input ref={node => (input = node)} />
      <button onClick={handleAddTask}>
        Add Task
      </button>
      <ul>
        {list.tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => toggleTask(list.id, task.id)}>
              {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
            </button>
            <button onClick={() => deleteTask(list.id, task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Map state and dispatch to props
const mapStateToProps = (state, ownProps) => ({ list: state.lists.find(list => list.id === ownProps.listId) });
const mapDispatchToProps = dispatch => ({
  addTask: (listId, task) => dispatch(addTask(listId, task)),
  toggleTask: (listId, taskId) => dispatch(toggleTask(listId, taskId)),
  deleteTask: (listId, taskId) => dispatch(deleteTask(listId, taskId))
});

// Connect component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
