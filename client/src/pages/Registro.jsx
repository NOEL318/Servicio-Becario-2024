import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { SendForm } from "../hooks/useSimuladores";

function Registro() {
	const [numero_activo_fijo, setnumero_activo_fijo] = useState();
	const [nombre_maquina, setnombre_maquina] = useState();
	const [modelo, setmodelo] = useState();
	const [marca, setmarca] = useState();
	const [ubicacion, setubicacion] = useState();
	const [caracteristicas, setcaracteristicas] = useState();

	const [publicId, setPublicId] = useState("");
	const [Url, setUrl] = useState();
	// Replace with your own cloud name
	const [cloudName] = useState("dpql7keqk");
	// Replace with your own upload preset
	const [uploadPreset] = useState("simuladores");

	const [uwConfig] = useState({
		cloudName,
		uploadPreset,
		// cropping: true, //add a cropping step
		// showAdvancedOptions: true,  //add advanced options (public_id and tag)
		// sources: [ "local", "url"], // restrict the upload sources to URL and local files
		// multiple: false,  //restrict upload to a single file
		folder: "simuladores", //upload files to the specified folder
		// tags: ["users", "profile"], //add the given tags to the uploaded files
		// context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
		// clientAllowedFormats: ["images"], //restrict uploading to image files only
		// maxImageFileSize: 2000000,  //restrict file size to less than 2MB
		// maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
		// theme: "purple", //change to a purple theme
	});

	var form = {
		numero_activo_fijo: [numero_activo_fijo, ubicacion],
		nombre_maquina,
		modelo,
		marca,
		caracteristicas,
		image_url: Url,
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
		cloud: {
			cloudName,
		},
	});

	const myImage = cld.image(publicId);

	return (
		<div className="registro">
			<h1>Registro de Simuladores</h1>

			<form onSubmit={(e) => e.preventDefault()}>
				<input
					type="text"
					placeholder="No. Activo Fijo sin el AF/"
					onChange={(e) => setnumero_activo_fijo(e.target.value)}
				/>
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
				<input
					type="text"
					placeholder="Ubicación"
					onChange={(e) => setubicacion(e.target.value)}
				/>
				<br />
				<textarea
					type="text"
					placeholder="Características"
					onChange={(e) => setcaracteristicas(e.target.value)}
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
					<button
						className="send_button"
						onClick={callFormHook}
					>
						Registrar Activo
					</button>
				)}
			</form>
		</div>
	);
}

export default Registro;
