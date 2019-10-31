const express = require("express");
const Users = require("./data/db.js");
const server = express();

server.use(express.json());

//Server.Get users
server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "NO USERS FOR YOU!"
      });
    });
});

//Server.Get id
server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "NO USERS WITH THAT ID FOR YOU!" });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "NO, WE CANT GET THAT!" });
    });
});

//Server.post
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (name && bio) {
    Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: "SOMETHING HAPPENED! AHHHHHHH!!!!!!!"
        });
      });
  } else {
    res.status(400).json({ errorMessage: "YOU GIVE US NAME AND INFO NOW!" });
  }
});

//Server.put
server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;

  if (name && bio) {
    Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "THAT USER DOESN'T EXIST"
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: "WE CANT CHANGE THAT!"
        });
      });
  } else {
    res.status(400).json({ errorMessage: "GIVE US THE NAME & BIO NOW!" });
  }
});

//Server.delete

server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({
          message: "OHH GOD HES GONE!"
        });
      } else {
        res.status(404).json({ message: "THAT USER DOESN'T EXIST" });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({
          errorMessage: "THAT USER IS INVICIBLE AND COULDNT BE DELETED"
        });
    });
});

server.listen(8000, () => console.log("API running on port 8000"));
