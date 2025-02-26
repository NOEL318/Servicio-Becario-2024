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
app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, "../client/build")));
//Server test
app.get("/api/hi", async (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});

//Users
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
//Simuladores
app.post("/api/post/newsimulador", async (req, res) => {
  var { datos } = req.body;
  var insert = await mongodb.backup.insertOne(datos);
  res.json(insert);
});

app.post("/api/post/editsimulador", async (req, res) => {
  var { _id, numero_activo_fijo } = req.body;
  console.log(JSON.stringify(req.body) + "asjsjanjbfcbds fdhsxfgsdkjhfdjbvjsd");
  var modify = await mongodb.backup.updateOne(
    { _id: new ObjectId(_id) },
    { $set: { numero_activo_fijo } }
  );
  res.json(modify);
});

app.get("/api/get/simuladores", async (req, res) => {
  var find = await mongodb.backup.find();
  const array = await find.toArray();
  res.json(array);
});

app.post("/api/post/simulador", async (req, res) => {
  const { _id } = req.body;
  var find = await mongodb.backup.findOne({ _id: new ObjectId(_id) });
  res.json(find);
});

app.post("/api/post/modify_inventory", async (req, res) => {
  var alls = await mongodb.backup.find();
  var cont = await alls.toArray();
  x = 0;
  await cont.forEach(async (element) => {
    element._id = new ObjectId(element._id);
    console.log(element);
    if (element.numero_activo_fijo == "") {
      element.numero_activo_fijo = [["N / A", element.ubicacion || "", {}]];
    }
    if (!element.nombre_maquina) {
      element.nombre_maquina = "Sin nombre";
    }
    if (!element.caracteristicas) {
      element.caracteristicas = "Sin caracteristicas";
    } else if (element.caracteristicas) {
      var chars = JSON.stringify(element.caracteristicas);
      element.caracteristicas = chars
        .replace(
          "\
",
          ""
        )
        .replace(/;/g, ".");
    }
    if (!element.modelo) {
      element.modelo = "Sin modelo";
    }
    if (!element.marca) {
      element.marca = "";
    }
    if (!element.image_url) {
      element.image_url = "";
    }
    if (!element.cantidad) {
      element.cantidad = 0;
    }
    var find = await mongodb.backup.insertOne(element);
    console.log(find, x++);
  });
  res.json("find");
});

app.post("/api/delete/simulador", async (req, res) => {
  const { _id } = req.body;
  var find = await mongodb.backup.deleteOne({ _id: new ObjectId(_id) });
  res.json(find);
});

//Prestamos

app.get("/api/get/prestamo", async (req, res) => {
  var find = await mongodb.prestamo.find();
  const array = await find.toArray();
  res.json(array);
});

app.post("/api/post/new_prestamo", async (req, res) => {
  var body = {
    prestatario: {
      _id: "aaaa999",
      nombre_usuario: "Noel Rincón",
    },
    fecha_prestamo: "2025-02-17",
    fecha_devolucion: "2025-02-19",
    hora_prestamo: "1739836162",
    hora_devolucion: "1739922562",
    prestamista: { _id: "", nombre_usuario: "Noel Rincón" },
    simuladores: [
      ["_id", "Baby Anne", "000333"],
      ["_id", "Tijeras Quirúrgicas", "000999"],
    ],
  };

  var find = await mongodb.prestamo.insertOne(body);
  res.json(find);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
