import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserContext from "../UserContext";
import JoblyApi from "../api";

const UserInfo = () => {
	const { token, currUser, currUserInfo, setCurrUserInfo } = useContext(
		UserContext
	);
	const [message, setMessage] = useState("");
	const [colorMessage, setColorMessage] = useState("text-danger");
	const INITIAL_STATE = {
		password: "",
		repassword: "",
		firstName: currUserInfo.firstName,
		lastName: currUserInfo.lastName,
		email: currUserInfo.email,
	};
	const [formData, setFormData] = useState(INITIAL_STATE);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.password !== formData.repassword) {
			setMessage("Passwords entered do not match");
		} else {
			setMessage("");
			fetchData();
			setCurrUserInfo({
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				userName: currUser,
			});
			formData.repassword = "";
			setColorMessage("text-success");
			setMessage("Profile has been updated successfully!");
		}
	};

	async function fetchData() {
		try {
			if (token) {
				delete formData.repassword;
				await JoblyApi.editUserInfo(formData, currUser, token);
			}
		} catch (err) {
			setMessage(err[0]);
		}
	}

	return (
		<>
			<Container>
				<Row className="justify-content-md-center">
					<Col sm={5}>
						<Jumbotron>
							<h1>Edit Profile</h1>
							<h1 className="border rounded">
								<i className="fas fa-user-tie border border-dark rounded"></i>
							</h1>
							<small className={`m-2 ${colorMessage}`}>{message}</small>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="editUserFirstName">
									<Form.Control
										type="text"
										name="firstName"
										onChange={handleChange}
										value={formData.firstName}
										placeholder="First Name"
									/>
								</Form.Group>
								<Form.Group controlId="editUserLastName">
									<Form.Control
										type="text"
										name="lastName"
										onChange={handleChange}
										value={formData.lastName}
										placeholder="Last Name"
									/>
								</Form.Group>
								<Form.Group controlId="editUserEmail">
									<Form.Control
										type="email"
										name="email"
										onChange={handleChange}
										value={formData.email}
										placeholder="Email"
									/>
								</Form.Group>
								<Form.Group controlId="editUserPassword">
									<Form.Control
										type="password"
										name="password"
										onChange={handleChange}
										value={formData.password}
										placeholder="Password"
									/>
								</Form.Group>
								<Form.Group controlId="editUserRepassword">
									<Form.Control
										type="password"
										name="repassword"
										onChange={handleChange}
										value={formData.repassword}
										placeholder="Renter your Password"
									/>
								</Form.Group>
								<Button variant="primary" type="submit" className="mt-3 mr-3">
									Edit Profile
								</Button>
							</Form>
						</Jumbotron>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default UserInfo;
