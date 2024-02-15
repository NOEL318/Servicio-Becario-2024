const mongodb = require("../mongodb_config");
const { ObjectId } = require("mongodb");

module.exports = {
	SignUp: async function ({ username, id, password }) {
		const res = await mongodb.users.insertOne({ username, id, password, authorized: false });
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
};
