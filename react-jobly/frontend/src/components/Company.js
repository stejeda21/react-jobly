import Card from "react-bootstrap/Card";

const Company = (props) => {
	/* Company Component to display one card with full description of the job*/
	return (
		<>
			<Card style={{ width: "18rem" }} id={props.id}>
				<Card.Body>
					<Card.Title>{props.name}</Card.Title>
					<hr />
					<Card.Subtitle className="mb-2 text-muted">
						Number of employees: {props.numEmployees}
					</Card.Subtitle>
					<Card.Text>{props.description}</Card.Text>
					<Card.Link href={`/companies/${props.id}`}>More info...</Card.Link>
				</Card.Body>
			</Card>
		</>
	);
};

export default Company;
