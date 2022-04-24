import axios from "axios";

const postMethod = (body, path, callback) => {
	axios
		.post("http://127.0.0.1:5000/api" + path, body)
		.then((Response) => {
			callback(Response);
		})
		.catch((error) => {
			callback(error.response);
		});
};

export default postMethod;
