import axios from "axios";
var url="http://localhost:5001";
export const SendForm = (datos) => {
	return axios.post(`${url}/api/post/newsimulador`, { data: datos });
};

export const GetSimuladores = () => {
	return axios.get(`${url}/api/get/simuladores`);
};

export const GetSimulador = (_id) => {
	return axios.post(`${url}/api/post/simulador`, { _id });
};
