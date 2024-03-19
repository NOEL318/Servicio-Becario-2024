const express = require("express");
const mongodb = require("./mongodb_config");
const path = require("path");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const {
	signUp,
	signIn,
	loginwithoutpassword,
	getUsers,
	updateUserRole,
	deleteUser,
	updateUserAuthorization,
} = require("./auth/auth");

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

app.post("/api/getUsers", async (req, res) => {
	res.json(await getUsers());
});

app.post("/api/updateUserRole", async (req, res) => {
	res.json(await updateUserRole(req.body));
});
app.post("/api/updateUserAuthorization", async (req, res) => {
	res.json(await updateUserAuthorization(req.body));
});

app.post("/api/deleteUser", async (req, res) => {
	res.json(await deleteUser(req.body));
});

app.post("/api/signin", async (req, res) => {
	res.json(await signIn(req.body));
});

app.post("/api/loginwithoutpassword", async (req, res) => {
	res.json(await loginwithoutpassword(req.body));
});

// app.post("/api/post/newsimulador", async (req, res) => {
// 	var { datos } = req.body;
// 	var insert = await mongodb.simuladores.insertOne(datos);
// 	res.json(insert);
// });

app.post("/api/post/newsimulador", async (req, res) => {
	var { datos } = req.body;
	var insert = await mongodb.backup.insertOne(datos);
	res.json(insert);
});

// app.get("/api/get/simuladores", async (req, res) => {
// 	var find = await mongodb.simuladores.find();
// 	const array = await find.toArray();
// 	res.json(array);
// });

app.get("/api/get/simuladores", async (req, res) => {
	var find = await mongodb.backup.find();
	const array = await find.toArray();
	res.json(array);
});

// app.post("/api/post/simuladoressimuladores", async (req, res) => {
// 	var find = await mongodb.simuladores.find();
// 	const array = await find.toArray();
// 	await mongodb.simuladores.insertMany(array);
// 	res.json(array);
// });

// app.post("/api/post/insertonlyone", async (req, res) => {
// 	var find = await mongodb.simuladores.find();
// 	var array = await find.toArray();
// 	const newarray = [];
// 	var activos = [];

// 	for (let i = 0; i < array.length; i++) {
// 		const first = array[i];
// 		for (let e = 0; e < array.length; e++) {
// 			const second = array[e];
// 			if (first.nombre_maquina == second.nombre_maquina) {
// 				if (typeof second.numero_activo_fijo === "string") {
// 					activos.push([second.numero_activo_fijo, second.ubicacion]);
// 				} else {
// 					activos.push(second.numero_activo_fijo);
// 				}
// 			}
// 		}
// 		var x = array.filter((elemento) => {
// 			return first.nombre_maquina != elemento.nombre_maquina;
// 		});
// 		array = x;
// 		first.numero_activo_fijo = activos;
// 		first.cantidad = activos.length;
// 		mongodb.backup.insertOne(first);
// 		activos = [];
// 	}
// 	res.json(newarray);
// });

// app.post("/api/post/simulador", async (req, res) => {
// 	const { _id } = req.body;
// 	var find = await mongodb.simuladores.findOne({ _id: new ObjectId(_id) });
// 	res.json(find);
// });

app.post("/api/post/simulador", async (req, res) => {
	const { _id } = req.body;
	var find = await mongodb.backup.findOne({ _id: new ObjectId(_id) });
	res.json(find);
});

// app.post("/api/delete/simulador", async (req, res) => {
// 	const { _id } = req.body;
// 	var find = await mongodb.simuladores.deleteOne({ _id: new ObjectId(_id) });
// 	res.json(find);
// });

app.post("/api/delete/simulador", async (req, res) => {
	const { _id } = req.body;
	var find = await mongodb.backup.deleteOne({ _id: new ObjectId(_id) });
	res.json(find);
});

// app.post("/api/post/duplicate_simulador", async (req, res) => {
// 	const _id = req.body;
// 	var original = await mongodb.simuladores.findOne({ _id: new ObjectId(_id) });
// 	// var copy = await mongodb.simuladores.insertOne({});

// 	res.json(find);
// });

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
