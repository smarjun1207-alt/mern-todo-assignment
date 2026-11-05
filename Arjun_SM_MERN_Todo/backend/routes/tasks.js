
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// GET /api/tasks — return tasks newest first
router.get("/", async (_req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// POST /api/tasks — create a task
router.post("/", async (req, res, next) => {
  try {
    const title = String(req.body.title ?? "").trim();
    const description =
      typeof req.body.description === "string"
        ? req.body.description.trim()
        : "";

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    if (title.length > 120 || description.length > 500) {
      return res.status(400).json({
        message: "Task title or description is too long"
      });
    }

    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

// PUT /api/tasks/:id — update title, description, and/or completion state
router.put("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const updates = {};

    if (Object.prototype.hasOwnProperty.call(req.body, "title")) {
      const title = String(req.body.title ?? "").trim();

      if (!title) {
        return res.status(400).json({
          message: "Task title cannot be empty"
        });
      }

      if (title.length > 120) {
        return res.status(400).json({
          message: "Title cannot exceed 120 characters"
        });
      }

      updates.title = title;
    }

    if (Object.prototype.hasOwnProperty.call(req.body, "description")) {
      if (
        typeof req.body.description !== "string" ||
        req.body.description.length > 500
      ) {
        return res.status(400).json({ message: "Invalid description" });
      }

      updates.description = req.body.description.trim();
    }

    if (Object.prototype.hasOwnProperty.call(req.body, "completed")) {
      if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({
          message: "completed must be true or false"
        });
      }

      updates.completed = req.body.completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update"
      });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/tasks/:id — delete a task
router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task deleted successfully",
      id: task._id
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
