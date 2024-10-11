import PropTypes from "prop-types";
import TodoItem, { todoItemShape } from "./TodoItem";

function TodoList({ todos, onDeleteTodo, onChangeCover }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onChangeCover={onChangeCover}
        />
      ))}
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(todoItemShape)).isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onChangeCover: PropTypes.func.isRequired,
};

export default TodoList;
