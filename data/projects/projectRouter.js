const express = require("express");

const router = express.Router();

const projdb = require("../helpers/projectModel");

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateProjectId, (req, res) => {
  const project = req.body;

  projdb
    .insert(project)
    .then(project => res.status(201).json(project))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error adding new post" });
    });
});

router.put("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  const project = req.body;

  projdb.update(id, project).then(() => {
    projdb
      .get(id)
      .then(project => res.status(200).json(project))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "error updating project" });
      });
  });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;
  projdb
    .remove(id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "failed to delete project" });
    });
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
