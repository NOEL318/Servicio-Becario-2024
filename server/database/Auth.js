const mongodb = require("../mongodb_config");
const { ObjectId } = require("mongodb");

module.exports = {
	SignUp: async function ({ username, id, password }) {
		const res = await mongodb.users.insertOne({ username, id, password, authorized: false, role: "read" });
		if (res.acknowledged == true) {
			const find = await mongodb.users.findOne({ _id: new ObjectId(res.insertedId) });
			return find;
		} else {
			return false;
		}
	},
	AccountExist: async function (id) {
		const res = await mongodb.users.findOne({ id });
		if (res != null) {
			if (res.id == id) {
				return res;
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	GetAllUsers: async function () {
		const res = await mongodb.users.find();
		var x = await res.toArray();
		if (x) {
			for (let i = 0; i < x.length; i++) {
				delete x[i].password;
			}
			return x;
		}
	},
	updateUserR: async function (id, role) {
		const res = await mongodb.users.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { role } });
		return res;
	},
	updateUserAuthorization: async function (id, authorized) {
		const res = await mongodb.users.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { authorized } });
		return res;
	},
	deleteUser: async function (id) {
		const res = await mongodb.users.deleteOne({ _id: new ObjectId(id) });
		return res;
	},
};
