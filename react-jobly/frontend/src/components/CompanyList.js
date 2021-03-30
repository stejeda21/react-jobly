import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState, useEffect, useCallback } from "react";
import Company from "./Company";
import JoblyApi from "../api";

const CompanyList = () => {
	/* Will sync all company list including Search Bar */
	const INITIAL_STATE = {
		name: "",
		minEmployees: "",
		maxEmployees: "",
	};
	const [companies, setCompanies] = useState([]);
	const [formData, setFormData] = useState(INITIAL_STATE);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	const fetchData = useCallback(() => {
		JoblyApi.getComponents(formData, "companies").then((res) =>
			setCompanies(res)
		);
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
							<Form className="mb-2">
								<Form.Row className="align-items-center">
									<Col lg="3" xs="12">
										<Form.Label column>Search for Companies</Form.Label>
									</Col>
									<Col lg="3" xs="12">
										<Form.Control
											className="my-2"
											type="text"
											name="name"
											placeholder="Company Name"
											onChange={handleChange}
											value={formData.name}
										/>
									</Col>
									<Col lg="3" md="4" xs="12">
										<Form.Control
											className="my-2"
											type="number"
											id="minEmployees"
											name="minEmployees"
											min="0"
											placeholder="Min Employees"
											onChange={handleChange}
											value={formData.minEmployees}
										/>
									</Col>
									<Col lg="3" md="4" xs="12">
										<Form.Control
											className="my-2"
											type="number"
											id="maxEmployees"
											name="maxEmployees"
											min="0"
											placeholder="Max Employees"
											onChange={handleChange}
											value={formData.maxEmployees}
										/>
									</Col>
								</Form.Row>
							</Form>
						</Col>
					</Row>
					<Row>
						{companies.map((company) => (
							<Col
								className="d-flex justify-content-center m-3"
								key={company.handle}
							>
								<Company
									id={company.handle}
									name={company.name}
									description={company.description}
									numEmployees={company.numEmployees}
									logoURL={company.logoUrl}
									handle={company.handle}
								/>
							</Col>
						))}
					</Row>
				</Jumbotron>
			</Container>
		</div>
	);
};

export default CompanyList;
