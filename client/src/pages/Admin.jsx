import { useEffect, useState } from "react";
import {
  deleteUser,
  getUsers,
  updateUserRole,
  updateUserAuthorization,
} from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { TbExchange } from "react-icons/tb";
import Papa from "papaparse";
import { Replace_Inventory } from "../hooks/useSimuladores";

export const Admin = () => {
  const [users, setusers] = useState();
  const { isSucces, user, isLoading } = useSelector((state) => state.Auth);
  useEffect(() => {
    const getData = async () => {
      var data = await getUsers({ id: user._id });
      setusers(data);
    };
    if (user && isSucces) getData();
  }, []);

  const Delete = async (id) => {
    var { data } = await deleteUser({ id });
    if (data.deletedCount == 1) {
      window.alert("OK");
    }
  };

  const handleFile = (e) => {
    Papa.parse(e.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: async function (result) {
        // const valuesArray = [];
        // result.data.map((d) => {

        // 	var keys = {
        // 		_id: d[0],
        //     numero_activo_fijo: d[1],
        //     ubicacion: d[2],
        //     nombre_maquina: d[3],
        //     caracteristicas: d[4],
        //     modelo: d[5],
        //     marca: d[6],
        // 		image_url: d[7],
        // 		cantidad: d[8],
        // 		status:{ocupado: false, usuario: "", id: "", fecha_prestamo: date, fecha_devolucion: "", hora_prestamo: 0, hora_devolucion: 0 }
        //   };
        //   valuesArray.push(keys);
        // });

        let valuesArray = [];

        result.data.map((d) => {
          let existing = valuesArray.find((item) => item._id === d[0]);
          if (existing) {
            existing.numero_activo_fijo.push([d[1], d[2], {}]);
          } else {
            valuesArray.push({
              _id: d[0],
              numero_activo_fijo: [[d[1], d[2], {}]],
              nombre_maquina: d[3],
              caracteristicas: d[4],
              modelo: d[5],
              marca: d[6],
              image_url: d[7],
              cantidad: d[8],
            });
          }
        });

        console.log(valuesArray);
        await Replace_Inventory(valuesArray);
      },
    });
  };

  if (users)
    return (
      <>
        <div className="admin">
          <h1>Panel de Administrador</h1>
          <ul>
            {users.map((usr) => {
              const changeRole = async (newrole) => {
                updateUserRole({ id: usr._id, newrole });
              };
              const changeAuthorization = async (authorized) => {
                var authorization = authorized == "true" ? true : false;
                updateUserAuthorization({ id: usr._id, authorization });
              };
              if (usr._id != user._id)
                return (
                  <li key={usr._id}>
                    <h4>{usr.username}</h4>
                    <div className="side">
                      <p>Permisos:</p>

                      <select
                        name="role"
                        id=""
                        defaultValue={usr.role}
                        onChange={(e) => changeRole(e.target.value)}
                      >
                        <option value="read">Lectura</option>
                        <option value="read-write">Lectura y Escritura</option>
                        <option value="admin">Administrador</option>
                      </select>
                      <button
                        onClick={() => Delete(usr._id)}
                        className="delete_button"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                    <div className="side">
                      <p>Autorizado:</p>
                      <select
                        name="authorization"
                        id=""
                        defaultValue={usr.authorized}
                        onChange={(e) => changeAuthorization(e.target.value)}
                      >
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </li>
                );
            })}
          </ul>

          {/* <h1>Opciones Administrativas</h1>
          <div className="replace_inventory">
            <label className="input_replace">
              <input
                className="input"
                type="file"
                accept=".csv"
                onChange={(e) => handleFile(e)}
              />
              Subir Archivo
            </label>
            <button className="button red">
              <TbExchange />
              Reemplazar Inventario Actual
            </button>
          </div> */}
        </div>
      </>
    );
};
