import React, { useState } from "react";
import { useEffect } from "react";
import { BsBag } from "react-icons/bs";
import BookDetailsForm from "../BookDetailsForm";

const BookDetailModal = (props) => {
	const handleSubmit = (event) => {
		event.preventDefault();
		let body = {};
	};

	return (
		<>
			{props.detailmodalOpen == true ? (
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
									<h5 class="modal-title">Edit Book</h5>

									<button
										type="button"
										class="close"
										data-dismiss="modal"
										aria-label="Close"
										onClick={props.setDetailModalOpen}
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>

								<div class="modal-body-edit-book">
									<BookDetailsForm
										setDetailModalOpen={
											props.setDetailModalOpen
										}
										id={props.id}
										bId={props.bId}
										bookDetails={props.bookDetails}
										bookData={props.bookData}
										bookId={props.bookId}
										detailmodalOpen={props.detailmodalOpen}
									/>
								</div>
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

export default BookDetailModal;
