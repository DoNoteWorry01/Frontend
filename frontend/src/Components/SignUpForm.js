import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
// import url from "../apiUrl";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validation = Yup.object().shape({
	name: Yup.string().required("Required*"),
	email: Yup.string().email().required("Required*"),
	mobile_number: Yup.string()
		.required("required*")
		.matches(phoneRegExp, "Phone number is not valid")
		.min(10, "phone number must be 10 digits")
		.max(10, "phone number cannot be greater than 10 digits"),

	user_password: Yup.string()
		.required("Required*")
		.min(8, "Password is too short - should be 8 chars minimum.")
		// .matches(
		// 	"^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
		// "password contain uppercase, lowercase, number and special character"),
		.matches(/(?=.*[0-9])/, "Password must contain a number."),

	confirm_password: Yup.string().oneOf(
		[Yup.ref("user_password"), null],
		"Password must match"
	),
});

const SignUpForm = (props) => {
	const submitRegistrationForm = (data) => {
		Axios.post("http://127.0.0.1:5000/api/register", data)
			.then((response) => {
				console.log(response);
				localStorage.setItem("tokedId", response.data.messge);
				props.setModalOpen(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const SignUpForm = (props) => {
		const submitRegistrationForm = (data) => {
			Axios.post("http://127.0.0.1:5000/api/register", data)
				.then((response) => {
					console.log(response);
					localStorage.setItem("tokenId", response.data.messge);
					props.setModalOpen(false);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		return (
			<Formik
				initialValues={{
					firstname: "",
					lastname: "",
					email: "",
					password: "",
				}}
				validationSchema={validation}
				onSubmit={async (values) => {
					submitRegistrationForm(values);
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
					<div className="registration-container">
						<form
							className="registration-form"
							onSubmit={handleSubmit}
						>
							<h1 className="reg-header">Sign Up</h1>
							<label htmlFor="text">First Name</label>
							<input
								className={
									errors.firstname &&
									touched.firstname &&
									"error"
								}
								type="text"
								name="firstname"
								placeholder="First Name"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.firstname}
								autoComplete="off"
							/>

							{errors.name && touched.name && (
								<div className="input-feedback">
									{errors.name}
								</div>
							)}

							<label htmlFor="email">Email</label>
							<input
								name="email"
								type="email"
								placeholder="Enter email"
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

							<label htmlFor="text">Phone</label>
							<input
								name="mobile_number"
								type="tel"
								className={
									errors.mobile_number &&
									touched.mobile_number &&
									"error"
								}
								placeholder="Enter phone number"
								value={values.mobile_number}
								onChange={handleChange}
								onBlur={handleBlur}
								autoComplete="off"
							/>

							{errors.mobile_number && touched.mobile_number && (
								<div className="input-feedback">
									{errors.mobile_number}
								</div>
							)}

							<label htmlFor="Password">Password</label>
							<input
								name="user_password"
								type="password"
								placeholder="Enter password"
								value={values.user_password}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.user_password &&
									touched.user_password &&
									"error"
								}
							/>

							{errors.user_password && touched.user_password && (
								<div className="input-feedback">
									{errors.user_password}
								</div>
							)}

							<label htmlFor="confirm_password">
								Confirm Password
							</label>
							<input
								name="confirm_password"
								type="password"
								placeholder="Confirm password"
								value={values.confirm_password}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.confirm_password &&
									touched.confirm_password &&
									"error"
								}
							/>

							{errors.confirm_password &&
								touched.confirm_password && (
									<div className="input-feedback">
										{errors.confirm_password}
									</div>
								)}
							<button type="submit" className="sign_in-btn">
								Sign in
							</button>
							{/* <div>
							<p className="login-page-redirect">
								Already have an account? &nbsp;
								<Link to={"/"}>
									<span>Sign in</span>
								</Link>
							</p>
						</div> */}
						</form>
					</div>
				)}
			</Formik>
		);
	};
};

export default SignUpForm;
