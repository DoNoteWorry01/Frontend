import React, { useState } from "react";
import Slider from "react-slick";
import Navbar from "./Navbar";
import Axios from "axios";
import BookDetails from "./BookDetails";
import CreateBookModal from "./Modal/CreateBookModal";
import BookDetailModal from "./Modal/BookDetailModal";
import { MdModeEditOutline, MdPanoramaPhotosphereSelect } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const ProfileBookCarousel = (props) => {
	const bookData = props.bookData;
	const [modalOpen, setModalOpen] = useState(false);
	const [detailmodalOpen, setDetailModalOpen] = useState(false);
	const [BookId, setBookId] = useState("");
	const handleModal = (modal, id) => {
		setDetailModalOpen(modal);
		setBookId(id);
	};

	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
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
	return (
		<>
			<div
				id="profile-book-slider"
				className="container"
				style={{ marginTop: "3rem", marginBottom: "3rem" }}
			>
				<div className=" mb-3">
					<h2> Your Books </h2>
					<button
						className="btn"
						style={{
							backgroundColor: "#FF5F00",
							fontWeight: "550",
							fontSize: "1.4rem",
							color: "white",
						}}
					>
						Create Book
					</button>
				</div>
				<hr style={{ border: "2px solid silver" }} className="mb-5" />

				<Slider {...settings}>
					{bookData.map((item, index) => {
						return (
							<>
								<div
									class="card"
									style={{
										height: "fitContent",
										marginRight: "1rem",
										marginLeft: "1rem",
									}}
									onClick={() => {
										handleModal(true, item._id);
									}}
								>
									{item._id === BookId && (
										<>
											{detailmodalOpen && (
												<BookDetailModal
													setDetailModalOpen={handleModal}
													id={props.userId}
													bId={index}
													bookDetails={props.bookDetails}
													bookData={props.bookData}
													bookId={BookId}
												/>
											)}
										</>
									)}
									<img
										src={item.image}
										class="card-img-top"
										alt="..."
										style={{
											minHeight: "40vh",
											maxHeight: "40vh",
											display: "none",
											width: "40rem",
										}}
									/>
									<div class="card-body">
										<h2 class="card-title">{item.name}</h2>
										<p class="card-text">{item.about}</p>
										<div className="d-flex justify-content-between">
											<button
												style={{ backgroundColor: "white", border: "none" }}
											>
												<MdDeleteForever
													style={{
														fontWeight: "bolder",
														fontSize: "1.7rem",
														color: "red",
													}}
												/>
											</button>
											{/* <button
													className="btn btn-primary"
													style={{ backgroundColor: "white", border: "none" }}
												>
													<MdModeEditOutline
														style={{
															fontWeight: "bolder",
															fontSize: "1.7rem",
															color: "black",
														}}
													/>
												</button> */}
										</div>
									</div>
								</div>
							</>
						);
					})}
				</Slider>
			</div>
		</>
	);
};

export default ProfileBookCarousel;
