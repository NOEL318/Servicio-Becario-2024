import { useEffect, useState } from "react";
import { GetSimuladores } from "../hooks/useSimuladores";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { RiFileExcel2Line } from "react-icons/ri";
import { CSVLink, CSVDownload } from "react-csv";

export const Catalogo = () => {
  const [simuladores, setsimuladores] = useState([]);
  const [searches, setsearches] = useState();
  const [excelfiledownloadable, setexcelfiledownloadable] = useState([]);
  useEffect(() => {
    const getData = async () => {
      var { data } = await GetSimuladores();
      await data.map(({ caracteristicas }) => {
        if (caracteristicas) {
          caracteristicas = JSON.stringify(caracteristicas)
            .replace(/\\n|\\|\\r/g, " ")
            .replace(/"/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();
        }
      });
      setsimuladores(data);
      await duplicateObjects(data);
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

  async function duplicateObjects(simuladores) {
    let result = [];

    simuladores.forEach(
      ({
        _id,
        numero_activo_fijo,
        nombre_maquina,
        caracteristicas,
        modelo,
        marca,
        image_url,
        cantidad,
      }) => {
        numero_activo_fijo.forEach((numero) => {
          result.push({
            // ...item,
            _id,
            numero_activo_fijo: numero[0] || "",
            ubicacion: numero[1] || "",
            nombre_maquina: nombre_maquina || "",
            caracteristicas: caracteristicas || "",
            modelo: modelo || "",
            marca: marca || "",
            image_url: image_url || "",
            cantidad: cantidad || 0,
          });
        });
      }
    );
    await setexcelfiledownloadable(result);
    return result;
  }

  if (simuladores) {
    return (
      <>
        <div className="topbar">
          <div className="searchbar">
            <CiSearch />
            <input
              type="text"
              placeholder="Buscar"
              onChange={async (e) => await filter_data(e.target.value)}
            ></input>
          </div>
          <div className="excel_button">
            <CSVLink
              data={excelfiledownloadable}
              separator={";"}
              enclosingCharacter='"'
            >
              <button className="button">
                <RiFileExcel2Line />
                Descargar Excel
              </button>
            </CSVLink>
          </div>
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
