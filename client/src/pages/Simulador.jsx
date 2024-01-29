import { useParams } from "react-router-dom";
import { GetSimulador } from "../hooks/useSimuladores";
import { useEffect, useState } from "react";

export const Simulador = () => {
	const { _id } = useParams();

	const [simulador, setsimulador] = useState();
	useEffect(() => {
		const getData = async () => {
			var { data } = await GetSimulador(_id);
			setsimulador(data.response);
		};
		getData();
	}, []);

	if (simulador)
		return (
			<>
				<div className="simulador">
					<h1>{simulador.nombre_maquina}</h1>
					<img
						src={simulador.image_url}
						alt=""
					/>
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
};
