import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import profile from "./defaultImage/profile.png";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BookDetails = () => {
	useEffect(() => {
		bookDetailed();
	}, []);

	useEffect(() => {
		reviewDetails();
	}, []);

	const cartArr = [];
	const [bookDetailedData, setBookDetailedData] = useState("");
	const [reviewData, setReviewData] = useState("");

	const [bookId, setBookId] = useState(useParams());
	// console.log(bookId.BookId);

	const bookDetailed = (value) => {
		let body = {
			bookId: bookId.BookId,
		};
		Axios.post("http://127.0.0.1:5000/api/book", body)
			.then((Response) => {
				setBookDetailedData(Response.data.message);
			})
			.catch(() => {});
	};

	const reviewDetails = (value) => {
		let body = {
			bookId: bookId.BookId,
		};
		Axios.post("http://127.0.0.1:5000/api/setReviewData", body)
			.then((Response) => {
				setReviewData(Response.data.message);
			})
			.catch(() => {});
	};

	const submitReview = (event) => {
		event.preventDefault();
		let body = {
			bookId: bookId.BookId,
			userName: bookDetailedData.name,
			review: event.target.elements.review.value,
		};
		Axios.post("http://127.0.0.1:5000/api/createReview", body)
			.then((Response) => {
				reviewDetails();
				toast.success("You Reviewed !");
			})
			.catch(() => {});
	};

	const addToCart = (image, name, price) => {
		let data = {
			image: image,
			name: name,
			price: price,
		};

		console.log(data);
		// Save allEntries back to local storage
		cartArr.push(data);
		localStorage.setItem("cart", JSON.stringify(cartArr));
	};

	const [previewModal, setPreviewModal] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const openPreviewModal = (image) => {
		if (previewModal == false) {
			setPreviewModal(true);
			setPreviewImage(image);
		} else {
			setPreviewModal(false);
		}
	};

	return (
		<>
			{bookDetailedData.length == 0 ? (
				"No Data "
			) : (
				<>
					<div
						className="container-fluid"
						style={{ marginTop: "100px" }}
					>
						<div class="row">
							<div class="col-sm-4">
								<img
									src={bookDetailedData.image}
									alt=""
									class="w-10 p-3 container"
									style={{
										height: "70vh",
									}}
								/>
								<img
									src={bookDetailedData.preview}
									alt=""
									class="w-10 p-3 container"
									style={{
										height: "10vh",
										width: "10vh",
									}}
									onClick={() =>
										openPreviewModal(
											bookDetailedData.preview
										)
									}
								/>
							</div>
							<div class="col-sm-8">
								{" "}
								<div className=" mt-3">
									<h3 className="book-heading">
										{bookDetailed.name == null ? (
											""
										) : (
											<>{bookDetailedData.name}</>
										)}
									</h3>

									<p className="about-book ">
										{bookDetailedData.detail == null ? (
											""
										) : (
											<>{bookDetailedData.detail}</>
										)}
									</p>
									<h1
										style={{
											color: "#ff5f00",
											fontWeight: "bold",
										}}
									>
										{bookDetailed.name == null ? (
											""
										) : (
											<>{bookDetailedData.price} &euro;</>
										)}
									</h1>
									<button
										class=" btn sticky-bottom"
										style={{
											backgroundColor: "#ff5f00",
											borderRadius: "10px",
											marginTop: "20px",
										}}
										onClick={() =>
											addToCart(
												bookDetailedData.image,
												bookDetailedData.name,
												bookDetailedData.price
											)
										}
									>
										<h5 style={{ color: "white" }}>
											{" "}
											Add to cart
										</h5>
									</button>
								</div>
							</div>
						</div>
						<br />
						<hr />
						<br />

						<div class="row">
							<div class="col-sm-6">
								<div className="p-2">
									<h3>About Book</h3>
									<p>
										{bookDetailedData.about == null ? (
											""
										) : (
											<>{bookDetailedData.about}</>
										)}
									</p>
								</div>
							</div>
							<div class="col-sm-6">
								<div className=" p2">
									<h3>About Author</h3>
									<p>
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Cumque, animi magni!
										Ullam nam voluptatem deserunt non
										corporis saepe necessitatibus distinctio
										exercitationem laudantium laboriosam,
										cupiditate magnam minima eos tempore rem
										autem?
									</p>
								</div>
							</div>
						</div>

						<br />
						<hr />
						<br />

						<div
							className=" container-fluid mt-5"
							style={{
								boxShadow: "0px 0px 2px grey",
								borderRadius: "5px",
								paddingTop: "10px",
								paddingBottom: "10px",
							}}
						>
							<h3 className="mt-2">Reviews</h3>
							<div>
								<div className="row">
									<div className={"col-sm-12"}>
										<form
											action=""
											onSubmit={submitReview}
											className="mb-3"
										>
											<label
												htmlFor="test"
												className="d-block ml-3"
												style={{
													fontSize: "15px",
													fontWeight: "bold",
												}}
											>
												Write A Review
											</label>
											<div
												className={
													"form-group pl-3 pr-3"
												}
											>
												<textarea
													className={"form-control"}
													type="text"
													name="review"
													placeholder="write a review..."
													id="review"
												/>
											</div>
											<button
												className="btn mt-2 ml-3"
												style={{
													backgroundColor: "#ff5f00",
													color: "white",
												}}
												type="submit"
											>
												Submit
											</button>
										</form>
									</div>
								</div>

								<ul>
									{reviewData.length == 0 ? (
										<></>
									) : (
										<>
											{reviewData.map((item, index) => {
												return (
													<>
														<li
															className=" p-2 mb-3"
															style={{
																boxShadow:
																	"0px 0px 2px grey",
																borderRadius:
																	"5px",
															}}
														>
															<span className="d-flex">
																<img
																	src={
																		profile
																	}
																	alt=""
																	style={{
																		height: "3rem",
																		borderRadius:
																			"50%",
																	}}
																/>
																<h5 className="mt-1 pl-3">
																	{
																		item.userName
																	}
																	<br />
																	<span
																		style={{
																			fontSize:
																				"10px",
																		}}
																	>
																		{" "}
																		{
																			item.startDate
																		}{" "}
																	</span>
																</h5>
															</span>
															<p
																style={{
																	marginLeft:
																		"4rem",
																	fontSize:
																		"20px",
																}}
															>
																{item.review}
															</p>
														</li>
													</>
												);
											})}
										</>
									)}
								</ul>
							</div>
						</div>
					</div>

					<br />
					<br />
					<br />

					{previewModal == false ? (
						<></>
					) : (
						<>
							<div
								class="modal fade show"
								id="exampleModal"
								tabindex="-1"
								role="dialog"
								aria-labelledby="exampleModalLabel"
								aria-hidden="true"
								style={{ display: "block" }}
							>
								<div class="modal-dialog" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h5
												class="modal-title"
												id="exampleModalLabel"
											>
												Preview Notes
											</h5>
											<button
												type="button"
												class="close"
												data-dismiss="modal"
												aria-label="Close"
												onClick={() =>
													openPreviewModal(
														previewImage
													)
												}
											>
												<span aria-hidden="true">
													&times;
												</span>
											</button>
										</div>
										<div
											class="modal-body"
											align={"center"}
										>
											<img
												src={previewImage}
												width={"340"}
											/>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};

export default BookDetails;
