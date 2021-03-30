import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		let params;
		switch (method) {
			case "get":
			case "post":
			case "patch":
			case "delete":
				params = data;
				break;
			default:
				params = {};
		}
		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	/** Get details on a company by handle. */

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	/** Get details on a job by id. */

	static async getJob(id) {
		let res = await this.request(`jobs/${id}`);
		return res.job;
	}

	/* Get Details of Companies or Jobs( with filters or without )*/

	static async getComponents(formData, url) {
		const paramData = {};
		for (let el of Object.keys(formData)) {
			if (formData[el]) {
				paramData[el] = formData[el];
			}
		}
		let res = await this.request(url, paramData);
		return res[url];
	}

	/* Authorize a user to be able to see other features -- login/register */

	static async getAuthorization(formData, url) {
		let res = await this.request(`auth/${url}`, formData, "post");
		JoblyApi.token = res.token;
		return res.token;
	}

	/* Get information on a particular user */

	static async getUserInfo(username, token) {
		JoblyApi.token = token;
		let res = await this.request(`users/${username}`);
		return res;
	}

	/* Edit user using formData */

	static async editUserInfo(formData, userName, token) {
		JoblyApi.token = token;
		let user = (await this.request(`users/${userName}`, formData, "patch"))
			.user;
		return user;
	}

	/* Apply for a job */

	static async applyForJob(username, jobId, token) {
		JoblyApi.token = token;
		let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
		return res;
	}
}

export default JoblyApi;
