import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<div className="navbar">
				<ul>
					<li>
						<Link to={"/"}>Inicio</Link>
					</li>
					<li>
						<Link to={"/Catalogo"}>Catálogo</Link>
					</li>
					<li>
						<Link to={"/Registro"}>Registro de Activos</Link>
					</li>
					<li>
						<Link to={"/"}>Editar Activos</Link>
					</li>
				</ul>
			</div>
		</>
	);
};
