import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  asyncDetailTodo,
  asyncUpdateTodo,
  updateTodoActionCreator,
} from "../states/todos/action";

const TodoUpdatePage = () => {
  const { id } = useParams(); // mendapatkan ID dari URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mengambil detail todo dari state
  const todo = useSelector((state) => state.detailTodo);
  const isUpdateTodo = useSelector((state) => state.isUpdateTodo);

  // Menyimpan form data di state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_finished: false, // Initialize is_finished
  });

  // Mengambil detail todo saat halaman dimuat
  useEffect(() => {
    dispatch(asyncDetailTodo(id));
  }, [dispatch, id]);

  // Mengisi form dengan data todo yang sudah ada
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        is_finished: todo.is_finished, // Set is_finished from existing todo
      });
    }
  }, [todo]);

  // Jika todo berhasil diupdate, navigasikan ke halaman lain
  useEffect(() => {
    if (isUpdateTodo) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo berhasil diupdate!",
        showConfirmButton: false,
        timer: 700,
      });
      navigate(`/todo/${id}`);
      dispatch(updateTodoActionCreator(false)); // Reset status update
    }
  }, [isUpdateTodo, navigate, id, dispatch]);

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox input
    });
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncUpdateTodo({ id, ...formData }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <h1>Edit Todo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="is_finished">
            <input
              type="checkbox"
              id="is_finished"
              name="is_finished"
              checked={formData.is_finished}
              onChange={handleChange}
            />
            Finished
          </label>
        </div>
        <button type="submit">Update Todo</button>
      </form>
    </div>
  );
};

export default TodoUpdatePage;
