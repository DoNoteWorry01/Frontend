import React from "react";
import SignUpForm from "../SignUpForm";
import { ImCross } from "react-icons/im";

const SignUpModal = (props) => {
	return (
		<>
			<div className="modalBackground">
				<div className="modalContainer">
					<div className="titleCloseBtn">
						<button
							onClick={() => {
								props.setModalOpen(false);
							}}
						>
							x
						</button>
					</div>
					<button className="modal-fullContainer">
						<div className="title">
							{/* <span>{props.dialogMessage}</span> */}
							{/* <span>Sign Up</span> */}
						</div>
						<div className="body">
							<SignUpForm />
							{/* <label htmlFor="text">First Name</label>
							<input type="text" />
							<label htmlFor="text">Last Name</label>
							<input type="text" />
							<label htmlFor="text">Email</label>
							<input type="email" />
							<label htmlFor="text">Password</label>
							<input type="password" /> */}
						</div>
					</button>
					<div className="footer">
						{/* <button
							// onClick={() => {
							// 	setOpenModal(false);
							// }}
							onClick={() => {
								props.setModalOpen(false);
							}}
							id="cancelBtn"
						>
							CANCEL
						</button> */}
						{/* <button onClick={deleteMethod}>CONTINUE</button> */}
						{/* <button>CONTINUE</button> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUpModal;
