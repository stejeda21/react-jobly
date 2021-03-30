import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import JoblyApi from "../api";

const UserLoginForm = () => {
	const INITIAL_STATE = {
		username: "",
		password: "",
	};
	const history = useHistory();
	const { setToken, setCurrUser } = useContext(UserContext);
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [error, setError] = useState(null);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	async function fetchData() {
		let token;
		try {
			token = await JoblyApi.getAuthorization(formData, "token");
			setToken(token);
			setCurrUser(formData.username);
			setError((state) => "You Logged In... Congrats!!!");
			setFormData(INITIAL_STATE);
			history.push("/");
		} catch (err) {
			setError(err[0]);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		fetchData();
	};

	return (
		<>
			<Container>
				<Row className="justify-content-md-center">
					<Col sm={5}>
						<Jumbotron>
							<small className="m-2 text-danger">{error}</small>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="loginUserName">
									<Form.Control
										type="text"
										name="username"
										placeholder="Enter your username"
										onChange={handleChange}
										value={formData.username}
									/>
								</Form.Group>

								<Form.Group controlId="loginUserPassword">
									<Form.Control
										type="password"
										name="password"
										placeholder="Password"
										onChange={handleChange}
										value={formData.password}
									/>
								</Form.Group>
								<Button variant="primary" type="submit" className="mt-3">
									Login
								</Button>
							</Form>
						</Jumbotron>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default UserLoginForm;
