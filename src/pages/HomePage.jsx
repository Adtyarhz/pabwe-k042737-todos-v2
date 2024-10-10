import { useSelector } from "react-redux";
function HomePage() {
	const { authLogin = null } = useSelector((states) => states);
	return (
		<section>
			<div className="container pt-1">
				<div className="card">
					<div className="card-body">
						<h3>Hello, {authLogin.name}</h3>
					</div>
				</div>
			</div>
		</section>
	);
}
export default HomePage;
