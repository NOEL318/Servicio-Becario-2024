import axios from "axios";
import { url } from "./hooksConfig";

//Manejo básico de Simuladores
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

export const updateAcf = (_id, numero_activo_fijo) => {
  return axios.post(`${url}/api/post/editsimulador`, {
    _id,
    numero_activo_fijo,
  });
};

export const DuplicateSimulador = (_id) => {
  return axios.post(`${url}/api/post/duplicate_simulador`, { _id });
};

//Manejo de préstamos
export const GetPrestamos = () => {
  return axios.get(`${url}/api/get/prestamo`);
};
