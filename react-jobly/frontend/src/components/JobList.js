import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useRef, useCallback } from "react";
import Job from "./Job";
import JoblyApi from "../api";
import UserContext from "../UserContext";
import { useContext } from "react";
import useApplications from "../hooks/useApplications";

const JobList = () => {
	const INITIAL_STATE = {
		title: "",
		minSalary: 0,
		hasEquity: false,
	};
	const [jobs, setJobs] = useState([]);
	const [formData, setFormData] = useState(INITIAL_STATE);
	const { token, currUser } = useContext(UserContext);
	const [applications, setApplications] = useApplications(currUser, token);
	const checkBox = useRef();

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	const handleClick = (evt) => {
		const { name } = evt.target;
		setFormData((fData) => ({
			...fData,
			[name]: !formData.hasEquity,
		}));
	};

	const fetchData = useCallback(() => {
		JoblyApi.getComponents(formData, "jobs").then((res) => setJobs(res));
	}, [formData]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div>
			<Container>
				<Jumbotron>
					<Row>
						<Col className="d-flex justify-content-center m-3">
							<Form>
								<Form.Row className="align-items-center">
									<Col lg="3" xs="12">
										<Form.Label column>Search for Jobs</Form.Label>
									</Col>
									<Col lg="4" xs="12">
										<Form.Control
											className="mb-2"
											type="text"
											name="title"
											placeholder="Search by Title of a Job"
											onChange={handleChange}
											value={formData.title}
										/>
									</Col>
									<Col lg="3" xs="12">
										<Form.Control
											className="mb-2"
											type="number"
											id="minSalary"
											name="minSalary"
											placeholder="Min Salary"
											min="0"
											onChange={handleChange}
											value={formData.minEmployees}
										/>
									</Col>
									<Col lg="2" xs="12">
										<Form.Check
											className="mb-2"
											ref={checkBox}
											type="checkbox"
											id="hasEquity"
											name="hasEquity"
											label={`Equity?`}
											onChange={handleClick}
											value={formData.hasEquity}
										/>
									</Col>
								</Form.Row>
							</Form>
						</Col>
					</Row>
					<Row>
						{jobs.map((job) => (
							<Col className="d-flex justify-content-center m-3" key={job.id}>
								<Job
									id={job.id}
									title={job.title}
									salary={job.salary}
									equity={job.equity}
									companyName={job.companyName}
									addApp={setApplications}
									applications={applications}
									applied={
										applications
											? applications.includes(job.id)
												? true
												: false
											: false
									}
								/>
							</Col>
						))}
					</Row>
				</Jumbotron>
			</Container>
		</div>
	);
};

export default JobList;
