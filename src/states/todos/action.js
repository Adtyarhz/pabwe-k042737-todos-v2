import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_TODOS: "GET_TODOS",
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO",
  DETAIL_TODO: "DETAIL_TODO",
  CHANGE_COVER: "CHANGE_COVER",
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

function changeCoverActionCreator(status) {
  return {
    type: ActionType.CHANGE_COVER,
    payload: {
      status,
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

function asyncUpdateTodo({ id, title, description, is_finished }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.putUpdateTodo({ id, title, description, is_finished });
      dispatch(updateTodoActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
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

function asyncChangeCover(id, coverFile) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postChangeCoverTodo({ id, cover: coverFile });
      dispatch(changeCoverActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
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
  changeCoverActionCreator,
  asyncChangeCover,
};
