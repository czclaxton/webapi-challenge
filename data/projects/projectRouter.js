const express = require("express");

const router = express.Router();

const projdb = require("../helpers/projectModel");

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// CUSTOM MIDDLEWARE

function validateProjectId(req, res, next) {
  const id = req.params.id;

  projdb
    .get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ error: "this project id does not exist" });
      }
    })
    .catch(() => res.status(500).json({ error: "error" }));
}

module.exports = router;
