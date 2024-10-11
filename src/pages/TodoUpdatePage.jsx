import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  asyncDetailTodo,
  asyncUpdateTodo,
  updateTodoActionCreator,
} from "../states/todos/action";

const TodoUpdatePage = () => {
  const { id } = useParams(); // Get ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current todo details from the state
  const todo = useSelector((state) => state.detailTodo);
  const isUpdateTodo = useSelector((state) => state.isUpdateTodo);

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_finished: false, // Initialize is_finished
  });

  // Fetch todo details when the page loads
  useEffect(() => {
    dispatch(asyncDetailTodo(id));
  }, [dispatch, id]);

  // Fill form with existing todo data
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        is_finished: todo.is_finished, // Set is_finished from existing todo
      });
    }
  }, [todo]);

  // Navigate when the todo is successfully updated
  useEffect(() => {
    if (isUpdateTodo) {
      navigate(`/todo/${id}`);
      dispatch(updateTodoActionCreator(false)); // Reset update status
    }
  }, [isUpdateTodo, navigate, id, dispatch]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox input
    });
  };

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await dispatch(asyncUpdateTodo({ id, ...formData }));
		} catch (error) {
			console.error("Update error:", error);
		}
	};

	return (
		<div
			className="container"
			style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
		>
			<h1 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Todo</h1>
			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column", gap: "15px" }}
			>
				<div>
					<label
						htmlFor="title"
						style={{
							display: "block",
							marginBottom: "5px",
							fontWeight: "bold",
						}}
					>
						Title:
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						style={{
							width: "100%",
							padding: "8px",
							borderRadius: "5px",
							border: "1px solid #ccc",
						}}
					/>
				</div>
				<div>
					<label
						htmlFor="description"
						style={{
							display: "block",
							marginBottom: "5px",
							fontWeight: "bold",
						}}
					>
						Description:
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						style={{
							width: "100%",
							padding: "8px",
							borderRadius: "5px",
							border: "1px solid #ccc",
						}}
					/>
				</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<label htmlFor="is_finished" style={{ marginRight: "10px" }}>
						<input
							type="checkbox"
							id="is_finished"
							name="is_finished"
							checked={formData.is_finished}
							onChange={handleChange}
							style={{ marginRight: "5px" }}
						/>
						Finished
					</label>
				</div>
				<button
					type="submit"
					onClick={() => navigate(`/`)}
					style={{
						padding: "10px 20px",
						backgroundColor: "#007bff",
						color: "#fff",
						border: "none",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					Update Todo
				</button>
			</form>
		</div>
	);
};

export default TodoUpdatePage;
