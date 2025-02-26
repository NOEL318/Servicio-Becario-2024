import { useEffect, useState } from "react";
import { GetPrestamos, GetSimuladores } from "../hooks/useSimuladores";
import { Modal } from "../components/Modal";
import { RiMedicineBottleFill } from "react-icons/ri";
import { MdArrowOutward } from "react-icons/md";

export const Prestamos = () => {
  const [prestamos, setprestamos] = useState();
  const [searches, setsearches] = useState();
  const [showModal, setshowModal] = useState(false);
  const [finded, setfinded] = useState();
  const [imageUrl, setimageUrl] = useState(<RiMedicineBottleFill />);
  const [permission_event_1, setpermission_event_1] = useState(false);
  useEffect(() => {
    const getData = async () => {
      var { data } = await GetPrestamos();

      setprestamos(data);
    };
    getData();
  }, [1]);
  var i = 0;

  var search_data = async (search) => {
    var { data } = await GetSimuladores();
    var resultado = await data.filter(
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

  if (prestamos) {
    return (
      <>
        <Modal
          showModal={showModal}
          content={
            <>
              <img src={imageUrl} alt="" />
              <input
                placeholder={
                  finded ? finded.nombre_maquina : "Nombre del Material"
                }
                value={finded ? finded.nombre_maquina : null}
                onChange={(e) => search_data(e.target.value)}
              />
              {searches &&
                searches.slice(0, 5).map((simulador_buscado, index) => (
                  <div className="result_search" key={index}>
                    <button
                      className="search_button_select"
                      onClick={() => {
                        setfinded(simulador_buscado);
                        setsearches();
                      }}
                    >
                      <img src={simulador_buscado.image_url} />
                      {simulador_buscado.nombre_maquina}
                    </button>
                    <MdArrowOutward />
                  </div>
                ))}

              {finded && (
                <select name="" id="" className="input">
                  {finded.numero_activo_fijo.map(
                    (numero_activo_fijo, index) => {
                      return (
                        <option value="" key={index}>
                          {"AF/" +
                            numero_activo_fijo[0] +
                            " - " +
                            numero_activo_fijo[1]}
                        </option>
                      );
                    }
                  )}
                </select>
              )}
            </>
          }
          action_event_1={
            <>
              {permission_event_1 && (
                <button className="button">Registrar Activo</button>
              )}
            </>
          }
          let_action_event_1={permission_event_1}
          title={"Préstamo de Material"}
          setshowModal={setshowModal}
        />
        <div className="prestamos">
          <div className="new_prestamo">
            {!showModal && (
              <button className="button" onClick={() => setshowModal(true)}>
                Nuevo Préstamo
              </button>
            )}
          </div>
          <h1>Préstamos</h1>
          <table className="tabla_prestamos">
            <thead>
              <tr>
                <td>Nombre Usuario</td>
                <td>Fecha Préstamo</td>
                <td>Hora Préstamo</td>
                <td>Fecha Devolución</td>
                <td>Hora Devolución</td>
                <td>Simuladores</td>
              </tr>
            </thead>
            <tbody>
              {prestamos.map((prestamo) => {
                return (
                  <tr key={prestamo._id + Math.floor(Math.random() * 1000)}>
                    <td>{prestamo.nombre_usuario}</td>
                    <td>{prestamo.fecha_prestamo}</td>
                    <td>{prestamo.hora_prestamo}</td>
                    <td>{prestamo.fecha_devolucion}</td>
                    <td>{prestamo.hora_devolucion}</td>
                    <td>
                      <ul>
                        {prestamo.simuladores.map((simulador) => {
                          return (
                            <li
                              key={
                                simulador[0] +
                                simulador[1] +
                                Math.floor(Math.random() * 1000)
                              }
                            >
                              {simulador[0] + "-" + simulador[1]}
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};
