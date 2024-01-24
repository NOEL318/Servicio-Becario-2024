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
				<h1>{simulador.nombre_maquina}</h1>
				<img
					src={simulador.image_url}
					alt=""
				/>
				<h1>{simulador.marca}</h1>
				<h1>{simulador.modelo}</h1>

				<h1>AF/{simulador.numero_activo_fijo}</h1>
				<h1>Ubicación: {simulador.numero_activo_fijo}</h1>

			</>
		);
};
