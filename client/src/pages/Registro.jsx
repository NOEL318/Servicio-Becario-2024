import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { SendForm } from "../hooks/useSimuladores";
import { FaPlus } from "react-icons/fa6";
function Registro() {
  const [inputList, setinputList] = useState([[]]);

  const [nombre_maquina, setnombre_maquina] = useState();
  const [modelo, setmodelo] = useState();
  const [marca, setmarca] = useState();
  const [ubicacion, setubicacion] = useState();
  const [af, setaf] = useState();
  const [caracteristicas, setcaracteristicas] = useState();
  var nindex = null;
  const [publicId, setPublicId] = useState("");
  const [Url, setUrl] = useState();
  const [cloudName] = useState("dpql7keqk");
  const [uploadPreset] = useState("simuladores");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    folder: "simuladores",
  });

  var form = {
    numero_activo_fijo: inputList,
    nombre_maquina,
    modelo,
    marca,
    caracteristicas,
    image_url: Url,
    cantidad: inputList.length,
  };
  const callFormHook = async () => {
    var res = await SendForm(form);
    if (res.status == 200) {
      window.alert("OK");
    } else {
      window.alert("ERROR " + res.status);
    }
  };

  const cld = new Cloudinary({
    cloudName,
  });

  const myImage = cld.image(publicId);

  const handleListAdd = () => {
    setinputList([...inputList, []]);
  };

  const handleInputChange = (ac_fijo, nindex, ubic) => {
    const newInputList = [...inputList];
    newInputList[nindex][0] = ac_fijo || "";
    newInputList[nindex][1] = ubic || "";
    setinputList(newInputList);
    setaf("");
    setubicacion("");
    handleListAdd();
    console.log(inputList);
  };

  return (
    <div className="registro">
      <h1>Registro de Simuladores</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        {inputList.length > 0
          ? inputList.map((input, index) => {
              nindex = index;
              return (
                <div key={index} className="inputs2">
                  <input
                    type="text"
                    placeholder="Ubicación"
                    onChange={(e) => setubicacion(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="No. Activo Fijo sin el AF/"
                    onChange={(e) => setaf(e.target.value)}
                  />
                  {/* <button
                    className="button small"
                  >
                    Ok
                  </button> */}
                </div>
              );
            })
          : "No hay activos fijos"}
        <ol>
          {inputList.length >= 1
            ? inputList.map((input, index) => {
                return (
                  input[0] != undefined && (
                    <li key={index}>{input[0] + " - " + input[1]}</li>
                  )
                );
              })
            : "No hay activos fijos"}
        </ol>
        <button
          className="button small "
          onClick={(event) => handleInputChange(af, nindex, ubicacion)}
        >
          <FaPlus />
        </button>
        <br />
        <input
          type="text"
          placeholder="Nombre de la Máquina"
          onChange={(e) => setnombre_maquina(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Modelo"
          onChange={(e) => setmodelo(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Marca"
          onChange={(e) => setmarca(e.target.value)}
        />
        <br />

        <textarea
          type="text"
          className="caracteristicas"
          placeholder="Características"
          onChange={(e) => {
            console.log(JSON.stringify(e.target.value));
            setcaracteristicas(
              JSON.stringify(e.target.value).replace(/\n/g, "")
            );
          }}
        />

        <br />
        <CloudinaryUploadWidget
          uwConfig={uwConfig}
          setPublicId={setPublicId}
          setUrl={setUrl}
        />

        <div style={{ width: "200px" }}>
          <AdvancedImage
            style={{ maxWidth: "100%" }}
            cldImg={myImage}
            plugins={[responsive(), placeholder()]}
          />
        </div>
        {Url && (
          <button className="send_button" onClick={callFormHook}>
            Registrar Activo
          </button>
        )}
      </form>
    </div>
  );
}

export default Registro;
