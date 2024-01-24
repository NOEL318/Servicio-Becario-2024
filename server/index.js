const express = require("express");
const mongodb = require("./mongodb_config");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api/hi", async (req, res) => {
	res.json({ message: "Hola desde el servidor!" });
});

app.post("/api/post/simulador", async (req, res) => {
	var info = req.body.data;
	var insert = await mongodb.simuladores.insertOne(info);
	console.log(insert);
	res.json({ insert });
});

app.get("/api/get/simuladores", async (req, res) => {
	var find = await mongodb.simuladores.find();
	console.log(find);
	const array = await find.toArray();
	res.json({ array });
});

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
