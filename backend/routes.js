const express = require("express");

const router = express.Router();

const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  addBookToUser,
  getBooksUser,
  getOnlyOneBookUser,
} = require("./controllers/UserController");

router.post("/", (req, res) => createUser(req, res));

router.get("/", (req, res) => getUsers(req, res));

router.get("/:id", (req, res) => getUser(req, res));

router.delete("/:id", (req, res) => deleteUser(req, res));

router.patch("/:id", (req, res) => updateUser(req, res));

router.patch("/books/:id", (req, res) => addBookToUser(req, res));

router.get("/books/:id", (req, res) => getBooksUser(req, res));

router.get("/book/:id", (req, res) => getOnlyOneBookUser(req, res));

module.exports = router;
