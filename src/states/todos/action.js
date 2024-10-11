import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";
const ActionType = {
<<<<<<< HEAD
	GET_TODOS: "GET_TODOS",
	ADD_TODO: "ADD_TODO",
	UPDATE_TODO: "UPDATE_TODO",
	DELETE_TODO: "DELETE_TODO",
	DETAIL_TODO: "DETAIL_TODO",
=======
  GET_TODOS: "GET_TODOS",
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO",
  DETAIL_TODO: "DETAIL_TODO",
>>>>>>> cdf82548f7b02d5bae10ed0e9d43f148ce3407c7
};
function getTodosActionCreator(todos) {
  return {
    type: ActionType.GET_TODOS,
    payload: {
      todos,
    },
  };
}
function addTodoActionCreator(status) {
  return {
    type: ActionType.ADD_TODO,
    payload: {
      status,
    },
  };
}
function updateTodoActionCreator(status) {
  return {
    type: ActionType.UPDATE_TODO,
    payload: {
      status,
    },
  };
}
function updateTodoActionCreator(status){
	return {
		type: ActionType.UPDATE_TODO,
		payload: {
			status,
		}
	}
}
function deleteTodoActionCreator(status) {
  return {
    type: ActionType.DELETE_TODO,
    payload: {
      status,
    },
  };
}
function detailTodoActionCreator(todo) {
  return {
    type: ActionType.DETAIL_TODO,
    payload: {
      todo,
    },
  };
}
function asyncGetTodos(is_finished) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const todos = await api.getAllTodos(is_finished);
      dispatch(getTodosActionCreator(todos));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}
function asyncAddTodo({ title, description }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postAddTodo({ title, description });
      dispatch(addTodoActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}
function asyncDeleteTodo(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteTodo(id);
      dispatch(deleteTodoActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}
function asyncUpdateTodo(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.putUpdateTodo(id);
      dispatch(updateTodoActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}
function asyncUpdateTodo(id) {
	return async (dispatch) => {
		dispatch(showLoading());
		try {
			await api.putUpdateTodo(id);
			dispatch(updateTodoActionCreator(true));
		} catch (error) {
			showErrorDialog(error.message);
		}
		dispatch(hideLoading());
	}
}
function asyncDetailTodo(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const todo = await api.getDetailTodo(id);
      dispatch(detailTodoActionCreator(todo));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}
export {
<<<<<<< HEAD
	ActionType,
	getTodosActionCreator,
	asyncGetTodos,
	addTodoActionCreator,
	asyncAddTodo,
	deleteTodoActionCreator,
	asyncDeleteTodo,
	updateTodoActionCreator,
	asyncUpdateTodo,
	detailTodoActionCreator,
	asyncDetailTodo,
=======
  ActionType,
  getTodosActionCreator,
  asyncGetTodos,
  addTodoActionCreator,
  asyncAddTodo,
  deleteTodoActionCreator,
  asyncDeleteTodo,
  updateTodoActionCreator,
  asyncUpdateTodo,
  detailTodoActionCreator,
  asyncDetailTodo,
>>>>>>> cdf82548f7b02d5bae10ed0e9d43f148ce3407c7
};
