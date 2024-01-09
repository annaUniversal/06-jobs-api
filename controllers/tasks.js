const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const User = require("../models/User");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const getTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOne({
    _id: taskId,
    createdBy: userId,
  });
  if (!task) {
    throw new NotFoundError(`No task wit id ${taskId}`);
  }

  res.status(StatusCodes.OK).json({ task });
};

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

const deleteTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOneAndRemove({
    _id: taskId,
    createdBy: userId,
  });

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
};

const updateTask = async (req, res) => {
  const {
    body: { category, taskName },
    user: { userId },
    params: { id: taskId },
  } = req;

  if (category === "" || taskName === "") {
    throw new BadRequestError(`The category nor Task name can not be empty`);
  }

  // const taskFound = await Task.find({ createdBy: userId, _id: taskId })

  const task = await Task.findOneAndUpdate(
    { _id: taskId , createdBy: userId},
    req.body,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }

  // res.status(StatusCodes.OK).json({ taskFound });
  res.status(StatusCodes.OK).json({ task });
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
