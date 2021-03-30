/* Save complex objects to dataStorage */
import { useState, useEffect } from "react";

const useObject = (key, defaultVal) => {
	const [state, setState] = useState(() => {
		return JSON.parse(localStorage.getItem(key)) || defaultVal;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	});
	return [state, setState];
};

export default useObject;
