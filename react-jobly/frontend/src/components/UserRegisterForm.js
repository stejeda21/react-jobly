
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import JoblyApi from "../api";

const UserRegisterForm = () => {
	const INITIAL_STATE = {
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: "",
	};
	const history = useHistory();
	const { setToken, setCurrUser } = useContext(UserContext);
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [message, setMessage] = useState("");

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	async function fetchData() {
		let token;
		try {
			token = await JoblyApi.getAuthorization(formData, "register");
			setToken(token);
			setCurrUser(formData.username);
			setFormData(INITIAL_STATE);
			history.push("/");
		} catch (err) {
			setMessage(err[0]);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchData();
	};

	return (
		<>
			<Container>
				<Row className="justify-content-md-center">
					<Col sm={5}>
						<Jumbotron>
							<small className="text-danger">{message}</small>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="registerUserName">
									<Form.Control
										type="text"
										name="username"
										onChange={handleChange}
										value={formData.username}
										placeholder="Enter your username"
									/>
								</Form.Group>

								<Form.Group controlId="registerUserPassword">
									<Form.Control
										type="password"
										name="password"
										onChange={handleChange}
										value={formData.password}
										placeholder="Password"
									/>
								</Form.Group>
								<Form.Group controlId="registerUserFirstName">
									<Form.Control
										type="text"
										name="firstName"
										onChange={handleChange}
										value={formData.firstName}
										placeholder="First Name"
									/>
								</Form.Group>
								<Form.Group controlId="registerUserLastName">
									<Form.Control
										type="text"
										name="lastName"
										onChange={handleChange}
										value={formData.lastName}
										placeholder="Last Name"
									/>
								</Form.Group>
								<Form.Group controlId="registerUserEmail">
									<Form.Control
										type="email"
										name="email"
										onChange={handleChange}
										value={formData.email}
										placeholder="Email"
									/>
								</Form.Group>
								<Form.Text className="text-muted">
									<NavLink exact to="/login">
										Already Registered? Login Here
									</NavLink>
								</Form.Text>
								<Button variant="primary" type="submit" className="mt-3">
									Sign Up
								</Button>
							</Form>
						</Jumbotron>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default UserRegisterForm;