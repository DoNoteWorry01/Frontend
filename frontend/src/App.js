// import './App.css';
import HomePage from "./Components/HomePage";
import BookDetails from "./Components/BookDetails";
import Profile from "./Components/Profile";

import Navbar from "./Components/Navbar";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<HomePage />} />
				<Route path="/BookDetails/:BookId" element={<BookDetails />} />
				<Route path="/Profile" element={<Profile />} />
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
