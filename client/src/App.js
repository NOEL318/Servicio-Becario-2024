import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Registro from "./pages/Registro";
import { Catalogo } from "./pages/Catalogo";
import { Simulador } from "./pages/Simulador";
import { Auth } from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginwithoutpassword } from "./hooks/userSlice";
import { Tooltip } from "react-tooltip";

function App() {
	const dispatch = useDispatch();
	const { isSucces, user, isLoading } = useSelector((state) => state.Auth);

	useEffect(() => {
		dispatch(loginwithoutpassword());
	}, [isSucces]);

	if (isLoading == false) {
		return (
			<BrowserRouter>
				<Tooltip id="my-tooltip" />
				<Navbar user={user} />
				<Routes>
					<Route
						path="/"
						element={<Auth />}
					/>
					<Route
						path="/Registro"
						element={user && isSucces ? <Registro /> : <Auth />}
					/>
					<Route
						path="/Catalogo"
						element={user && isSucces ? <Catalogo /> : <Auth />}
					/>
					<Route
						path="/Simulador/:_id"
						element={user && isSucces ? <Simulador /> : <Auth />}
					/>
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
