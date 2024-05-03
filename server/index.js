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


app.post("/api/post/newsimulador", async (req, res) => {
	var { datos } = req.body;
	var insert = await mongodb.backup.insertOne(datos);
	res.json(insert);
});


app.post("/api/post/editsimulador", async (req, res) => {
	var { _id, numero_activo_fijo } = req.body;
	console.log(JSON.stringify(req.body)+ "asjsjanjbfcbds fdhsxfgsdkjhfdjbvjsd");
	var modify = await mongodb.backup.updateOne({_id:new ObjectId(_id)},{ $set: {numero_activo_fijo}});
	res.json(modify);
});

app.get("/api/get/simuladores", async (req, res) => {
	var find = await mongodb.backup.find();
	const array = await find.toArray();
	res.json(array);
});


// app.post("/api/post/insertonlyone", async (req, res) => {
// 	var find = await mongodb.simuladores.find();
// 	var array = await find.toArray();
// 	const newarray = [];
// 	var activos = [];
// 	for (let i = 0; i < array.length; i++) {
// 		const first = array[i];
// 		for (let e = 0; e < array.length; e++) {
// 			var second = array[e];
// 			if (first.nombre_maquina == second.nombre_maquina) {
// 				if (typeof second.numero_activo_fijo === "string") {
// 					if (first.modelo == second.modelo) {
// 						if (second.numero_activo_fijo != "") {
// 							activos.push([second.numero_activo_fijo, second.ubicacion]);
// 						} else {
// 							activos.push(["", second.ubicacion]);
// 						}
// 					}
// 				} else if (first.modelo == second.modelo) {
// 					activos.push(["", second.ubicacion]);
// 				}
// 			}
// 		}
// 		//delete used element
// 		var x = array.filter((elemento) => {
// 			return first.nombre_maquina != elemento.nombre_maquina;
// 		});
// 		first.numero_activo_fijo = activos;
// 		first.cantidad = activos.length;
// 		newarray.push(first);
// 		activos = [];
// 		// await mongodb.backup.insertOne(first);
// 	}
// 	var modelosVistos = {};
// 	var resultado = newarray.filter((elemento) => {
// 		// Verificamos si el modelo ya se ha visto antes
// 		if (modelosVistos[elemento.modelo]) {
// 			return false; // Si ya se ha visto, lo filtramos
// 		}
// 		// Si no se ha visto, lo marcamos como visto y lo mantenemos en el resultado
// 		modelosVistos[elemento.modelo] = true;
// 		return true;
// 	});
// 	await mongodb.backup.insertMany(resultado);
// 	res.json({ array, modelosVistos, resultado });
// });

app.post("/api/post/simulador", async (req, res) => {
	const { _id } = req.body;
	var find = await mongodb.backup.findOne({ _id: new ObjectId(_id) });
	res.json(find);
});

app.post("/api/delete/simulador", async (req, res) => {
	const { _id } = req.body;
	var find = await mongodb.backup.deleteOne({ _id: new ObjectId(_id) });
	res.json(find);
});


app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
