import { useEffect, useState } from "react";
import { GetSimuladores } from "../hooks/useSimuladores";

export const Catalogo = () => {
	const [simuladores, setsimuladores] = useState();
	useEffect(() => {
		const getData = async () => {
			var { data } = await GetSimuladores();
			setsimuladores(data.array);
			console.log(data.array);
		};
		getData();
	}, []);

	if (simuladores) {
		return (
			<>
				<div className="cards">
					{simuladores.map((simulador) => (
						<div
							className="card"
							key={simulador._id}
						>
							<div className="image">
								<img
									src={simulador.image_url}
									alt=""
								/>
							</div>
							<div className="info">
								<p className="field">Nombre: </p>
								<p className="title">{simulador.nombre_maquina}</p>
								<p className="field">Ubicación: </p>
								<p className="location">{simulador.ubicacion}</p>
								<p className="field">Activo Fijo:: </p>
								<p>AF/{simulador.numero_activo_fijo}</p>
								<p className="field">Marca: </p>
								<p className="marca">{simulador.marca}</p>
							</div>
						</div>
					))}
				</div>
			</>
		);
	}
};
