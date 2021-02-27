const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const Pokemon = require("./models/pokemon.js");
const methodOverride = require("method-override");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// 2. middleware
app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

// new
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
});

// edit
app.get("/pokemon/:id/edit", (req, res) => {
  res.render("edit.ejs", {
    Pokemon: Pokemon[req.params.id],
    id: req.params.id,
  });
});

// update

app.put("/pokemon/:id", (req, res) => {
  Pokemon[req.params.id] = req.body;
  res.redirect("/pokemon");
});

// destroy
app.delete("/pokemon/:id", (req, res) => {
  Pokemon.splice(req.params.id, 1); //remove the item from the array
  res.redirect("/pokemon"); //redirect back to index route
});

// show
app.get("/pokemon/:id", (req, res) => {
  res.render("show.ejs", { Pokemon: Pokemon[req.params.id] });
});

// index
app.get("/pokemon", (req, res) => {
  res.render("index.ejs", { Pokemon: Pokemon });
});

// create
app.post("/pokemon", (req, res) => {
  //console.log(`before reset, req.body is ${JSON.stringify(req.body, null, 4)}`);
  const tmp = {
    name: req.body["name"],
    img: req.body["imageURL"],
    stats: {
      hp: req.body["hp"],
      attack: req.body["attack"],
      defense: req.body["defense"],
    },
  };
  console.log(tmp);
  // console.log(`after reset, req.body is ${JSON.stringify(req.body, null, 4)}`);
  Pokemon.push(tmp);
  //  console.log(budgets);
  res.redirect("/pokemon");
});

app.listen(PORT, () => {
  console.log("listening to " + PORT);
});
