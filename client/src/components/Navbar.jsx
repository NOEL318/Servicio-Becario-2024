import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SignOut } from "../hooks/userSlice";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState } from "react";

export const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const [isOpen, setisOpen] = useState(false);
  const logout = async () => {
    dispatch(SignOut());
  };

  return (
    <>
      <div className={`navbar ` + isOpen}>
        {user && (
          <ul>
            <li
              onClick={() => {
                setisOpen(!isOpen);
              }}
            >
              <Link to={"/Catalogo"}>Catálogo</Link>
            </li>
            {(user.role == "admin" || user.role == "read-write") && (
              <li
                onClick={() => {
                  setisOpen(!isOpen);
                }}
              >
                <Link to={"/Registro"}>Registro de Activos</Link>
              </li>
            )}
            {user.role == "admin" && (
              <li
                onClick={() => {
                  setisOpen(!isOpen);
                }}
              >
                <Link to={"/Admin-Panel"}>Panel de Administrador</Link>
              </li>
            )}
            <li
              onClick={() => {
                setisOpen(!isOpen);
              }}
            >
              <Link to={"/Prestamos"}>Prestamos</Link>
            </li>
            <li
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Cerrar Sesión"
              onClick={() => {
                setisOpen(!isOpen);
                logout();
              }}
            >
              {user.username}
            </li>
          </ul>
        )}
        <div className="dropdown_button">
          <button
            className="button_burguer"
            onClick={() => {
              setisOpen(!isOpen);
            }}
          >
            <FaBarsStaggered />
          </button>
        </div>
      </div>
    </>
  );
};
