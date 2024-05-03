import { useNavigate, useParams } from "react-router-dom";
import { DeleteSimulador, GetSimulador, updateAcf } from "../hooks/useSimuladores";
import { useEffect, useState } from "react";
import { FaTrash, FaClone } from "react-icons/fa";
import { Modal } from "../components/Modal";

export const Simulador = ({ user }) => {
	const { _id } = useParams();
	const [showModal, setshowModal] = useState(false);
	const [simulador, setsimulador] = useState();
	const [activos, setactivos] = useState();
	let navigate = useNavigate();
	const [ubicacion, setubicacion] = useState();
	const [af, setaf] = useState();
	const [inputList, setinputList] = useState([[]]);
	const [enabled, setenabled] = useState(true);
	useEffect(() => {
		const getData = async () => {
			var { data } = await GetSimulador(_id);
			setsimulador(data);
			setactivos(data.numero_activo_fijo);
			setinputList(data.numero_activo_fijo);
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

	const updateAcfijos = async (_id, newInputList) => {
		var { data } = await updateAcf(_id, newInputList);
		if (data.acknowledged == true) {
			window.alert("OK");
		}
	};

	const handleListAdd = () => {
		setinputList([...inputList, []]);
		setenabled(false);
	};

	const handleInputChange = (ac_fijo, index, ubic) => {
		const newInputList = [...inputList];
		newInputList[index][0] = ac_fijo;
		newInputList[index][1] = ubic;
		setinputList(newInputList);
		updateAcfijos(simulador._id, newInputList);
		setenabled(true);
	};

	const handleDeleteInput = (index) => {
		const newArray = [...inputList];
		newArray.splice(index, 1);
		setinputList(newArray);
		updateAcfijos(simulador._id, newArray);
	};

	if (simulador && user && activos) {
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
						</div>
					)}
					<div className="text">
						<h3>Marca: {simulador.marca}</h3>
						<h3>Modelo: {simulador.modelo}</h3>
						<h3>Cantidad: {simulador.cantidad}</h3>
						{activos[0] != null && (
							<>
								<h4>No. Activo Fijo y Ubicación(Cualquier clic en "Ok" o "Eliminar" será irreversible)</h4>

								<ol>
									{inputList.map((activo, index) => {
										return (
											<li key={index}>
												AF/
												<input
													className="input"
													type="text"
													placeholder={activo[0] == null || activo[0] == "" ? "Sin AF" : activo[0]}
													onChange={(e) => {
														setaf(e.target.value);
													}}
												/>
												Ubicación
												<input
													className="input"
													type="text"
													placeholder={activo[1]}
													onChange={(e) => {
														setubicacion(e.target.value);
													}}
												/>
												<button
													className="ok"
													onClick={(event) => handleInputChange(af, index, ubicacion)}
												>
													Ok
												</button>
												{inputList.length > 1 && (
													<button
														className="delete_button"
														onClick={() => handleDeleteInput(index)}
													>
														Eliminar
													</button>
												)}
											</li>
										);
									})}
								</ol>
							</>
						)}
					</div>
					{enabled && (
						<button
							className="button"
							onClick={() => handleListAdd()}
						>
							+
						</button>
					)}

					<p className="caracteristicas">{simulador.caracteristicas}</p>
				</div>
			</>
		);
	}
};
