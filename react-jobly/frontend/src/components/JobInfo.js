import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import Company from "./Company";

const JobInfo = () => {
	const { id } = useParams();

	const [job, setJob] = useState(null);
	useEffect(() => {
		async function fetchCompanyInfo() {
			const jobName = await JoblyApi.getJob(id);
			setJob({ ...jobName });
		}
		fetchCompanyInfo();
	}, [id]);

	//we need this because render happens first then useEffect
	if (job === null) {
		return null;
	}
	return (
		<>
			<Container fluid>
				<Row className="justify-content-center">
					<Col sm={8}>
						<Jumbotron className="mt-6">
							<Row>
								<Col className="text-center mt-4">
									<h1>{job.title}</h1>
									<hr />
								</Col>
							</Row>
							<Row>
								<Col className="text-center mt-4">
									<h4 className="mb-2 text-muted">
										{job.salary ? `Salary: ${job.salary}` : ""}
									</h4>
									<hr />
								</Col>
							</Row>
							<h5>{job.equity ? `Equity: ${job.equity}` : ""}</h5>
							<h4 className="mt-5 text-primary">About Company : </h4>
							<Row>
								<Col className="d-flex justify-content-center m-3">
									<Company
										id={job.company.handle}
										name={job.company.name}
										description={job.company.description}
										numEmployees={job.company.numEmployees}
										logoURL={job.company.logoUrl}
										handle={job.company.handle}
									/>
								</Col>
							</Row>
						</Jumbotron>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default JobInfo;
