const express = require("express");
const mongodb = require("./mongodb_config");
const path = require("path");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { signUp, signIn, loginwithoutpassword } = require("./auth/auth");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api/hi", async (req, res) => {
	res.json({ message: "Hola desde el servidor!" });
});

app.post("/api/signup", async (req, res) => {
	res.json(await signUp(req.body));
});
app.post("/api/signin", async (req, res) => {
	res.json(await signIn(req.body));
});

app.post("/api/loginwithoutpassword", async (req, res) => {
	res.json(await loginwithoutpassword(req.body));
});

app.post("/api/post/newsimulador", async (req, res) => {
	var { datos } = req.body;
	var insert = await mongodb.simuladores.insertOne(datos);
	res.json(insert);
});

app.get("/api/get/simuladores", async (req, res) => {
	var find = await mongodb.simuladores.find();
	const array = await find.toArray();
	res.json(array);
});
app.post("/api/post/simulador", async (req, res) => {
	const { _id } = req.body;
	var find = await mongodb.simuladores.findOne({ _id: new ObjectId(_id) });
	res.json(find);
});

app.post("/api/delete/simulador", async (req, res) => {
	const { _id } = req.body;
	var find = await mongodb.simuladores.deleteOne({ _id: new ObjectId(_id) });
	res.json(find);
});

app.post("/api/post/duplicate_simulador", async (req, res) => {
	const _id = req.body;
	var original = await mongodb.simuladores.findOne({ _id: new ObjectId(_id) });
	// var copy = await mongodb.simuladores.insertOne({});

	res.json(find);
});

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
