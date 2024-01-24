import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./main.scss";
import { Navbar } from "./components/Navbar";
import Registro from "./pages/Registro";
import { Catalogo } from "./pages/Catalogo";
import { Simulador } from "./pages/Simulador";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<App />}
				/>
				<Route
					path="/Registro"
					element={<Registro />}
				/>
				<Route
					path="/Catalogo"
					element={<Catalogo />}
				/>
				<Route
					path="/Simulador/:_id"
					element={<Simulador />}
				/>
			</Routes>
		</BrowserRouter>
	</>
);
