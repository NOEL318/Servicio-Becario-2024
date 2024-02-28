import { useNavigate, useParams } from "react-router-dom";
import { DeleteSimulador, GetSimulador } from "../hooks/useSimuladores";
import { useEffect, useState } from "react";
import { FaTrash, FaClone } from "react-icons/fa";
import { Modal } from "../components/Modal";

export const Simulador = ({ user }) => {
	const { _id } = useParams();
	const [showModal, setshowModal] = useState(false);
	const [simulador, setsimulador] = useState();
	let navigate = useNavigate();

	useEffect(() => {
		const getData = async () => {
			var { data } = await GetSimulador(_id);
			setsimulador(data);
		};
		getData();
	}, []);

	const routeChange = (path) => {
		navigate(path);
	};

	const Delete = async () => {
		var { data } = await DeleteSimulador(_id);
		if (data.deletedCount == 1) {
			window.alert("OK");
			const path = "/Catalogo";
			routeChange(path);
		}
	};

	const Clone = async () => {
		setshowModal(true);
		// var { data } = await CloneSimulador(_id);
		// if (data.deletedCount == 1) {
		// 	window.alert("OK");
		// 	const path = "/Catalogo";
		// 	routeChange(path);
		// }
	};

	if (simulador && user) {
		return (
			<>
				{showModal ? (
					<Modal
						setshowModal={setshowModal}
						showModal={showModal}
					/>
				) : (
					<></>
				)}
				<div className="simulador">
					<h1>{simulador.nombre_maquina}</h1>
					<img
						src={simulador.image_url}
						alt=""
					/>

					{(user.role == "admin" || user.role == "read-write") && (
						<div className="buttons">
							<button
								onClick={Delete}
								className="delete_button"
							>
								<FaTrash size={20} />
							</button>
							{/* <button className="clone_button" onClick={Clone}>
							<FaClone size={20} />
						</button> */}
						</div>
					)}
					<div className="text">
						<h3>Marca: {simulador.marca}</h3>
						<h3>Modelo: {simulador.modelo}</h3>

						<h4>No. Activo Fijo: AF/{simulador.numero_activo_fijo}</h4>
						<h4>Ubicación: {simulador.ubicacion}</h4>
					</div>

					<p className="caracteristicas">{simulador.caracteristicas}</p>
				</div>
			</>
		);
	}
};
