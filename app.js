const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "piccolo89",
  database: "node",
  connectionLimit: 10,
});

const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/database", (req, res) => {
  console.log("Request: New Entry - todo");
  console.log(req.body);

  pool.query("INSERT INTO todo SET ?", req.body, (error, result, fields) => {
    if (error) {
      //ERROR
      //Send result to the client
      res.send({ ok: false, error: error });
    } else {
      //New Entry: Todo
      //Send result to the client
      console.log("New Entry: node.todo");
      res.send({ ok: true, newEntry: req.body, newId: result.insertId });
    }
  });
});

app.get("/database", (req, res) => {
  console.log("Request: Load Data");

  pool.query("SELECT * FROM todo", req.body, (error, result, fields) => {
    if (error) {
      //ERROR
      //Send result to the client
      res.send({ ok: false, error: error });
    } else {
      //Load Data: Todo
      //Send result to the client
      console.log("Data loaded: node.todo");
      res.send({ ok: true, result: result });
    }
  });
});

app.delete("/database", (req, res) => {
  pool.query(
    "DELETE FROM todo WHERE Id = " + req.body.Id,
    req.body,
    (error, result, fields) => {
      if (error) {
        //ERROR
        //Send result to the client
        res.send({ ok: false, error: error });
      } else {
        //Load Data: Todo
        //Send result to the client
        console.log("Data deleted: node.todo");
        res.send({ ok: true });
      }
    }
  );
});

app.put("/database", (req, res) => {
  pool.query(
    `UPDATE todo SET Title = "${req.body.Title}", Text = "${req.body.Text}" WHERE Id = ${req.body.Id}`,
    (error, result, fields) => {
      if (error) {
        //ERROR
        //Send result to the client
        res.send({ ok: false, error: error });
      } else {
        //Load Data: Todo
        //Send result to the client
        console.log("Data updated: node.todo");
        res.send({ ok: true });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
