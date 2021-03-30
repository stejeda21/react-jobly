/* Save Simple Data to dataStorage */
import { useState, useEffect } from "react";

const useLocalStorageState = (key, defaultVal) => {
	const [state, setState] = useState(() => {
		let value = localStorage.getItem(key) || defaultVal;
		return value;
	});

	useEffect(() => {
		localStorage.setItem(key, state);
	});

	return [state, setState];
};

export default useLocalStorageState;
