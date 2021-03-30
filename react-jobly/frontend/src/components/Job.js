import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import JoblyApi from "../api";
import UserContext from "../UserContext";
import { useContext, useRef } from "react";

const Job = ({
	id,
	title,
	salary,
	equity,
	companyName,
	addApp,
	applied,
	applications,
}) => {
	/* A single job component including all info and job application */
	const { token, currUser } = useContext(UserContext);
	const btn = useRef();

	async function fetchData(token) {
		try {
			await JoblyApi.applyForJob(currUser, id, token);
		} catch (err) {
			console.log(err[0]);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		fetchData(token);
		addApp([...applications, id]);
		btn.current.disabled = true;
	};

	return (
		<>
			<Card style={{ width: "18rem" }} id={id}>
				<Card.Body className="d-flex flex-column">
					<Card.Title>{title}</Card.Title>
					<hr />
					<Card.Subtitle className="mb-2 text-muted">
						Salary: {salary ? salary : "Not specified"}
					</Card.Subtitle>
					<Card.Text>{companyName}</Card.Text>
					{equity ? (
						<Card.Text>
							<b>Equity:</b> {equity}
						</Card.Text>
					) : (
						""
					)}
					<Card.Link href={`/jobs/${id}`} className="mb-5">
						More info...
					</Card.Link>
					<div>
						<Row className="justify-content-center">
							<Col className="d-flex justify-content-center m-3">
								<Form onSubmit={handleSubmit}>
									<Button
										ref={btn}
										type="submit"
										variant="primary"
										className="align-self-end btn btn-lg mt-auto"
										disabled={applied}
									>
										{applied ? "Applied" : "Apply"}
									</Button>
								</Form>
							</Col>
						</Row>
					</div>
				</Card.Body>
			</Card>
		</>
	);
};

export default Job;
