/* Fetching and refreshing current user's data*/
import { useEffect, useRef } from "react";
import JoblyApi from "../api";
import useObject from "./useObject";

const useCurrUserInfoState = (username, token) => {
	const [userInfo, setUserInfo] = useObject("userInfo", {});
	const isFirstRun = useRef(true);

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false; //i'm using useRef to not run this code on the first run
			return;
		}
		username &&
			token &&
			JoblyApi.getUserInfo(username, token).then((response) => {
				setUserInfo(() => ({
					firstName: response.user.firstName,
					lastName: response.user.lastName,
					email: response.user.email,
				}));
			});
	}, [username, token, setUserInfo]);

	return [userInfo, setUserInfo];
};

export default useCurrUserInfoState;
