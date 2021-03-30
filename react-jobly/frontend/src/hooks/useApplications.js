/* Fetching applications from API */
import { useEffect } from "react";
import JoblyApi from "../api";
import useObject from "./useObject";

const useApplications = (username, token) => {
	const [apps, setApps] = useObject("apps", []);

	useEffect(() => {
		username &&
			token &&
			JoblyApi.getUserInfo(username, token).then((response) => {
				setApps(() => response.user.applications);
			});
	}, []);

	return [apps, setApps];
};

export default useApplications;
