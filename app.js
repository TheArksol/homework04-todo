const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/rollDice", (req, res) => {
  console.log("get a get request");
  console.log(req.body);

  const numSides = parseInt(req.body.sides);
  const numDice = parseInt(req.body.dice);

  let diceRolled = [];

  for (let i = 0; i < numDice; i++) {
    let numRolled = getRandomInt(numSides + 1);
    diceRolled.push(numRolled);
  }

  res.send({ sides: numSides, dice: numDice, diceResult: diceRolled });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * (max - 1) + 1);
}

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
