const express = require("express");
const Task = require("../models/Task.model");
const logger = require("../middleware/logger");

const router = express.Router();

//GET all tasks
router.get("/", logger, async (req, res) => {
  const tasks = await Task.find({});
  res.send(tasks);
});

//GET one task
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).send({ error: `No task with the id ${id}` });
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//POST request
router.post("/", async (req, res) => {
  const { text, day, reminder } = req.body;

  if (!text || !day) {
    return res
      .status(400)
      .send({ error: "Please provide text, day and reminder" });
  }

  const task = new Task({
    text,
    day,
    reminder: reminder ?? false,
  });

  await task.save();

  res.statusCode = 201;
  res.send(task);
});

//UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { text, day, reminder } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).send({ error: `No task with the id ${id}` });
    task.text = text ?? task.text;
    task.day = day ?? task.day;
    task.reminder = reminder ?? task.reminder;

    await task.save();

    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Task.deleteOne({ _id: id });
    if (!deleted.deletedCount) return res.status.apply(404).send(false);

    console.log("deleted");
    return res.send(true);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
