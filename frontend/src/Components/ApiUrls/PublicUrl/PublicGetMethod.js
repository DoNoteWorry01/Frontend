import axios from "axios";

const privatePostMethod = (body, path, callback) => {
	let headers = {
		Authorization: `Token ${localStorage.getItem("token")}`,
	};
	axios
		.post("http://127.0.0.1:5000/api" + path, body, {
			headers: headers,
		})
		.then((Response) => {
			callback(Response);
		})
		.catch((error) => {
			callback(error.response);
		});
};

export default privatePostMethod;
