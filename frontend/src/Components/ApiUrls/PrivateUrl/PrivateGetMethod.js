import axios from "axios";

const getMethod = (path, callback) => {
	axios
		.get("http://127.0.0.1:5000/api/" + path)
		.then((Response) => {
			callback(Response);
		})
		.catch((error) => {
			callback(error.response);
		});
};

export default getMethod;
