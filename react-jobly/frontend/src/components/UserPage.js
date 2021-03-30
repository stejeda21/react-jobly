import UserContext from "../UserContext";
import { useContext } from "react";

const UserPage = () => {
	const { currUserInfo } = useContext(UserContext);
	return (
		<>
			<h4>Hello, {currUserInfo.firstName}... Ready to get a job?</h4>
		</>
	);
};

export default UserPage;
