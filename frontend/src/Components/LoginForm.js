import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import postMethod from "../apiUrls/publicUrl/postMethod";
import { IoLogoLinkedin } from "react-icons/io5";
import TabChange from "./TabChange";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";

const validation = Yup.object().shape({
	email: Yup.string().email().required("Required*"),
	password: Yup.string()
		.required("No password provided.")
		.min(8, "Password is too short - should be 8 chars minimum."),
	// .matches(/(?=.*[0-9])/, "Password must contain a number."),
});

const LoginForm = (props) => {
	// const responseGoogle = (Response) => {
	// 	console.log();
	// 	accessToken(Response.accessToken);
	// };

	// const accessToken = (accessToken) => {
	// 	let body = {
	// 		key: accessToken,
	// 	};

	// 	postMethod(body, "auth/googleLogin", function (response) {
	// 		console.log(response);
	// 	});
	// };
	console.log();

	const [error, setError] = useState(null);
	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			// validationSchema={validation}
			onSubmit={(values) => {
				const body = {
					email: values.email,
					password: values.password,
				};
				Axios.post("http://127.0.0.1:5000/api/login", body)
					.then((response) => {
						console.log(response);
						localStorage.setItem("tokenId", response.data.token_id);
						toast.success("You Are Loggedin");

						window.location = "/";
						props.setModalOpen(false);
					})
					.catch((error) => {
						console.log(error);
					});
			}}
		>
			{({
				values,
				touched,
				errors,
				isSubmitting,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<>
					<div className="login-container">
						<form className="login-form" onSubmit={handleSubmit}>
							<h1>Login</h1>
							<label htmlFor="text">Email</label>
							<input
								name="email"
								type="text"
								placeholder="Enter you email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.email && touched.email && "error"
								}
								autoComplete="off"
							/>
							{errors.email && touched.email && (
								<div className="input-feedback">
									{errors.email}
								</div>
							)}
							<label htmlFor="text">Password</label>
							<input
								name="password"
								type="password"
								placeholder="Enter your password"
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.password &&
									touched.password &&
									"error"
								}
							/>
							{errors.password && touched.password && (
								<div className="input-feedback">
									{errors.password}
								</div>
							)}
							<button type="submit" className="login-btn btn">
								Login
							</button>
							<div>
								{/* <p className="signin">
									New User? &nbsp;
									<span>
										<TabChange setTabType={props.setTabType} />
									</span>
								</p> */}
							</div>
						</form>
					</div>
				</>
			)}
		</Formik>
	);
};
export default LoginForm;
