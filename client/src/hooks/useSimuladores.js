import axios from "axios";

export const SendForm = (datos) => {
	return axios.post("http://127.0.0.1:5001/api/post/newsimulador", { data: datos });
};

export const GetSimuladores = () => {
	return axios.get("http://127.0.0.1:5001/api/get/simuladores");
};

export const GetSimulador = (_id) => {
	return axios.post("http://127.0.0.1:5001/api/post/simulador", { _id });
};
