import React, { useState } from "react";
import { useEffect } from "react";
import { BsBag } from "react-icons/bs";
import CreateBookForm from "../CreateBookForm";

const CreateBookModal = (props) => {
	const handleSubmit = (event) => {
		event.preventDefault();
		let body = {};
	};

	return (
		<>
			{props.openModal == true ? (
				<>
					<div
						class="modal"
						tabindex="-1"
						role="dialog"
						style={{ display: "block" }}
					>
						<div
							class="modal-dialog modal-dialog-scrollable"
							role="document"
						>
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title">Create Book</h5>

									<button
										type="button"
										class="close"
										data-dismiss="modal"
										aria-label="Close"
										onClick={props.setModalOpen}
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>

								<div class="modal-body-edit-book">
									<CreateBookForm />
								</div>
								{/* <form onSubmit={handleSubmit}>
									<div class="modal-body">
										<div class="form-group">
											<label for="exampleFormControlFile1">
												{" "}
												Upload Book Image{" "}
											</label>
											<input
												type="file"
												class="form-control-file"
												id="exampleFormControlFile1"
											/>
										</div>
										<div class="form-group">
											<label for="exampleFormControlFile1">
												Book Name
											</label>
											<input
												type="input"
												class="form-control-file"
												name="name"
											/>
										</div>
										<div class="form-group">
											<label for="exampleFormControlFile1">
												{" "}
												Book Price
											</label>
											<input
												type="number"
												class="form-control-file"
												name="price"
											/>
										</div>
										<div class="form-group">
											<label for="exampleFormControlFile1">
												{" "}
												Book Detail
											</label>
											<textarea
												class="form-control-file"
												type="input"
												name="detail"
											/>
										</div>

										<hr />

										<div class="form-group">
											<label for="exampleFormControlFile1">
												{" "}
												Auther Image
											</label>
											<input
												class="form-control-file"
												type="file"
												name="autherImage"
											/>
										</div>
										<div class="form-group">
											<label for="exampleFormControlFile1">
												{" "}
												Auther Name
											</label>
											<input
												class="form-control-file"
												type="input"
												name="autherName"
											/>
										</div>
										<div class="form-group">
											<label for="exampleFormControlFile1">
												{" "}
												Auther Detail
											</label>
											<textarea
												class="form-control-file"
												type="input"
												name="autherDetail"
											/>
										</div>
									</div>
									<div class="modal-footer">
										<button
											type="button"
											class="btn sign_in-btn"
										>
											Save changes
										</button>
									</div>
								</form> */}
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

export default CreateBookModal;
