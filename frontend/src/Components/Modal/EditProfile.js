import React, { useState } from "react";
import { useEffect } from "react";
import { BsBag } from "react-icons/bs";
import Axios from "axios";

const EditProfileModal = (props) => {
	const [imageValue, setImageValue] = useState();
	const [image, setImage] = useState();
	const [url, setUrl] = useState("");

	const handleChange = (e) => {
		setImageValue(e.target.files[0]);
	};
	console.log(imageValue);

	const handleSubmit = (e) => {
		e.preventDefault();
		let body = {
			name: e.target.elements.name.value,
			image: imageValue,
			detail: e.target.elements.detail.value,
			// userId: localStorage.getItem("tokenId"),
		};
		uploadImage(body);
	};

	const uploadImage = (body) => {
		console.log(body.image);
		const imgData = new FormData();
		imgData.append("file", body.image);
		imgData.append("upload_preset", "bookProjectImage");
		imgData.append("cloud_name", "dut3pcnma");
		Axios.post(
			" https://api.cloudinary.com/v1_1/dut3pcnma/image/upload ",
			imgData
		).then((response) => {
			setUrl(response.data.secure_url);
			handleEditProfileSubmit(response.data.secure_url, body);
			console.log(response.data.secure_url, body);
		});
	};

	const handleEditProfileSubmit = (imageValue, body) => {
		let UserData = {
			name: body.name,
			detail: body.detail,
			userId: localStorage.getItem("tokenId"),
			image: imageValue,
		};
		console.log(UserData);
		Axios.post("http://127.0.0.1:5000/api/editProfile", UserData)
			.then((Response) => {
				console.log(Response);
				props.openEditModal();
				props.bookDetails();
			})
			.catch(() => {});
	};

	return (
		<>
			{props.profileOpen == true ? (
				<>
					<div
						class="modal"
						tabindex="-1"
						role="dialog"
						style={{ display: "block" }}
					>
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title">Edit Profile</h5>

									<button
										type="button"
										class="close"
										data-dismiss="modal"
										aria-label="Close"
										onClick={props.openEditModal}
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<form onSubmit={handleSubmit}>
									<div class="modal-body">
										<div class="form-group">
											<label for="exampleFormControlFile1">
												{" "}
												Upload Image{" "}
											</label>
											{imageValue == "" ? (
												<>
													<img
														src={
															props.userData.image
														}
														width="300"
													/>
												</>
											) : (
												<></>
											)}

											<br />
											<br />
											<input
												type="file"
												class="form-control"
												id="image"
												name="image"
												onChange={handleChange}
											/>
										</div>
										<div class="form-group">
											<label for="exampleFormControlFile1">
												{" "}
												Name
											</label>
											<input
												type="input"
												class="form-control"
												name="name"
												id="name"
												defaultValue={
													props.userData.name
												}
											/>
										</div>

										<div class="form-group">
											<label for="exampleFormControlFile1">
												{" "}
												Detail
											</label>
											<textarea
												class="form-control"
												type="input"
												name="detail"
												id="details"
												defaultValue={
													props.userData.detail
												}
											/>
										</div>
									</div>
									<div class="modal-footer">
										<button
											type="submit"
											class="btn sign_in-btn"
										>
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</>
			) : (
				""
			)}
		</>
	);
};

export default EditProfileModal;
