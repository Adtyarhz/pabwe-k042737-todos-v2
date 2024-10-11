import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "../components/TodoList";
import {
  asyncGetTodos,
  asyncDeleteTodo,
  deleteTodoActionCreator,
  asyncChangeCoverTodo, // Import action untuk change cover
} from "../states/todos/action";

function HomePage() {
  const { todos = [], isDeleteTodo = false } = useSelector((states) => states);
  const queryParams = new URLSearchParams(location.search);
  const is_finished = queryParams.get("is_finished") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDeleteTodo) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo berhasil dihapus!",
        showConfirmButton: false,
        timer: 700,
      });
      dispatch(deleteTodoActionCreator(false));
    }
    dispatch(asyncGetTodos(is_finished));
  }, [dispatch, isDeleteTodo, is_finished]);

  const onDeleteTodo = (id) => {
    dispatch(asyncDeleteTodo(id));
  };

  // Fungsi untuk menangani perubahan cover
  const onChangeCover = (id, event) => {
    const cover = event.target.files[0]; // Mendapatkan file cover yang diunggah
    dispatch(asyncChangeCoverTodo({ id, cover }));
  };

  return (
    <section>
      <div className="container pt-1">
        <TodoList
          todos={todos}
          onDeleteTodo={onDeleteTodo}
          onChangeCover={onChangeCover} // Pass fungsi onChangeCover ke TodoList
        ></TodoList>
      </div>
    </section>
  );
}
export default HomePage;
