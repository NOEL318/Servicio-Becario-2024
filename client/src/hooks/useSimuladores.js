import axios from "axios";

export const SendForm = (datos) => {
	axios.post("/api/post/simulador", { data: datos });
};

export const GetSimuladores = () => {
	return axios.get("/api/get/simuladores");
};
