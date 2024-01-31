import axios from "axios";
var url = "http://localhost:5001";
export const SendForm = (datos) => {
	return axios.post(`${url}/api/post/newsimulador`, { datos });
};

export const GetSimuladores = () => {
	return axios.get(`${url}/api/get/simuladores`);
};

export const GetSimulador = (_id) => {
	return axios.post(`${url}/api/post/simulador`, { _id });
};

export const DeleteSimulador = (_id) => {
	return axios.post(`${url}/api/delete/simulador`, { _id });
};

export const DuplicateSimulador = (_id) => {
	return axios.post(`${url}/api/post/duplicate_simulador`, { _id });
};
