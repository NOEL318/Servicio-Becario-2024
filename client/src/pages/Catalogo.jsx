import { useEffect, useState } from "react";
import { GetSimuladores } from "../hooks/useSimuladores";
import { Link } from "react-router-dom";

export const Catalogo = () => {
	const [simuladores, setsimuladores] = useState();
	useEffect(() => {
		const getData = async () => {
			var { data } = await GetSimuladores();
			setsimuladores(data);
		};
		getData();
	}, [1]);

	if (simuladores) {
		return (
			<>
				<div className="cards">
					{simuladores.map((simulador) => (
						<Link
							to={`/Simulador/${simulador._id}`}
							key={simulador._id}
						>
							<div className="card">
								<div className="image">
									<img
										src={simulador.image_url}
										alt=""
									/>
								</div>
								<div className="info">
									<p className="field">Nombre: </p>
									<p className="title">{simulador.nombre_maquina}</p>
									<p className="field">Marca: </p>
									<p className="marca">{simulador.marca}</p>
									<p className="field">Modelo: </p>
									<p className="modelo">{simulador.modelo}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</>
		);
	}
};
