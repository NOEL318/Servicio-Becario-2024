const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://admin:root@simuladores.kiw3yke.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db("Simuladores");
const simuladores = database.collection("Simuladores");
const users = database.collection("users");

module.exports = {
	simuladores,
	users,
};
