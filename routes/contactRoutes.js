const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Get all the contatcs" });
});

router.route("/:id").get((req, res) => {
  res.status(200).json({ message: `Get contatcs for ${req.params.id}` });
});

router.route("/").post((req, res) => {
  res.status(200).json({ message: "Create contatc" });
});

router.route("/:id").put((req, res) => {
  res.status(200).json({ message: `Update contatc for ${req.params.id}` });
});

router.route("/:id").delete((req, res) => {
  res.status(200).json({ message: `Delete contatc for ${req.params.id}` });
});

module.exports = router;
