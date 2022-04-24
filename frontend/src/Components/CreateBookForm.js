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
import { ToastContainer, toast } from "react-toastify";

const BookDetailsForm = (props) => {
	// const bookDetailData = props.bookDetailData[props.bId];
	const [selectedFile, setSelectedFile] = useState(null);

	const FILE_SIZE = 160 * 1024;
	const validation = Yup.object().shape({
		name: Yup.string().required("Required*"),
		detail: Yup.string().required("Required*"),
		university: Yup.string().required("Required*"),
		price: Yup.number().positive().required("Required*").min(1).max(10),
		about: Yup.string().required("Required*"),
		authName: Yup.string().required("Required*"),
		authDetail: Yup.string().required("Required*"),
	});

	// -------------------------------------------------
	const [image, setImage] = useState();
	const [preview, setPreview] = useState();
	const [url, setUrl] = useState("");

	const uploadImage = (bookImage, data) => {
		const imgData = new FormData();
		imgData.append("file", bookImage);
		imgData.append("upload_preset", "bookProjectImage");
		imgData.append("cloud_name", "dut3pcnma");
		axios
			.post(
				" https://api.cloudinary.com/v1_1/dut3pcnma/image/upload ",
				imgData
			)
			.then((response) => {
				setUrl(response.data.secure_url);
				uploadPreview(response.data.secure_url, data);
				console.log(response.data);
			});
	};

	const uploadPreview = (bookImage, data) => {
		const imgData = new FormData();
		imgData.append("file", bookImage);
		imgData.append("upload_preset", "bookProjectImage");
		imgData.append("cloud_name", "dut3pcnma");
		axios
			.post(
				" https://api.cloudinary.com/v1_1/dut3pcnma/image/upload ",
				imgData
			)
			.then((response) => {
				setUrl(response.data.secure_url);
				submitForm(bookImage, response.data.secure_url, data);
				console.log(response.data);
			});
	};

	const [authImage, setAuthImage] = useState();
	const [authUrl, setAuthUrl] = useState("");

	const uploadAuthImage = (id, data, authimage) => {
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
				createAuthor(id, data, response.data.secure_url);
				console.log(response.data.secure_url);
			});
	};

	console.log(authUrl);

	// -------------------------------------------------

	const submitForm = (imageValue, preview, data) => {
		let bookData = {
			userId: localStorage.getItem("tokenId"),
			image: imageValue,
			preview: preview,
			name: data.name,
			price: data.price,
			about: data.about,
			detail: data.detail,
			university: data.university,
		};
		let authorData = {
			authName: data.authName,
			authImage: authUrl,
			authDetail: data.authDetail,
		};

		console.log(authorData);
		Axios.post("http://127.0.0.1:5000/api/createBook", bookData)
			.then((response) => {
				console.log(response);
				// createAuthor(response.data.message._id, authorData);
				uploadAuthImage(
					response.data.message._id,
					authorData,
					authImage
				);

				props.bookDetails();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const createAuthor = (id, authorData, image) => {
		let body = {
			bookId: id,
			authName: authorData.authName,
			authImage: image,
			authDetail: authorData.authDetail,
		};
		Axios.post("http://127.0.0.1:5000/api/createAuther", body)
			.then((response) => {
				// props.bookDetail();
				toast.success("Book Uploaded Sucessfuly");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	let universityArr = [
		"University College Dublin",
		"Trinity College Dublin, the University of Dublin",
		"Dublin Business School",
		"Imperial College London",
		"National College of Ireland",
		"Griffith College",
		"Dublin City University",
		"University College Cork",
		"Technological University Dublin",
		"University of Limerick",
	];

	return (
		<Formik
			initialValues={{
				userId: "",
				image: "",
				preview: "",
				name: "",
				price: "",
				about: "",
				detail: "",
				authName: "",
				authImage: "",
				authDetail: "",
				university: "",
			}}
			validationSchema={validation}
			onSubmit={async (values) => {
				// submitForm(bookData, authorData);
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
							className=""
							onSubmit={handleSubmit}
							style={{ paddingBottom: "10px" }}
						>
							<label htmlFor="text">Book Name</label>
							<input
								className={"form-control"}
								type="text"
								name="name"
								placeholder="Enter book name"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.name}
								autoComplete="off"
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
								className={"form-control"}
							>
								<option value="">Select University</option>
								{universityArr.map((item, index) => {
									return (
										<>
											<option value={item}>{item}</option>
										</>
									);
								})}
							</select>
							{errors.university && touched.price && (
								<div className="input-feedback">
									{errors.university}
								</div>
							)}
							<label htmlFor="text">Price</label>
							<input
								className={"form-control"}
								type="number"
								name="price"
								placeholder="Enter price"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.price}
								autoComplete="off"
							/>
							{errors.price && touched.price && (
								<div className="input-feedback">
									{errors.price}
								</div>
							)}
							<label htmlFor="email">About</label>
							<textarea
								className={"form-control"}
								cols="30"
								rows="10"
								name="about"
								type="about"
								placeholder="Enter about book"
								value={values.about}
								onChange={handleChange}
								onBlur={handleBlur}
								className={
									errors.about && touched.about && "error"
								}
								autoComplete="off"
							/>
							{errors.about && touched.about && (
								<div className="input-feedback">
									{errors.about}
								</div>
							)}
							<label htmlFor="Password">Details</label>
							<textarea
								className={"form-control"}
								cols="30"
								rows="10"
								name="detail"
								type="detail"
								placeholder="Enter book detail"
								value={values.detail}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.detail && touched.detail && (
								<div className="input-feedback">
									{errors.detail}
								</div>
							)}
							<label htmlFor="text">Book Image</label>
							<input
								className={"form-control"}
								type="file"
								style={{ border: "none" }}
								onChange={(e) => setImage(e.target.files[0])}
								name="image"
								id="book-image"
							/>
							<label htmlFor="text">Book Preview Image</label>
							<input
								className={"form-control"}
								type="file"
								style={{ border: "none" }}
								onChange={(e) => setPreview(e.target.files[0])}
								name="preview"
								id="book-image"
							/>
							<label htmlFor="text">Author Name</label>
							<input
								className={"form-control"}
								type="text"
								name="authName"
								placeholder="Enter Author name"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.authName}
								autoComplete="off"
							/>
							{errors.authName && touched.authName && (
								<div className="input-feedback">
									{errors.authName}
								</div>
							)}
							<label htmlFor="text">About Author </label>
							<textarea
								className={"form-control"}
								cols="30"
								rows="10"
								name="authDetail"
								type="authDetail"
								placeholder="Enter author Details"
								value={values.authDetail}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{errors.authDetail && touched.authDetail && (
								<div className="input-feedback">
									{errors.authDetail}
								</div>
							)}
							<label htmlFor="text">Author Image</label>
							<input
								className={"form-control"}
								type="file"
								style={{ border: "none" }}
								onChange={(e) =>
									setAuthImage(e.target.files[0])
								}
								name="authImage"
								id="auth-image"
							/>
							<button type="submit" className="sign_in-btn">
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
		</Formik>
	);
};
export default BookDetailsForm;
