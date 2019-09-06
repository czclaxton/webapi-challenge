const express = require("express");

const router = express.Router();

const actionsdb = require("../helpers/actionModel");
const projdb = require("../helpers/projectModel");

router.get("/:id", validateActionId, (req, res) => {
  const id = req.params.id;

  actionsdb.get(id).then(action => res.status(200).json(action));
});

router.post("/", validateActionId, (req, res) => {
  const action = req.body;

  actionsdb
    .insert(action)
    .then(action => res.status(201).json(action))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "could not add action" });
    });
});

router.put("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  const action = req.body;
  actionsdb.update(id, action).then(() => {
    actionsdb
      .get(id)
      .then(action => res.status(200).json(action))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "error updating action" });
      });
  });
});

router.delete("/:id", validateActionId, (req, res) => {
  const id = req.params.id;

  actionsdb
    .remove(id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error deleting action" });
    });
});

// CUSTOM MIDDLEWARE

function validateActionId(req, res, next) {
  const id = req.params.id;

  actionsdb
    .get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ errorMessage: "This is not an action id" });
      }
    })
    .catch(() => res.status(500).json({ errorMessage: "error" }));
}

module.exports = router;
