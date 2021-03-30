import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import Job from "./Job";
import useApplications from "../hooks/useApplications";
import UserContext from "../UserContext";

const CompanyInfo = () => {
	/* Company Information including job it posted */
	const { handle } = useParams();
	const { token, currUser } = useContext(UserContext);
	const [applications, setApplications] = useApplications(currUser, token);

	const [company, setCompany] = useState(null);
	useEffect(() => {
		async function fetchCompanyInfo() {
			const companyName = await JoblyApi.getCompany(handle);
			setCompany({ ...companyName });
		}
		fetchCompanyInfo();
	}, [handle]);

	//we need this because render happens first then useEffect
	if (company === null) {
		return null;
	}
	return (
		<>
			<Container>
				<Row className="justify-content-center">
					<Col>
						<Jumbotron className="mt-6">
							<Row>
								<Col className="text-center mt-4">
									<h1>{company.name}</h1>
									<hr />
								</Col>
							</Row>
							<Row>
								<Col className="text-center mt-4">
									<h4 className="mb-2 text-muted">
										Number of employees:{" "}
										{company.numEmployees
											? company.numEmployees
											: "Unspecified"}
									</h4>
									<hr />
								</Col>
							</Row>
							<h5>{company.description}</h5>
							<h4 className="mt-5 text-primary">{company.name} Positions: </h4>
							<Row>
								{company.jobs.map((job) => (
									<Col
										className="d-flex justify-content-center m-3"
										key={job.id}
									>
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
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CompanyInfo;
