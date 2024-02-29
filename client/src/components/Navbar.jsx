import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SignOut } from "../hooks/userSlice";

export const Navbar = ({ user }) => {
	const dispatch = useDispatch();
	const logout = async () => {
		dispatch(SignOut());
	};

	return (
		<>
			<div className="navbar">
				<ul>
					<li>
						<Link to={"/Catalogo"}>Catálogo</Link>
					</li>
					{user && (
						<>
							{(user.role == "admin" || user.role == "read-write") && (
								<li>
									<Link to={"/Registro"}>Registro de Activos</Link>
								</li>
							)}
							{user.role == "admin" && (
								<li>
									<Link to={"/Admin-Panel"}>Panel de Administrador</Link>
								</li>
							)}
							<li
								data-tooltip-id="my-tooltip"
								data-tooltip-content="Cerrar Sesión"
								onClick={logout}
							>
								{user.username}
							</li>
						</>
					)}
				</ul>
			</div>
		</>
	);
};
