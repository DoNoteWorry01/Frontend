import React, { useState } from "react";
import { useEffect } from "react";
import { BsBag } from "react-icons/bs";

const CartModal = (props) => {
	// useEffect(() => {
	// 	cartDetails();
	// }, []);

	// const cartDetails = () => {
	// 	localStorage.getItem("cart");
	// };

	// console.log(cartDetails);

	console.log(props);

	const [cartData, setCartData] = useState([]);
	const [cartPrice, setCartPrice] = useState([]);

	useEffect(() => {
		getCart();
	}, []);

	const getCart = () => {
		const cartData = JSON.parse(localStorage.getItem("cart"));
		let total = 0;
		if (cartData) {
			for (let item of cartData) {
				total = total + parseInt(item["price"]);
				console.log(total);
			}
			setCartPrice(total);
			setCartData(cartData);
		}
	};

	const removeChart = (index) => {
		let data = JSON.parse(localStorage.getItem("cart"));
		let deleteValue = data
			.splice(0, index)
			.concat(data.slice(index + 1, data.length));
		localStorage.setItem("cart", JSON.stringify(deleteValue));
		getCart();
	};

	const click = () => {
		alert("alert");
	};

	return (
		<>
			<div className="modalBackground">
				<div className="modalContainer w-75" style={{}}>
					<button className="modal-fullContainer">
						<div className="title"></div>

						<div className="modal-body">
							<div className="container">
								<div className="row">
									<div className="col-sm-11" align={"left"}>
										<h2>
											<BsBag /> My Cart
										</h2>
									</div>
									<div className="col-sm-1">
										<div align={"right"}>
											<span
												className="delete_color"
												onClick={props.openCart}
											>
												X
											</span>
										</div>
									</div>
								</div>

								<hr />
								<div className="row">
									<div className="col-sm-7">
										<div className="">
											<div className="mt-5">
												{cartData.length == 0 ? (
													<>
														<h1>
															{" "}
															No Cart Here !{" "}
														</h1>
													</>
												) : (
													<div>
														<div
															className="mt-2 cart-area"
															align={"left"}
														>
															<table class="table">
																<thead>
																	<tr>
																		<th scope="col">
																			Image
																		</th>
																		<th scope="col">
																			Name
																		</th>
																		<th scope="col">
																			Price
																		</th>
																		<th scope="col">
																			Remove
																		</th>
																	</tr>
																</thead>
																<tbody>
																	{cartData.map(
																		(
																			item,
																			index
																		) => {
																			return (
																				<>
																					<tr>
																						<td>
																							<img
																								src={
																									item.image
																								}
																								alt=""
																								style={{
																									height: "8rem",
																									width: "5rem",
																									marginRight:
																										"3rem",
																								}}
																							/>
																						</td>
																						<td
																							style={{
																								width: "5rem",
																							}}
																						>
																							{
																								item.name
																							}
																						</td>

																						<td>
																							{
																								item.price
																							}{" "}
																							&euro;
																						</td>
																						<td>
																							<span
																								className="delete_color"
																								onClick={() =>
																									removeChart(
																										index
																									)
																								}
																							>
																								X
																							</span>
																						</td>
																					</tr>
																				</>
																			);
																		}
																	)}
																</tbody>
															</table>
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
									<div className="col-sm-5">
										<div
											className="container pb-3"
											style={{
												border: "1px solid grey",
												marginTop: "5vh",
											}}
										>
											<div className="row pt-2">
												<div
													className="col-sm-9"
													align={"center"}
												>
													<h4>Total Price</h4>
												</div>
												<div
													className="col-sm-3"
													align={"center"}
												>
													<h4>{cartPrice} &euro;</h4>
												</div>
											</div>
											<div align={"center"}>
												{cartData.length == 0 ? (
													<></>
												) : (
													<button className="btn sign_in-btn mt-3">
														Checkout
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</button>
				</div>
			</div>
		</>
	);
};

export default CartModal;
