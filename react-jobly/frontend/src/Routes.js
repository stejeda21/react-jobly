/* Routes Component */

import UserLoginForm from "./components/UserLoginForm";
import UserRegisterForm from "./components/UserRegisterForm";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch, Redirect } from "react-router-dom";

import MainPage from "./components/MainPage";
import UserInfo from "./components/UserInfo";
import CompanyList from "./components/CompanyList";
import JobList from "./components/JobList";
import UserPage from "./components/UserPage";
import CompanyInfo from "./components/CompanyInfo";
import JobInfo from "./components/JobInfo";
import UserContext from "./UserContext";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
	space: {
		marginTop: "8rem",
		marginBottom: "4rem",
	},
	center: {
		marginTop: "30vh",
		marginBottom: "4rem",
		color: "#0000FF",
	},
}));

const Routes = () => {
	const classes = useStyles();
	const { token } = useContext(UserContext);
	return (
		<>
			<Switch>
				<Route exact path="/login">
					<h1 className={classes.space}>Login</h1>
					<UserLoginForm />
				</Route>
				<Route exact path="/register">
					<h1 className={classes.space}>Sign Up</h1>
					<UserRegisterForm />
				</Route>
				<Route exact path="/profile">
					<div className={classes.space}></div>
					<UserInfo className={classes.space} />
				</Route>
				<Route exact path="/companies/:handle">
					<CompanyInfo />
				</Route>
				<Route exact path="/companies">
					<h1 className={classes.space}>Companies</h1>
					{token ? <CompanyList /> : <Redirect to="/" />}
				</Route>
				<Route exact path="/jobs/:id">
					<h1 className={classes.space}>Job Description</h1>
					<JobInfo />
				</Route>
				<Route exact path="/jobs">
					<h1 className={classes.space}>Jobs</h1>
					{token ? <JobList /> : <Redirect to="/" />}
				</Route>
				<Route exact path="/">
					<h1 className={classes.center}>Looking for a Job?</h1>
					<h4>Start Here!</h4>
					{token ? <UserPage /> : <MainPage />}
				</Route>
			</Switch>
		</>
	);
};

export default Routes;
