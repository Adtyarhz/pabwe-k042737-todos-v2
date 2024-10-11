import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { asyncDetailTodo } from "../states/todos/action";

const TodoDetailPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	// Get todo details from the state
	const todo = useSelector((state) => state.detailTodo);

	// Fetch todo details when the page loads
	useEffect(() => {
		dispatch(asyncDetailTodo(id));
	}, [dispatch, id]);

	if (!todo) {
		return <p>Loading...</p>;
	}

	return (
		<div
			className="container"
			style={{ maxWidth: "600px", margin: "20px auto" }}
		>
			<div
				className="card"
				style={{
					padding: "20px",
					borderRadius: "8px",
					boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
				}}
			>
				<div className="card-body">
					<h2 style={{ marginBottom: "10px" }}>{todo.title}</h2>
					<p style={{ fontSize: "14px", color: "#888", marginBottom: "10px" }}>
						{todo.is_finished ? (
							<span style={{ color: "green", fontWeight: "bold" }}>
								Selesai
							</span>
						) : (
							<span style={{ color: "red", fontWeight: "bold" }}>
								Belum Selesai
							</span>
						)}
					</p>
					<p style={{ marginBottom: "15px" }}>{todo.description}</p>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<span style={{ fontSize: "12px", color: "#666" }}>
							{new Date(todo.created_at).toLocaleTimeString()} -{" "}
							{new Date(todo.created_at).toLocaleDateString()}
						</span>
						<Link
							to={`/todos/${id}/edit`}
							className="btn btn-primary"
							style={{
								padding: "8px 12px",
								fontSize: "14px",
								backgroundColor: "#007bff",
								color: "#fff",
								textDecoration: "none",
								borderRadius: "4px",
								border: "none",
							}}
						>
							Edit
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoDetailPage;
