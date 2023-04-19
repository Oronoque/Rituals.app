const express = require("express");
const port = 3009;
const bodyParser = require("body-parser");

const { generateId } = require("./utils/string");
console.log("generateId:", generateId);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const rituals = [
  {
    id: generateId(),
    name: "ritual1",
    category: "fitness",
  },
  {
    id: generateId(),
    name: "ritual2",
    category: "daily",
  },
  {
    id: generateId(),
    name: "ritual3",
    category: "social",
  },
];

app.get("/", (req, res) => {
  res.send("Hello Rituals!");
});

// list all rituals
app.get("/api/rituals", (req, res) => {
  res.send(rituals);
});

// list one ritual
app.get("/api/rituals/:id", (req, res) => {
  const { id } = req.params;

  const ritual = rituals.find((ritual) => ritual.id === id);

  if (ritual) {
    return res.send(ritual);
  }

  return res.status(404).send();
});

// create one ritual
app.post("/api/rituals", (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    return res.status(400).send("params_missing");
  }

  rituals.push({
    id: generateId(),
    name,
    category,
  });

  return res.send({ success: true, data: rituals });
});

// delete one ritual
app.delete("/api/rituals/:id", (req, res) => {
  const { id } = req.params;

  const matchingIndex = rituals.findIndex((ritual) => ritual.id === id);

  if (matchingIndex !== -1) {
    rituals.splice(matchingIndex, 1);
    return res.send({ success: true, data: rituals });
  }

  return res.status(404).send();
});

// todo: update one ritual

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// list all entities
// GET www.app.com/api/rituals ==> [{},{}]

// // list one entity
// GET www.app.com/api/rituals/:id ==> {}

// // create one entity
// POST www.app.com/api/rituals
// {
//   name,
//   category,
// }

// // update one entity
// PUT www.app.com/api/rituals/1
// {
//   name,
//   category,
// }

// // delete one entity
// DELETE www.app.com/api/rituals/1
