const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded( {extended: false}))
app.listen(3006);
console.log("listening on", 3006);

const db = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "tiendita-doña-pelos",
  port: "3306",
};
const connection = mysql.createConnection(db);
connection.connect(function (err, res) {
  if (err) {
    console.log(err.fatal);
    console.log(err.code);
    return;
  } else {
    console.log("conexion Exitosa");
  }
});

app.get("/", (req, res) => {
  res.json(" OK 200 comitt");
});
app.get("/productos", (req, res) => {
  connection.query("select * from productos", (error, resultado) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(resultado);
    }
  });
});

app.delete("/producto/:id", (req, res) => {
  connection.query(
    "delete from productos where id_producto =?;",
    [req.params.id],
    (error, resultado) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(resultado);
      }
    }
  );
});

app.post("/producto/:tipo&:precio&:cantidad&:marca", (req, res) => {
  connection.query(
    "insert into productos(id_producto,tipo,precio,cantidad_en_stock,id_marca) values (?,?,?,?,?);"
  ),
    [
      0,
      req.params.tipo,
      req.params.precio,
      req.params.cantidad,
      req.params.marca,
    ],
    (error, resultado) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(resultado);
      }
    };
});
app.put("/producto/:id_producto&:cantidad", (req, res) => {
  connection.query(
    "update productos set cantidad_en_stock = ? where id_producto=?;",
    [req.params.cantidad, req.params.id_producto],
    (error, resultado) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(resultado);
      }
    }
  );
});


//!---------Cliente---------------- //

app.get("/clientes", (req, res) => {
  connection.query("select * from clientes", (error, resultado) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(resultado);
    }
  });
});

app.put("/clientes/:nombre&:id_cliente", (req, res) => {
  connection.query(
    "update clientes set nombre = ? where id_cliente=?;",
    [req.params.nombre, req.params.id_cliente],
    (error, resultado) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(resultado);
      }
    }
  );
});

app.post("/clientes/:nombre&:apellido&:email", (req, res) => {
  connection.query(
    "insert into productos(id_cliente,nombre,apellido,email) values (?,?,?,?);"
  ),
    [
      0,
      req.params.nombre,
      req.params.apellido,
      req.params.email,
    ],
    (error, resultado) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(resultado);
      }
    };
});

app.delete("/clientes/:id", (req, res) => {
  connection.query(
    "delete from clientes where id_cliente =?;",
    [req.params.id],
    (error, resultado) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(resultado);
      }
    }
  );
});