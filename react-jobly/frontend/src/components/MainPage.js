import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
const MainPage = () => {
	return (
		<div>
			<NavLink exact to="/login">
				<Button variant="primary" className="mr-3">
					Login
				</Button>
			</NavLink>
			<NavLink exact to="/register">
				<Button variant="primary">Sign Up</Button>
			</NavLink>
		</div>
	);
};

export default MainPage;
