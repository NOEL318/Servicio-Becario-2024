import axios from "axios";

export const SendForm = (datos) => {
	return axios.post("/api/post/newsimulador", { data: datos });
};

export const GetSimuladores = () => {
	return axios.get("/api/get/simuladores");
};

export const GetSimulador = (_id) => {
	return axios.post("/api/post/simulador", { _id });
};
