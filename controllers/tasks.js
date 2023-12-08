const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTasks = async (req, res) => {
  res.send("Get All Tasks");
};

const getTask = async (req, res) => {
  res.send("Get a Task");
};
const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({task});
};
const deleteTask = async (req, res) => {
  res.send("Delete the Task");
};
const updateTask = async (req, res) => {
  res.send("Update the Task");
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
