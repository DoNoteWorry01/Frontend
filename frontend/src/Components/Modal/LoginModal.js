import React, { useState } from "react";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";
import { ImCross } from "react-icons/im";
import TabChange from "../TabChange";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SignUpModal = (props) => {
	const [tabType, setTabType] = useState("LOGIN");
	const submitRegistrationForm = (data) => {
		Axios.post("http://127.0.0.1:5000/api/register", data)
			.then((response) => {
				localStorage.setItem("tokenId", response.data.message);
				createUserProfile(data, response.data.message);

				props.setModalOpen(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const createUserProfile = (data, id) => {
		let body = {
			userId: id,
			name: data.firstname + " " + data.lastname,
			image: "",
			detail: "",
		};
		Axios.post("http://127.0.0.1:5000/api/createProfile", body)
			.then((response) => {
				toast.success("You Are Registered");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// const SignUpForm = (props) => {
	// 	const submitRegistrationForm = (data) => {
	// 		Axios.post("http://127.0.0.1:5000/api/register", data)
	// 			.then((response) => {
	// 				console.log(response);
	// 				localStorage.setItem("tokenId", response.data.messge);
	// 				props.setModalOpen(false);
	// 			})
	// 			.catch((error) => {
	// 				console.log(error);
	// 			});
	// 	};

	return (
		<>
			{tabType == "LOGIN" ? (
				<>
					<div className="modalBackground">
						<div className="modalContainer">
							<div className="titleCloseBtn">
								<button
									onClick={() => {
										props.setModalOpen(false);
									}}
								>
									x
								</button>
							</div>

							<button className="modal-fullContainer">
								<div className="title"></div>
								<div className="body">
									<LoginForm />
								</div>
							</button>
							<div className="footer">
								<TabChange setTabType={setTabType} />
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="modalBackground">
						<div className="modalContainer">
							<div className="titleCloseBtn">
								<button
									onClick={() => {
										props.setModalOpen(false);
									}}
								>
									x
								</button>
							</div>
							<button className="modal-fullContainer">
								<div className="title"></div>
								<div className="body">
									<SignUpForm />

									{/* -------------------- */}

									<Formik
										initialValues={{
											firstname: "",
											lastname: "",
											email: "",
											password: "",
										}}
										// validationSchema={validation}
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
													<h1 className="reg-header">
														Sign Up
													</h1>
													<label htmlFor="text">
														First Name
													</label>
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

													{errors.name &&
														touched.name && (
															<div className="input-feedback">
																{errors.name}
															</div>
														)}
													<label htmlFor="text">
														Last Name
													</label>
													<input
														className={
															errors.lastname &&
															touched.lastname &&
															"error"
														}
														type="text"
														name="lastname"
														placeholder="First Name"
														onBlur={handleBlur}
														onChange={handleChange}
														value={values.lastname}
														autoComplete="off"
													/>

													{errors.name &&
														touched.name && (
															<div className="input-feedback">
																{errors.name}
															</div>
														)}

													<label htmlFor="email">
														Email
													</label>
													<input
														name="email"
														type="email"
														placeholder="Enter email"
														value={values.email}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.email &&
															touched.email &&
															"error"
														}
														autoComplete="off"
													/>
													{errors.email &&
														touched.email && (
															<div className="input-feedback">
																{errors.email}
															</div>
														)}

													<label htmlFor="Password">
														Password
													</label>
													<input
														name="password"
														type="password"
														placeholder="Enter password"
														value={values.password}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.password &&
															touched.password &&
															"error"
														}
													/>

													{errors.user_password &&
														touched.user_password && (
															<div className="input-feedback">
																{
																	errors.user_password
																}
															</div>
														)}

													<button
														type="submit"
														className="sign_in-btn"
													>
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

									{/* ----------------------- */}
									{/* <SignUpForm /> */}
								</div>
							</button>
							<div className="footer">
								{/* <TabChange tabType={tabType} setTabType={setTabType} /> */}
								<TabChange
									tabType={tabType}
									setTabType={setTabType}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default SignUpModal;
