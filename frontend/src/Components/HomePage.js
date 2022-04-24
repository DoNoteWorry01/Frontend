import React, { useState, useEffect } from "react";
import SignUpModal from "./Modal/SignUpModal";
import LoginModal from "./Modal/LoginModal";
import Carousel from "./Carousel";
import Navbar from "./Navbar";
import Axios from "axios";
import CategoryDropDown from "./CategoryDropDown";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import heroImage from "./defaultImage/hero.jpg";

const HomePage = () => {
	useEffect(() => {
		bookDetails();
	}, []);

	const [bookData, setBookData] = useState([]);
	const [bookDataFilter, setBookDataFilter] = useState([]);
	const [uni, setUni] = useState([]);
	console.log(bookData);

	const bookDetails = () => {
		Axios.get("http://127.0.0.1:5000/api/bookList")
			.then((Response) => {
				setBookData(Response.data.message);
			})
			.catch(() => {
				setBookData(null);
			});
	};

	const takeUni = (value) => {
		let body = {
			university: value,
		};
		Axios.post("http://127.0.0.1:5000/api/book/university", body)
			.then((Response) => {
				setBookDataFilter(Response.data.message);
			})
			.catch(() => {
				setBookData(null);
			});
	};

	return (
		<>
			<Navbar takeUni={takeUni} />
			<img
				src={heroImage}
				alt=""
				className="w-100"
				style={{ height: "90vh", marginTop: "70px" }}
			/>
			<div className="container"></div>
			{bookData.length == 0 ? (
				<>
					<h1> No Data Found </h1>
				</>
			) : (
				<>
					<div className="container-fluid">
						<div
							className="rows"
							style={{
								paddingRight: "1rem",
								paddingLeft: "1rem",
							}}
						>
							<Carousel
								bookData={bookData}
								bookDetails={bookDetails}
								header={"List Of Books"}
							/>
							<hr />
						</div>
					</div>
				</>
			)}
			{bookDataFilter.length == 0 ? (
				""
			) : (
				<>
					<div className="container-fluid">
						<div
							className="rows"
							style={{
								paddingRight: "1rem",
								paddingLeft: "1rem",
							}}
						>
							<Carousel
								bookData={bookDataFilter}
								bookDetails={takeUni}
								header={"List By Category"}
							/>
							<hr />
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default HomePage;
