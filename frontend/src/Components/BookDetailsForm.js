import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
// import url from "../apiUrl";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import { createBook } from "../../../Backend/api/book";
import { date } from "yup/lib/locale";
import { useEffect } from "react";

const BookDetailsForm = (props) => {
	const bookDetailData = props.bookData[props.bId];
	const userBookId = props.bookId;

	useEffect(() => {
		authorUserDetail();
	}, []);

	const FILE_SIZE = 160 * 1024;
	const validation = Yup.object().shape({
		name: Yup.string().required("Required*"),
		detail: Yup.string().required("Required*"),
		detail: Yup.string().required("Required*"),
		price: Yup.string().required("Required*"),
		about: Yup.string().required("Required*"),
		authName: Yup.string().required("Required*"),
		image: Yup.mixed()
			.required("A file is required")
			.test(
				"fileSize",
				"File too large",
				(value) => value && value.size <= FILE_SIZE
			),
		authDetail: Yup.string().required("Required*"),
		authImage: Yup.mixed()
			.required("A file is required")
			.test(
				"fileSize",
				"File too large",
				(value) => value && value.size <= FILE_SIZE
			),
	});

	const [authorByUser, setAuthorByUser] = useState([]);

	const authorUserDetail = () => {
		let body = { bookId: userBookId };
		Axios.post("http://127.0.0.1:5000/api/autherDetail", body)
			.then((Response) => {
				setAuthorByUser(Response.data.message);
				setLoading(false);
			})
			.catch(() => {
				setAuthorByUser(null);
			});
	};

	console.log(authorByUser);

	// ========================================================================

	const [image, setImage] = useState();
	const [url, setUrl] = useState("");
	let AuthImage = authorByUser.AutherImage;
	const [loading, setLoading] = useState(true);
	const [bookPrevImage, setBookPrevImage] = useState(bookDetailData.image);

	const uploadImage = (bookImage, data) => {
		if (bookImage == undefined) {
			submitForm(bookPrevImage, data);
		} else {
			const imgData = new FormData();
			imgData.append("file", bookImage);
			imgData.append("upload_preset", "bookProjectImage");
			imgData.append("cloud_name", "dut3pcnma");
			console.log(data);
			axios
				.post(
					" https://api.cloudinary.com/v1_1/dut3pcnma/image/upload ",
					imgData
				)
				.then((response) => {
					setUrl(response.data.secure_url);
					submitForm(response.data.secure_url, data);
					console.log(response.data.secure_url, data);
				});
		}
	};
	// =======================================================================

	const [authImage, setAuthImage] = useState();
	const [authUrl, setAuthUrl] = useState("");

	const uploadAuthImage = (id, data, authimage) => {
		console.log(authimage);
		if (authimage == undefined) {
			editAuthor(id, data, AuthImage);
			window.location = "/profile";
		} else {
			const authImageData = new FormData();
			authImageData.append("file", authimage);
			authImageData.append("upload_preset", "bookProjectImage");
			authImageData.append("cloud_name", "dut3pcnma");
			axios
				.post(
					" https://api.cloudinary.com/v1_1/dut3pcnma/image/upload ",
					authImageData
				)
				.then((response) => {
					setAuthUrl(response.data.secure_url);
					editAuthor(id, data, response.data.secure_url);
					window.location = "/profile";
					//props.bookDetails();
				});
		}
	};

	// , authorByUser._id
	// -------------------------------------------------
	console.log(props.id);
	console.log(props.bookId);

	const submitForm = (imageValue, data) => {
		let bookData = {
			userId: props.id,
			image: imageValue,
			name: data.name,
			price: data.price,
			about: data.about,
			detail: data.detail,
			bookId: props.bookId,
			university: data.university,
		};

		let authorData = {};
		if (authUrl == "") {
			authorData = {
				bookId: userBookId,
				authName: data.authName,
				authImage: AuthImage,
				authDetail: data.authDetail,
			};
		} else {
			authorData = {
				bookId: userBookId,
				authName: data.authName,
				authImage: authUrl,
				authDetail: data.authDetail,
			};
		}

		Axios.post("http://127.0.0.1:5000/api/editBook", bookData)
			.then((response) => {
				console.log(response);
				// createAuthor(response.data.message._id, authorData);

				uploadAuthImage(
					response.data.message._id,
					authorData,
					authImage
				);
				// props.bookDetails();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const editAuthor = (id, authorData, image) => {
		let body = {
			bookId: id,
			autherId: authorByUser._id,
			authName: authorData.authName,
			authImage: image,
			authDetail: authorData.authDetail,
		};

		console.log(body.authImage);
		Axios.post("http://127.0.0.1:5000/api/editAuther", body)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	console.log(authorByUser.AutherImage);
	let universityArr = ["a", "b", "c"];

	return (
		<>
			{loading == true ? (
				<>loading ....</>
			) : (
				<>
					<Formik
						initialValues={{
							image: bookDetailData.image,
							name: bookDetailData.name,
							price: bookDetailData.price,
							about: bookDetailData.about,
							detail: bookDetailData.detail,
							university: bookDetailData.university,
							authName: authorByUser.AutherName,
							authImage: authorByUser.AutherImage,
							authDetail: authorByUser.AutherDetail,
						}}
						// validationSchema={validation}
						onSubmit={async (values) => {
							//submitForm(bookData, authorData);
							console.log(values, image);
							uploadImage(image, values);
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
							<div className="create-book-section">
								<div className="reg-company-logo"></div>

								<div className={"container"}>
									<form
										className="registration-form"
										onSubmit={handleSubmit}
									>
										<label htmlFor="text">Book Name</label>
										<input
											className={
												errors.name &&
												touched.name &&
												"error"
											}
											type="text"
											name="name"
											placeholder="Enter book name"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.name}
											autoComplete="off"
											// defaultValue={bookDetailData.name}
										/>
										{errors.name && touched.name && (
											<div className="input-feedback">
												{errors.name}
											</div>
										)}

										<label htmlFor="text">University</label>
										<select
											name="university"
											id=""
											style={{
												width: "100%",
												padding: "0.5rem",
												border: "1px solid silver",
												borderRadius: "5px",
												marginTop: "0.3rem",
												outline: "none",
											}}
											onChange={handleChange}
										>
											<option value={values.university}>
												{values.university}
											</option>
											{universityArr.map(
												(item, index) => {
													return (
														<>
															<option
																value={item}
															>
																{item}
															</option>
														</>
													);
												}
											)}
										</select>
										<label htmlFor="text">Price</label>
										<input
											className={
												errors.price &&
												touched.price &&
												"error"
											}
											type="text"
											name="price"
											placeholder="Enter price"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.price}
											autoComplete="off"
											// defaultValue={bookDetailData.price}
										/>
										{errors.price && touched.price && (
											<div className="input-feedback">
												{errors.price}
											</div>
										)}
										<label htmlFor="email">About</label>
										<textarea
											cols="30"
											rows="10"
											name="about"
											type="about"
											placeholder="Enter about book"
											value={values.about}
											onChange={handleChange}
											onBlur={handleBlur}
											className={
												errors.about &&
												touched.about &&
												"error"
											}
											autoComplete="off"
											// defaultValue={bookDetailData.about}
										/>
										{errors.about && touched.about && (
											<div className="input-feedback">
												{errors.about}
											</div>
										)}
										<label htmlFor="Password">
											Details
										</label>
										<textarea
											cols="30"
											rows="10"
											name="detail"
											type="detail"
											placeholder="Enter book detail"
											value={values.detail}
											onChange={handleChange}
											onBlur={handleBlur}
											className={
												errors.detail &&
												touched.detail &&
												"error"
											}
											// defaultValue={bookDetailData.detail}
										/>
										{errors.detail && touched.detail && (
											<div className="input-feedback">
												{errors.detail}
											</div>
										)}
										<label htmlFor="text">Book Image</label>
										<img
											src={bookDetailData.image}
											alt=""
											style={{
												height: "5rem",
												position: "relative",
												left: "0%",
												display: "block",
												width: "3rem",
											}}
										/>
										<input
											type="file"
											style={{ border: "none" }}
											onChange={(e) =>
												setImage(e.target.files[0])
											}
											name="image"
											id="book-image"
										/>
										<label htmlFor="text">
											Author Name
										</label>
										<input
											className={
												errors.authName &&
												touched.authName &&
												"error"
											}
											type="text"
											name="authName"
											placeholder="Enter Author name"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.authName}
											autoComplete="off"
											// defaultValue={values.authName}
										/>
										{errors.authName &&
											touched.authName && (
												<div className="input-feedback">
													{errors.authName}
												</div>
											)}
										<label htmlFor="text">
											About Author{" "}
										</label>
										<textarea
											cols="30"
											rows="10"
											name="authDetail"
											type="authDetail"
											placeholder="Enter author Details"
											value={values.authDetail}
											onChange={handleChange}
											onBlur={handleBlur}
											className={
												errors.authDetail &&
												touched.authDetail &&
												"error"
											}
											// defaultValue={values.authDetail}
										/>
										{errors.authDetail &&
											touched.authDetail && (
												<div className="input-feedback">
													{errors.authDetail}
												</div>
											)}
										<label htmlFor="text">
											Author Image
										</label>
										<img
											src={authorByUser.AutherImage}
											alt=""
											style={{
												height: "5rem",
												position: "relative",
												left: "0%",
												display: "block",
											}}
										/>
										<input
											type="file"
											style={{ border: "none" }}
											onChange={(e) =>
												setAuthImage(e.target.files[0])
											}
											name="authImage"
											id="auth-image"
										/>
										<button
											type="submit"
											className="sign_in-btn"
										>
											Submit
										</button>
									</form>
								</div>
							</div>
						)}
					</Formik>
				</>
			)}
		</>
	);
};
export default BookDetailsForm;
