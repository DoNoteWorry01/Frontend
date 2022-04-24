import React from "react";

const TabChange = ({ setTabType, tabType }) => {
	const tabChange = (data) => {
		setTabType(data);
	};
	return (
		<>
			<ul className="company-redirect">
				<li onClick={() => tabChange("LOGIN")}>
					<div>login</div>
				</li>

				<li onClick={() => tabChange("REGISTRATION")}>
					<div>Registration</div>
				</li>
			</ul>
		</>
	);
};

export default TabChange;
