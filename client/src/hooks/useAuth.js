import axios from "axios";
import * as jose from "jose";
import { url } from "./hooksConfig";

export const signup = async ({ username, id, password }) => {
	const res = await axios.post(`${url}/api/signup`, { username, id, password });
	const json = await res.data;
	if (res.status == 200 && res.data.status == 200) {
		// save the user to local storage
		localStorage.setItem("user", JSON.stringify(json.token));
		// update the auth context
		const token = json.token;
		return jose.decodeJwt(token);
	} else {
		var { error, token, status } = res.data;
		if (error || (status != 200 && token == null)) {
			window.alert(error);
		}
	}
};

export const signin = async ({ id, password }) => {
	const res = await axios.post(`${url}/api/signin`, { id, password });
	const json = await res.data;
	if (res.status == 200 && res.data.status == 200) {
		// save the user to local storage
		localStorage.setItem("user", JSON.stringify(json.token));
		// update the auth context
		const token = json.token;
		return jose.decodeJwt(token);
	} else {
		var { error, token, status } = res.data;
		if (error || (status != 200 && token == null)) {
			window.alert(error);
		}
	}
};

export const loginwithoutpassword = async (user) => {
	const token = user;
	const payl = jose.decodeJwt(token);
	const tokenduration = payl.exp - payl.iat;
	const currenttime = Date.now();
	const verify = currenttime - payl.iat * 1000;
	const verified = parseFloat((verify / 1000).toFixed(0));
	if (tokenduration > verified) {
		const response = await axios({
			url: `${url}/api/loginwithoutpassword`,
			method: "POST",
			data: { id: payl.id },
		});
		const json = response.data;
		if (json.status == 200) {
			localStorage.setItem("user", JSON.stringify(json.token));
			var x = jose.decodeJwt(token);

			return x;
		} else {
			return response;
		}
	} else {
		localStorage.removeItem("user");
	}
};

export const signout = async () => {
	return localStorage.removeItem("user");
};

const authServices = {
	signup,
	signin,
	signout,
	loginwithoutpassword,
};
export default authServices;
