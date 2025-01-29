import { useEffect, useState } from "react";
import { GetSimuladores } from "../hooks/useSimuladores";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export const Catalogo = () => {
  const [simuladores, setsimuladores] = useState([]);
  const [searches, setsearches] = useState();
  useEffect(() => {
    const getData = async () => {
      var { data } = await GetSimuladores();
      setsimuladores(data);
    };
    getData();
  }, [1]);

  const filter_data = async (search) => {
    var resultado = await simuladores.filter(
      ({
        nombre_maquina,
        modelo,
        marca,
        caracteristicas,
        numero_activo_fijo,
      }) => {
        const lowerSearch = search.toLowerCase();
        const includesIgnoreCase = (str) =>
          str?.toLowerCase().includes(lowerSearch);
        return (
          includesIgnoreCase(nombre_maquina) ||
          includesIgnoreCase(caracteristicas) ||
          includesIgnoreCase(modelo) ||
          includesIgnoreCase(marca) ||
          numero_activo_fijo?.some(
            (activo) =>
              includesIgnoreCase(activo[0]) || includesIgnoreCase(activo[1])
          )
        );
      }
    );

    setsearches(resultado);
  };

  if (simuladores) {
    return (
      <>
        <div className="searchbar">
          <CiSearch />
          <input
            type="text"
            placeholder="Buscar"
            onChange={async (e) => await filter_data(e.target.value)}
          ></input>
        </div>
        {!searches && (
          <div className="cards">
            {simuladores.map((simulador) => (
              <Link to={`/Simulador/${simulador._id}`} key={simulador._id}>
                <div className="card">
                  <div className="image">
                    <img src={simulador.image_url} alt="" />
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
        )}

        {searches && (
          <div className="cards">
            {searches.map((simulador) => (
              <Link to={`/Simulador/${simulador._id}`} key={simulador._id}>
                <div className="card">
                  <div className="image">
                    <img src={simulador.image_url} alt="" />
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
        )}
      </>
    );
  }
};
