import axios from "axios";

export const SendForm = (datos) => {
	axios.post("http://127.0.0.1:5001/api/post/simulador", { data: datos });
};

export const GetSimuladores = () => {
	return axios.get("http://127.0.0.1:5001/api/get/simuladores");
};
