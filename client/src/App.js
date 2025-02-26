import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Registro from "./pages/Registro";
import { Catalogo } from "./pages/Catalogo";
import { Prestamos } from "./pages/Prestamos";
import { Simulador } from "./pages/Simulador";
import { Auth } from "./pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginwithoutpassword } from "./hooks/userSlice";
import { Tooltip } from "react-tooltip";
import { Admin } from "./pages/Admin";

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
          <Route path="/" element={!user ? <Auth /> : <Catalogo />} />
          <Route
            path="/Admin-Panel"
            element={
              user && isSucces ? (
                user.role == "admin" ? (
                  <Admin user={user} />
                ) : (
                  <Catalogo />
                )
              ) : (
                <Auth />
              )
            }
          />
          <Route
            path="/Registro"
            element={
              user && isSucces ? (
                user.role == "admin" || user.role == "read-write" ? (
                  <Registro />
                ) : (
                  <Catalogo />
                )
              ) : (
                <Auth />
              )
            }
          />
          <Route
            path="/Catalogo"
            element={user && isSucces ? <Catalogo /> : <Auth />}
          />
          <Route
            path="/Prestamos"
            element={user && isSucces ? <Prestamos /> : <Auth />}
          />
          <Route
            path="/Simulador/:_id"
            element={user && isSucces ? <Simulador user={user} /> : <Auth />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
