import React from "react";
import Slider from "react-slick";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";

const Carousel = (props) => {
	var settings = {
		dots: false,
		infinite: false,
		speed: 1000,
		slidesToShow: 5,
		slidesToScroll: 1,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	let navigate = useNavigate();

	const [bookId, setBookId] = useState();
	const [bookDetailData, setBookDetailData] = useState();

	const handleOpen = (id, item) => {
		setBookId(id);
		navigate("/BookDetails/" + id);
		setBookDetailData(item);
	};

	console.log(bookId);
	return (
		<>
			<div className="slick-box">
				<h2 style={{ paddingTop: "40px", paddingBottom: "10px" }}>
					{" "}
					{props.header}{" "}
				</h2>
				<hr />
				<Slider {...settings}>
					{props.bookData.map((item, index) => {
						return (
							<>
								<div
									style={{
										boxShadow: "0px 0px 2px grey",
										marginLeft: "0.5rem",
										marginRight: "0.5rem",
										borderRadius: "5px",
										marginBottom: "10px",
										paddingBottom: "2px",
									}}
									onClick={() => handleOpen(item._id, item)}
								>
									{item.image == null ? (
										<>
											<img src="" alt="no data" />
										</>
									) : (
										<>
											<img
												src={item.image}
												alt=""
												class="w-100"
												style={{
													height: "40vh",
													width: "25rem",
												}}
											/>
										</>
									)}
									{item.name == null ? (
										"no data"
									) : (
										<>
											<h3
												style={{
													color: "#ff5f00",
													marginLeft: "1rem",
													paddingTop: "10px",
												}}
											>
												{item.name}
											</h3>
										</>
									)}
									{item.price == null ? (
										"no data"
									) : (
										<>
											<h6 style={{ marginLeft: "1rem" }}>
												{item.price} &euro;
											</h6>
										</>
									)}
								</div>
							</>
						);
					})}
				</Slider>
			</div>
		</>
	);
};

export default Carousel;
