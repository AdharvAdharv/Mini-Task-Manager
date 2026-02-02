import Task from "../models/Task.js";

//  Create Task
export const createTask = async (req, res) => {
  try{
  const { title, description, priority, dueDate } = req.body;

  if (!title || title.length < 3) {
    return res.status(400).json({ message: "Title must be at least 3 characters" });
  }
  

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    priority,
    dueDate,
  });

  res.status(201).json(task);
} catch {
  res.status(500).send("Internal Server Error");
}
};

//  Get All Tasks (User specific)
export const getTasks = async (req, res) => {
  const { status, sort = "desc" } = req.query;

  const query = { user: req.user._id };
  if (status) query.status = status;

  const tasks = await Task.find(query).sort({
    createdAt: sort === "asc" ? 1 : -1,
  });

  res.json(tasks);
};


// Update Task status

export const updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  if (!allowedTransitions[task.status].includes(status)) {
    return res.status(400).json({
      message: `Invalid status transition from ${task.status} to ${status}`,
    });
  }

  task.status = status;

  if (status === "done") {
    task.completedAt = new Date();
  }

  await task.save();
  res.json(task);
};




//  Delete Task
export const deleteTask = async (req, res) => {
  try{
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await task.deleteOne();
  res.json({ message: "Task removed" });
} catch {
  res.status(500).send("Internal Server Error");
}
};
