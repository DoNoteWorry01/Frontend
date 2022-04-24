import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import BookDetails from "./BookDetails";
import CreateBookModal from "./Modal/CreateBookModal";
import BookDetailModal from "./Modal/BookDetailModal";
import ProfileBookCarousel from "./ProfileBookCarousel";
import EditProfileModal from "./Modal/EditProfile";
import Slider from "react-slick";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import profile from "./defaultImage/profile.png";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
	useEffect(() => {
		bookDetails();
	}, []);

	const [userData, setUserData] = useState([]);
	const [bookData, setBookData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [detailmodalOpen, setDetailModalOpen] = useState(false);
	const [BookId, setBookId] = useState("");
	const [index, setIndex] = useState("");
	const [profileOpen, setProfileOpen] = useState(false);

	// console.log(userData._id);
	const handleModal = (modal, id, index) => {
		setDetailModalOpen(modal);
		setBookId(id);
		setIndex(index);

		console.log(id);
	};

	console.log(userData);

	const userDetails = () => {
		let body = { userId: localStorage.getItem("tokenId") };
		Axios.post("http://127.0.0.1:5000/api/profileDetail", body)
			.then((Response) => {
				setUserData(Response.data.message);
				setLoader(false);
			})
			.catch(() => {
				setUserData(null);
			});
	};

	const bookDetails = () => {
		let body = { userId: localStorage.getItem("tokenId") };
		Axios.post("http://127.0.0.1:5000/api/bookDetail", body)
			.then((Response) => {
				setBookData(Response.data.message);
				userDetails();
			})
			.catch(() => {
				setUserData(null);
			});
	};

	var settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
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

	const deleteBook = (id) => {
		let body = {
			bookId: id,
		};
		Axios.post("http://127.0.0.1:5000/api/deleteBook", body)
			.then((Response) => {
				bookDetails();
			})
			.catch(() => {
				alert("Something Went Wrong !");
			});
	};

	const openEditModal = () => {
		if (profileOpen == false) {
			setProfileOpen(true);
		} else {
			setProfileOpen(false);
		}
	};

	return (
		<>
			<div
				className="container"
				style={{
					marginTop: "70px",
				}}
			>
				<div className=" mb-3">
					<h2> Your Profile </h2>
				</div>

				<div class="row">
					<div class="col-sm-4">
						{userData.image == null || userData.image == "" ? (
							<>
								<img src={profile} alt="" width="300" />
							</>
						) : (
							<>
								<img src={userData.image} alt="" width="300" />
							</>
						)}
					</div>
					<div class="col-sm-8">
						<div className="pt-3">
							<div>
								<h1
									className="name"
									style={{ color: "#FF5F00" }}
								>
									{userData == null ? (
										""
									) : (
										<>{userData.name}</>
									)}
									{/* <h5 style={{ color: "black" }}>
								{userData == null ? "" : <>{userData.email}</>}
							</h5> */}
								</h1>
								<p
									className="w-auto pt-3"
									style={{
										fontWeight: "lighter",
										fontSize: "0.9rem",
										// width: "60vw",
										textAlign: "justify",
										color: "silver",
									}}
								>
									{userData.detail == null ? (
										""
									) : (
										<>{userData.detail}</>
									)}
								</p>
							</div>
							<div>
								<span
									style={{
										position: "absolute",
										right: "1rem",
										top: 30,
									}}
									onClick={openEditModal}
								>
									<MdModeEdit
										style={{
											fontSize: "1.5rem",
											color: "#",
										}}
									/>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <ProfileBookCarousel
				BookId={BookId}
				bookDetails={bookDetails}
				bookData={bookData}
				// userId={userData._id}
			/> */}
			{/* --------------------- */}

			<>
				<div
					id="profile-book-slider"
					className="container"
					style={{ marginTop: "3rem", marginBottom: "3rem" }}
				>
					<div className=" mb-3">
						<h2> Your Books </h2>
					</div>

					<div className="open-btn">
						<div
							className="openModalBtn"
							onClick={() => {
								setModalOpen(true);
							}}
							style={{ cursor: "pointer" }}
						>
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
						{modalOpen && (
							<CreateBookModal
								openModal={modalOpen}
								setModalOpen={setModalOpen}
								id={userData._id}
								bookDetail={bookDetails}
							/>
						)}
					</div>

					<hr
						style={{ border: "2px solid silver" }}
						className="mb-5"
					/>

					<div align={"center"}>
						{bookData.length == 0 ? (
							<>
								<h1> Upload Your Book </h1>
							</>
						) : (
							<>
								<Slider {...settings}>
									{bookData.map((item, index) => {
										return (
											<>
												<div
													class="card"
													onClick={() => {
														handleModal(
															true,
															item._id,
															index
														);
													}}
												>
													<div
														style={{
															display: "none",
														}}
													>
														open
													</div>

													<img
														src={item.image}
														class="card-img-top"
														alt="..."
														style={{
															minHeight: "42vh",
															maxHeight: "42vh",
															width: "16rem",
														}}
													/>

													<div class="card-body ">
														<h4
															class="card-title"
															align={"left"}
														>
															{item.name}
														</h4>
													</div>
													<ul class="list-group list-group-flush">
														<li
															class="list-group-item"
															align={"left"}
														>
															<button
																style={{
																	backgroundColor:
																		"white",
																	border: "none",
																}}
																onClick={() =>
																	deleteBook(
																		item._id
																	)
																}
															>
																<MdDeleteForever
																	style={{
																		fontWeight:
																			"bolder",
																		fontSize:
																			"1.7rem",
																		color: "red",
																	}}
																/>
															</button>
														</li>
													</ul>
												</div>
											</>
										);
									})}
								</Slider>
							</>
						)}
					</div>
				</div>
				{bookData.length == 0 ? (
					<></>
				) : (
					<>
						{BookId && (
							<>
								{detailmodalOpen && (
									<BookDetailModal
										setDetailModalOpen={handleModal}
										id={userData.id}
										bId={index}
										bookDetails={bookDetails}
										bookData={bookData}
										bookId={BookId}
										detailmodalOpen={detailmodalOpen}
									/>
								)}
							</>
						)}
					</>
				)}

				{userData == null ? (
					<></>
				) : (
					<>
						<EditProfileModal
							openEditModal={openEditModal}
							profileOpen={profileOpen}
							bookDetails={bookDetails}
							userData={userData}
						/>
					</>
				)}
			</>
		</>
	);
};

export default Profile;
