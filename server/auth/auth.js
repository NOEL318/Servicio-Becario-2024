const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Auth_Mongodb = require("../database/Auth");
module.exports = {
	signUp: async function ({ username, id, password }) {
		const exist = await Auth_Mongodb.AccountExist(id);
		if (exist != null) {
			return { status: 401, token: null, error: "Ya tienes una cuenta" };
		} else if (exist == null) {
			const salt = await bcrypt.genSalt(10);
			var hash = await bcrypt.hash(password, salt);
			var response = await Auth_Mongodb.SignUp({ username, id, password: hash });
			return { status: 401, token: null, error: "No estás autorizado para ingresar." };
		}
	},
	signIn: async function ({ id, password }) {
		const exist = await Auth_Mongodb.AccountExist(id);
		if (exist != null) {
			if (exist.authorized == true) {
				const verify = await bcrypt.compare(password, exist.password);
				if (verify == true && id == exist.id) {
					delete exist.password;
					const token = jwt.sign(exist, process.env.ENCODER_FOR_USER_TOKENS, { expiresIn: "3h" });
					return { status: 200, token };
				} else {
					return { status: 401, token: null, error: "Tus datos no coinciden." };
				}
			} else {
				return { status: 401, token: null, error: "No estás autorizado para ingresar." };
			}
		} else if (exist == null) {
			return { status: 401, token: null, error: "No tienes una cuenta." };
		}
	},
	loginwithoutpassword: async function ({ id }) {
		if (!id) {
			return { status: 400, message: "Algo ha salido mal con tu cuenta" };
		} else {
			const user = await Auth_Mongodb.AccountExist(id);
			if (user != null) {
				delete user.password;
				const token = jwt.sign(user, process.env.ENCODER_FOR_USER_TOKENS, { expiresIn: "3h" });
				return { status: 200, token };
			}
			if (user == null) {
				return { status: 400, message: "No tienes una cuenta" };
			}
		}
	},

	getUsers: async function () {
		var users = await Auth_Mongodb.GetAllUsers();
		return { status: 200, users };
	},
	updateUserRole: async function ({ id, role }) {
		var user = await Auth_Mongodb.updateUserR(id, role);
		if (user != null) {
			return { status: 200 };
		} else {
			return { status: 401 };
		}
	},
	updateUserAuthorization: async function ({ id, authorized }) {
		var user = await Auth_Mongodb.updateUserAuthorization(id, authorized);
		if (user != null) {
			return { status: 200 };
		} else {
			return { status: 401 };
		}
	},
	deleteUser: async function ({ id }) {
		var user = await Auth_Mongodb.deleteUser(id);
		console.log(user);
		if (user != null) {
			return { status: 200, deletedCount: user.deletedCount };
		} else {
			return { status: 401 };
		}
	},
};
