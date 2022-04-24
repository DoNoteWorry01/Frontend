import React, { useState } from "react";
import LoginModal from "./Modal/LoginModal";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartModal from "./Modal/CartModal";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import profile from "./defaultImage/profile.png";

const Navbar = (props) => {
	const handleTokenId = () => {
		localStorage.setItem("tokenId", null);
		window.location = "/";
	};

	const [cartModalOpen, setCartModalOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	/* Set the width of the side navigation to 250px */
	const openNav = () => {
		document.getElementById("mySidenav").style.width = "250px";
	};

	/* Set the width of the side navigation to 0 */
	const closeNav = () => {
		document.getElementById("mySidenav").style.width = "0";
	};

	let uni = [
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

	const takeUniValue = (value) => {
		props.takeUni(value);
	};

	const openCart = () => {
		if (cartModalOpen == true) {
			setCartModalOpen(false);
		} else {
			setCartModalOpen(true);
		}
	};

	return (
		<>
			<nav
				class="navbar navbar-expand-lg fixed-top navbar-light"
				style={{ backgroundColor: "white" }}
			>
				<a class="navbar-brand" href="/">
					<span style={{ color: "#FF5F00" }}>DONOT</span>WORRY
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarText"
					aria-controls="navbarText"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarText">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item dropdown">
							<form class="form-inline">
								<input
									class="form-control mr-sm-2"
									type="search"
									placeholder="Search"
									aria-label="Search"
								/>
							</form>
						</li>
						<li class="nav-item dropdown">
							<a
								class="nav-link"
								id="navbarDropdownMenuLink"
								aria-expanded="false"
								data-toggle="dropdown"
							>
								University
							</a>
							<div
								class="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								{uni.map((item, index) => {
									return (
										<>
											<a
												class="dropdown-item"
												onClick={() =>
													takeUniValue(item)
												}
											>
												{item}
											</a>
										</>
									);
								})}
							</div>
						</li>
					</ul>
					<ul class="navbar-nav">
						{localStorage.getItem("tokenId") == "null" ? (
							<>
								<li
									class="nav-item dropdown"
									style={{
										paddingTop: "10px !important",
									}}
								>
									<a
										onClick={() => {
											setModalOpen(true);
										}}
									>
										{" "}
										Login{" "}
									</a>
								</li>
							</>
						) : (
							<>
								<li
									class="nav-item dropdown"
									style={{
										paddingTop: "10px !important",
									}}
								>
									<a
										class="nav-link"
										id="navbarDropdownMenuLink"
										aria-expanded="false"
										onClick={() => {
											setCartModalOpen(true);
										}}
										style={{
											fontSize: "25px",
											marginTop: "1px",
											color: "#ff5f00",
										}}
									>
										<AiOutlineShoppingCart />
									</a>
								</li>
								<li class="nav-item dropdown">
									<a
										class="nav-link"
										id="navbarDropdownMenuLink"
										aria-expanded="false"
									>
										<Link to={"/Profile"}>
											<img
												src={profile}
												alt=""
												style={{
													height: "2rem",
													borderRadius: "50%",
													// marginRight: "1rem",
												}}
											/>
										</Link>
									</a>
								</li>
								<li
									class="nav-item dropdown"
									style={{
										paddingTop: "10px !important",
									}}
								>
									<a
										class="nav-link"
										href="#"
										id="navbarDropdownMenuLink"
										aria-expanded="false"
										data-toggle="dropdown"
										onClick={handleTokenId}
									>
										Logout
									</a>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav>

			{modalOpen && <LoginModal setModalOpen={setModalOpen} />}
			{cartModalOpen && <CartModal openCart={openCart} />}

			{/*<nav
				className="navbar  position-sticky fixed-top "
				style={{ backgroundColor: "#ff5f00" }}
			>
				<a className="navbar-brand home-nav" href="#">
					<Link to={"/"}>
						<img src="./img/logo.jpg" width="40" height="40" alt="" />
					</Link>
					<div className="dropdown">
						<span
							style={{
								color: "white",
								fontWeight: "bold",
								marginTop: "10px !important",
								position: "absolute",
								left: "1px",
							}}
							onClick={openNav}
						>
							universities
						</span>
					</div>

					{localStorage.getItem("tokenId") == "null" ? (
						<>
							<div className="open-btn">
								<div
									className="openModalBtn"
									onClick={() => {
										setModalOpen(true);
									}}
									style={{ cursor: "pointer" }}
								>
									<span
										style={{
											fontWeight: "550",
											fontSize: "1.3rem",
											color: "white",
											fontWeight: "600",
											marginTop: "-0.1rem",
										}}
									>
										Login
									</span>
								</div>
								{modalOpen && <LoginModal setModalOpen={setModalOpen} />}
							</div>
						</>
					) : (
						<>
							<div className="Profile d-flex">
								<Link to={"/Profile"}>
									<img
										src={profile}
										alt=""
										style={{
											height: "3rem",
											borderRadius: "50%",
											// marginRight: "1rem",
										}}
									/>
								</Link>

								<div
									className="open-btn"
									style={{
										display: "flex",
										alignItems: "center",
										marginLeft: "1rem",
										cursor: "pointer",
										color: "white",
									}}
								>
									<div
										className="cart-button d-flex align-items-center "
										onClick={() => {
											setCartModalOpen(true);
										}}
										style={{ fontSize: "2rem", marginTop: "-0.5rem" }}
									>
										<AiOutlineShoppingCart />
									</div>
									{cartModalOpen && (
										<CartModal setCartModalOpen={setCartModalOpen} />
									)}
								</div>

								<span
									className="btn"
									style={{
										fontWeight: "550",
										fontSize: "1.3rem",
										color: "white",
										fontWeight: "600",
										marginTop: "-0.1rem",
									}}
									onClick={handleTokenId}
								>
									Logout
								</span>
							</div>
						</>
					)}
				</a>
			</nav>

			<div id="mySidenav" class="sidenav">
				<span href="javascript:void(0)" class="closebtn" onClick={closeNav}>
					&times;
				</span>
				{uni.map((item, index) => {
					return (
						<>
							<a onClick={() => takeUniValue(item)}>{item}</a>
						</>
					);
				})}
			</div>*/}
		</>
	);
};

export default Navbar;
